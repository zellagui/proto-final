import VueApexCharts from 'vue3-apexcharts'
import { definePlugin } from '/@src/app'

export default definePlugin(async ({ app }) => {
  app.component('VueApexCharts', VueApexCharts)
})
