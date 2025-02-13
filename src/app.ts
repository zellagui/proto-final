import { createApp as createClientApp, createSSRApp } from 'vue'
import { createHead } from '@unhead/vue'
import { InferSeoMetaPlugin } from '@unhead/addons'
import { createRouter } from '/@src/router'
import VulkApp from '/@src/VulkApp.vue'
import '/@src/styles'
import { inject } from "@vercel/analytics"
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
import awsExports from '/@src/aws-exports';
import { createPinia } from 'pinia'
import { useUserSession } from '/@src/stores/userSession'
import "vue-data-ui/style.css"

Amplify.configure(awsExports);

const plugins = import.meta.glob<{ default: VulkPlugin }>('./plugins/*.ts')

export type VulkAppContext = Awaited<ReturnType<typeof createApp>>
export type VulkPlugin = (context: VulkAppContext) => void | Promise<void>

export function definePlugin(plugin: VulkPlugin) {
  return plugin
}

export async function createApp(ssr = false) {
  const app = ssr ? createSSRApp(VulkApp) : createClientApp(VulkApp)
  const router = createRouter()
  const head = createHead({
    plugins: [InferSeoMetaPlugin()],
  })

  const pinia = createPinia()
  app.use(pinia)

  const userSessionStore = useUserSession()
  userSessionStore.initializeSession()

  const context = {
    app,
    router,
    head,
    initialState: {} as Record<string, any>,
  }

  if (typeof window !== 'undefined') {
    context.initialState = window.__vulk__ ?? {}
  }

  app.provide('vulk', { plugins })

  for (const path in plugins) {
    if (!Object.hasOwn(plugins, path)) continue
    try {
      const { default: plugin } = await plugins[path]()
      await plugin(context)
    } catch (error) {
      console.error(`Error while loading plugin "${path}".`)
      console.error(error)
    }
  }

  app.use(router)
  inject()

  return context
}
