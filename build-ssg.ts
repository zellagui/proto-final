// Pre-render the app into static HTML.
// run `pnpm ssg:build` and then `dist` can be served as a static site.

import fs from 'node:fs'
import { createRequire } from 'node:module'
import fsp from 'node:fs/promises'
import url from 'node:url'
import path from 'pathe'
import { Buffer } from 'node:buffer'
import minifyHtml from '@minify-html/node'
import devalue from '@nuxt/devalue'
import fg from 'fast-glob'
import { mergeConfig, resolveConfig, build as viteBuild } from 'vite'
import colors from 'picocolors'
import { format, generateStaticParams } from './build-ssg.config'
import { H3Event } from 'h3'
import { IncomingMessage } from 'node:http'
import { ServerResponse } from 'node:http'
import { Socket } from 'node:net'

// prevent non-ready SSR dependencies from throwing errors

//@ts-expect-error
globalThis.__VUE_PROD_DEVTOOLS__ = false
//@ts-expect-error
globalThis.__VUE_I18N_FULL_INSTALL__ = false
//@ts-expect-error
globalThis.__VUE_I18N_LEGACY_API__ = false

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const resolve = (p: string) => path.resolve(__dirname, p)
const ROUTE_PARAM_REGEX = /(\[.*?\])/g

// const routesToPrerender = fs.readdirSync(resolve('src/pages')).map((file) => {
//   const name = file.replace(/\.vue$/, '').toLowerCase()
//   return name === 'index' ? `/` : `/${name}`
// })

;(async () => {
  const staticParams = generateStaticParams()
  const viteConfig = {}
  const mode = process.env.MODE || process.env.NODE_ENV || 'production'
  const config = await resolveConfig(viteConfig, 'build', mode)

  const cwd = process.cwd()
  const root = config.root || cwd
  const outDir = config.build.outDir || 'dist'
  const out = path.isAbsolute(outDir) ? outDir : path.join(root, outDir)

  if (fs.existsSync(out)) {
    await fsp.rm(out, { recursive: true })
  }

  const outStatic = out
  const outServer = path.join(out, '.server')

  config.logger.info(colors.green('[SSG] Build for client...'))
  await viteBuild(
    mergeConfig(viteConfig, {
      build: {
        ssrManifest: true,
        outDir: outStatic,
        rollupOptions: {
          input: {
            app: path.join(root, './index.html'),
          },
        },
      },
      mode: config.mode,
    }),
  )

  // server
  config.logger.info(colors.green('[SSG] Build for server...'))
  await viteBuild(
    mergeConfig(viteConfig, {
      build: {
        ssr: 'src/entry-server.ts',
        outDir: outServer,
        minify: false,
        cssCodeSplit: false,
        rollupOptions: {
          output:
            format === 'esm'
              ? {
                  entryFileNames: '[name].mjs',
                  format: 'esm',
                }
              : {
                  entryFileNames: '[name].cjs',
                  format: 'cjs',
                },
        },
      },
      mode: config.mode,
    }),
  )

  const manifest = JSON.parse(
    await fsp.readFile(
      path.join(outStatic, './.vite/ssr-manifest.json'),
      'utf-8',
    ),
  )
  const template = await fsp.readFile(
    path.join(outStatic, './index.html'),
    'utf-8',
  )

  const prefix =
    format === 'esm' && process.platform === 'win32' ? 'file://' : ''
  const ext = format === 'esm' ? '.mjs' : '.cjs'
  const serverEntry = path.join(prefix, outServer, 'entry-server' + ext)

  const _require = createRequire(import.meta.url)

  const { render }: any =
    format === 'esm' ? await import(serverEntry) : _require(serverEntry)

  // determine routes to pre-render from src/pages
  const routesToPrerender = (
    await fg([path.resolve(cwd, 'src/pages/**/*.vue').replace(/\\/g, '/')])
  )
    .filter((path) => !path.includes('src/pages/[...all].vue')) // ignore root catch-all route
    .map((file) => {
      const name = file
        .replace(/\.vue$/, '')
        .replace(cwd.replace(/\\/g, '/'), '')
        .replace(/\/+/g, '/')
        .replace('/src/pages/', '')
        .toLowerCase()

      return '/' + name.replace(/index$/, '')
    })

  // pre-render each route...
  for (const index in routesToPrerender) {
    if (!Object.hasOwn(routesToPrerender, index)) continue

    const url =
      routesToPrerender[index] === '/'
        ? '/'
        : routesToPrerender[index].replace(/\/$/, '') // remove trailing slash

    const logCount = `${1 + parseInt(index, 10)}/${routesToPrerender.length}`

    if (url.includes('[')) {
      const routeStaticParamsFn =
        url in staticParams
          ? staticParams[url as keyof typeof staticParams]
          : undefined

      if (!routeStaticParamsFn) {
        config.logger.warn(
          `dynamic route (${logCount}) ${colors.yellow(
            url,
          )} - missing static config - update ${colors.cyan(
            './build-ssg.config.ts',
          )} to generate static params for this route.`,
        )
        continue
      }

      // extract route params from url (e.g. /[id] or /[[slug]] or /[...all])
      const params = (url.match(ROUTE_PARAM_REGEX) || []).map((p) => {
        const required = !p.includes('[[')
        const array = p.includes('...')
        const name = p
          .replaceAll(/\[/g, '')
          .replaceAll(/\]/g, '')
          .replaceAll(/\./g, '')

        return {
          required,
          array,
          name,
          param: p,
        }
      })
      const routeStaticParams =
        await staticParams[url as keyof typeof staticParams]()

      if (!routeStaticParams || !Array.isArray(routeStaticParams)) {
        config.logger.warn(
          `dynamic route (${logCount}) ${colors.yellow(
            url,
          )} - static params must be an array`,
        )
        continue
      }

      // check if static params are valid
      const invalidParams = routeStaticParams.filter((param) => {
        return params.some((p) => {
          if (p.required && !(p.name in param)) {
            config.logger.warn(
              `dynamic route (${logCount}) ${colors.yellow(
                url,
              )} - missing required param ${colors.cyan(p.name)}`,
            )
            return true
          }

          if (p.array && p.name in param) {
            const value = param[p.name as keyof typeof param]
            const valid = Array.isArray(value)
            if (!valid) {
              config.logger.warn(
                `dynamic route (${logCount}) ${colors.yellow(
                  url,
                )} - param ${colors.cyan(
                  p.name,
                )} must be an array, got string "${colors.cyan(value)}"`,
              )
              return true
            }
          } else if (!p.array && p.name in param) {
            const value = param[p.name as keyof typeof param]
            const valid = !Array.isArray(value)
            if (!valid) {
              config.logger.warn(
                `dynamic route (${logCount}) ${colors.yellow(
                  url,
                )} - param ${colors.cyan(
                  p.name,
                )} must be string, got array ${colors.cyan(
                  `[${value.join(', ')}]`,
                )}`,
              )
              return true
            }
          }
        })
      })

      if (invalidParams.length) {
        continue
      }

      // render each static param
      for (const subindex in routeStaticParams) {
        if (!Object.hasOwn(routeStaticParams, subindex)) continue

        const logSubCount = `${1 + parseInt(subindex, 10)}/${
          routeStaticParams.length
        }`
        const param = routeStaticParams[subindex]

        const paramUrl = params.reduce((url, p) => {
          if (p.name in param) {
            const value = param[p.name as keyof typeof param]
            if (Array.isArray(value)) {
              return url.replace(p.param, value.join('/'))
            } else {
              return url.replace(p.param, value)
            }
          } else {
            return url.replace(p.param, '')
          }
        }, url)

        await renderPage({
          url: paramUrl,
          render,
          template,
          manifest,
          outStatic,
          config,
          logCount: `${logCount} - ${logSubCount}`,
          cwd,
        })
      }

      continue
    }

    await renderPage({
      url,
      render,
      template,
      manifest,
      outStatic,
      config,
      logCount,
      cwd,
    })
  }

  // done, delete ssr manifest
  await fsp.rm(path.join(outServer), { recursive: true, force: true })

  // when `vite-plugin-pwa` is presented, use it to regenerate SW after rendering
  const pwaPlugin = config.plugins.find(
    (plugin) => plugin.name === 'vite-plugin-pwa',
  )?.api
  if (pwaPlugin && !pwaPlugin.disabled && pwaPlugin.generateSW) {
    config.logger.info(colors.green('[SSG] Regenerate PWA...'))
    await pwaPlugin.generateSW()

    // update sw.js to replace /index.html with nothing so that it can be served from /

    const swPath = path.join(outStatic, 'sw.js')
    const swContent = await fsp.readFile(swPath, 'utf-8')
    await fsp.writeFile(
      swPath,
      swContent.replace(/\/index\.html/g, ''),
      'utf-8',
    )
  }

  config.logger.info(
    [
      `Pre-rendering done. You can now serve the ${colors.cyan(
        out.replace(cwd, '.'),
      )} directory with a static file server.`,
      `Example:`,
      `  ${colors.green('pnpm ssg:serve')}`,
    ].join('\n'),
  )
  process.exit(0)
})()

