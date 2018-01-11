import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _cc37ff98 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _638ba34b = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _0abd636e = () => import('../pages/client/settings.vue' /* webpackChunkName: "pages/client/settings" */).then(m => m.default || m)
const _0ee8ed1c = () => import('../pages/client/places.vue' /* webpackChunkName: "pages/client/places" */).then(m => m.default || m)
const _0f506db6 = () => import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */).then(m => m.default || m)
const _567eabde = () => import('../pages/client/dashboard.vue' /* webpackChunkName: "pages/client/dashboard" */).then(m => m.default || m)
const _9b775f54 = () => import('../pages/client/promotions.vue' /* webpackChunkName: "pages/client/promotions" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _cc37ff98,
			name: "index"
		},
		{
			path: "/login",
			component: _638ba34b,
			name: "login"
		},
		{
			path: "/client/settings",
			component: _0abd636e,
			name: "client-settings"
		},
		{
			path: "/client/places",
			component: _0ee8ed1c,
			name: "client-places"
		},
		{
			path: "/admin/dashboard",
			component: _0f506db6,
			name: "admin-dashboard"
		},
		{
			path: "/client/dashboard",
			component: _567eabde,
			name: "client-dashboard"
		},
		{
			path: "/client/promotions",
			component: _9b775f54,
			name: "client-promotions"
		}
    ],
    
    
    fallback: false
  })
}
