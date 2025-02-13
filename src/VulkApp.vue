<script setup lang="ts">
import VulkLayout from '/@src/layouts/default.vue'
import config from '/@src/app.config'
import { useI18n } from 'vue-i18n'
import { initDarkmode } from '/@src/stores/darkmode'

const route = useRoute()
const { locale } = useI18n()

import "@aws-amplify/ui-vue/styles.css";

const rtlCodes = [
  'ar',
  'arc',
  'dv',
  'fa',
  'ha',
  'he',
  'khw',
  'ks',
  'ku',
  'ps',
  'ur',
  'yi',
]

useHead(() => ({
  title: route.meta?.title ?? '',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${config.name}` : `${config.title}`
  },
  htmlAttrs: {
    lang: locale.value,
    dir: rtlCodes.includes(locale.value) ? 'rtl' : 'ltr',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/assets/logo/logo.svg',
    },
    {
      rel: 'alternate icon',
      href: '/assets/logo/gg.svg',
      type: 'image/x-icon',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
  ],
  meta: [
    // Critical Tags
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
    // PWA theme color
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'msapplication-TileColor',
      content: '#232326',
    },
    // SEO
    {
      name: 'robots',
      content: 'index,follow,max-image-preview:large',
    },
    {
      name: 'description',
      content: String(route.meta?.description ?? config.description),
    },
    // Open Graph
    {
      property: 'og:site_name',
      content: config.name,
    },
    {
      property: 'og:locale',
      content: locale.value,
    },
    {
      property: 'og:type',
      content: 'article',
    },
    config.url
      ? {
          property: 'og:url',
          content: config.url,
        }
      : {},
    ...(!config.image
      ? []
      : [
          {
            property: 'og:image:type',
            content: 'image/png',
          },
          {
            property: 'og:image:width',
            content: '1200',
          },
          {
            property: 'og:image:height',
            content: '630',
          },
          {
            property: 'og:image',
            content: config.image,
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
        ]),
    // Twitter
    {
      name: 'twitter:site',
      content: '@ghostjobs_',
    },
  ],
  script: [
    {
      children: `(function () {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        const setting = localStorage.getItem('color-schema') || '${
          config.theme.default ?? 'system'
        }}'
        if (setting === 'dark' || (prefersDark && setting !== 'light'))
          document.documentElement.classList.toggle('is-dark', true)
      })()`,
    },
  ],
}))

/**
 * Initialize the darkmode watcher
 *
 * @see /@src/stores/darkmode
 */
initDarkmode()
</script>

<template>
  <Suspense>
    <div>
      <VulkLayout />

      <ClientOnly>
        <ReloadPrompt :app-name="config.name">
          <template #logo>
            <DarkImage
              :src="config.logo.src"
              :src-dark="config.logo.srcDark"
              alt=""
              :width="config.logo.width"
              :height="config.logo.height"
            />
          </template>
        </ReloadPrompt>
      </ClientOnly>
    </div>
  </Suspense>
</template>
