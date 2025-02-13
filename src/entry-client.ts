import { createApp } from '/@src/app'
import '@purge-icons/generated'

createApp().then(async ({ app, router }) => {
  // wait client side hydratation to complete
  await router.isReady()

  app.mount('#app')
})
