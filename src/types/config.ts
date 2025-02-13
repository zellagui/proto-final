export interface VulkConfig<
  Navbar extends abstract new (...args: any) => any = any,
  Footer extends abstract new (...args: any) => any = any,
> {
  name: string
  title: string
  description: string
  url: string
  image?: string
  theme: {
    default?: 'system' | 'light' | 'dark'
    toggle?: boolean
    disableTransitions?: boolean
  }
  logo: {
    src: string
    srcDark?: string
    width?: number
    height?: number
  }
  layout: {
    transition?: 'no-transition' | 'fade-fast' | 'fade-slow' | 'list'
    backToTop?: {
      enabled: boolean
    }
    navbar?: {
      enabled: boolean
      component?: Navbar
      props?: InstanceType<Navbar>['$props']
    }
    footer?: {
      enabled: boolean
      component?: Footer
      props?: InstanceType<Footer>['$props']
    }
  }
}
