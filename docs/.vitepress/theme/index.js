import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroDiagram from '../components/HeroDiagram.vue'
import Architecture3Layer from '../components/Architecture3Layer.vue'
import EcosystemFlowMcp from '../components/EcosystemFlowMcp.vue'
import PremiumLanding from '../components/PremiumLanding.vue'
import CustomFooter from '../components/CustomFooter.vue'
import { h } from 'vue'

import CustomNotFound from './NotFound.vue'

// Homepages que devem ter header transparente (EN, PT, ES)
const HOME_PATHS = new Set(['/', '/pt/', '/es/', '/pt', '/es'])

function updateBodyClass(path) {
  if (typeof document === 'undefined') return
  const isHome = HOME_PATHS.has(path) || path === '/'
  document.body.classList.toggle('bsp-home', isHome)
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter),
      'not-found': () => h(CustomNotFound)
    })
  },
  enhanceApp({ app, router }) {
    app.component('HeroDiagram', HeroDiagram)
    app.component('Architecture3Layer', Architecture3Layer)
    app.component('EcosystemFlowMcp', EcosystemFlowMcp)
    app.component('PremiumLanding', PremiumLanding)

    // Injetar/remover classe bsp-home no body para header transparente
    if (router) {
      router.onAfterRouteChanged = (to) => {
        updateBodyClass(to)
      }
    }
    // Roda na carga inicial (SSR-safe)
    if (typeof window !== 'undefined') {
      updateBodyClass(window.location.pathname)

      // Header opaco ao rolar
      const onScroll = () => {
        document.body.classList.toggle('bsp-scrolled', window.scrollY > 60)
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      // Navbar order: physically move DOM elements to correct position
      const reorderNav = () => {
        const contentBody = document.querySelector('.VPNavBar .content-body')
        if (!contentBody) return
        const menu = contentBody.querySelector('.menu')
        const search = contentBody.querySelector('.search')
        if (!menu || !search) return
        // Move menu to be the first child of content-body
        contentBody.insertBefore(menu, contentBody.firstChild)
        // Move search right after menu
        menu.after(search)
      }
      // Run after mount and on route changes
      setTimeout(reorderNav, 100)
      if (router) {
        const origFn = router.onAfterRouteChanged
        router.onAfterRouteChanged = (to) => {
          origFn && origFn(to)
          setTimeout(reorderNav, 100)
        }
      }
    }
  }
}
