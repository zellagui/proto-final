declare module 'vue-router' {
  interface RouteMeta {
    navbar?: {
      enabled?: boolean
      props?: Record<string, any>
    }
    footer?: {
      enabled?: boolean
      props?: Record<string, any>
    }
    backToTop?: {
      enabled?: boolean
    }
  }
}

export {}