async function renderPage({
  url,
  render,
  template,
  manifest,
  outStatic,
  config,
  logCount,
  cwd,
}: any) {
  const sock = new Socket()
  const req = new IncomingMessage(sock)
  const res = new ServerResponse(req)
  const event = new H3Event(req, res)

  const {
    appHtml,
    headTags,
    htmlAttrs,
    bodyAttrs,
    preloadLinks,
    initialState,
  } = await render(event, url, manifest)

  if (event.node.res.statusCode === 404) {
    return
  }

  const html = template
    .replace(`<html>`, `<html${htmlAttrs}>`)
    .replace(`<head>`, `<head>${headTags}`)
    .replace(`</head>`, `${preloadLinks}</head>`)
    .replace(`<body>`, `<body${bodyAttrs}>`)
    .replace(
      /<div id="app"([\s\w\-"'=[\]]*)><\/div>/,
      `<div id="app" data-server-rendered="true"$1>${appHtml}</div><script>window.__vulk__=${devalue(
        initialState,
      )}</script>`,
    )

  const minified = minifyHtml.minify(Buffer.from(html), {
    keep_comments: true,
    minify_js: true,
  })

  const file = `${url.endsWith('/') ? `${url}` : `${url}/`}index.html`
  const filePath = path.join(outStatic, file)

  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }

  fs.writeFileSync(resolve(filePath), minified)
  config.logger.info(
    colors.dim(
      `pre-rendered  (${logCount}) ${colors.green(url)} - ${colors.cyan(
        filePath.replace(cwd, '.'),
      )}`,
    ),
  )
}
