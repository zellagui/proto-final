/**
 * This is a store that hold the dark mode state
 * It could be auto (fit system preference), dark or light
 *
 * Using useStorage from @vueuse/core allow persistance storage accross tabs/sessions
 *
 * We can import and set isDark anywhere in our project
 */

import config from '/@src/app.config'
import { computed, watchEffect } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'

export const DARK_MODE_BODY_CLASS = 'is-dark'
export type DarkModeSchema = 'system' | 'dark' | 'light'

export const initDarkmode = () => {
  const darkmode = useDarkmode()

  /**
   * watchEffect callbacks will be executed each time used reactives value has changed
   */
  watchEffect(() => {
    if (!import.meta.env.SSR) {
      const body = document.documentElement

      if (darkmode.isDark) {
        body.classList.add(DARK_MODE_BODY_CLASS)
      } else {
        body.classList.remove(DARK_MODE_BODY_CLASS)
      }
    }
  })
}

export const useDarkmode = defineStore('darkmode', () => {
  const preferredDark = usePreferredDark()
  const colorSchema = useStorage<DarkModeSchema>(
    'color-schema',
    config.theme.default || 'system',
  )

  const isDark = computed({
    get() {
      return colorSchema.value === 'system'
        ? preferredDark.value
        : colorSchema.value === 'dark'
    },
    set(v: boolean) {
      if (v === preferredDark.value) colorSchema.value = 'system'
      else colorSchema.value = v ? 'dark' : 'light'
    },
  })

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    isDark.value = !target.checked
  }

  return {
    isDark: skipHydrate(isDark),
    onChange,
  }
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDarkmode, import.meta.hot))
}
