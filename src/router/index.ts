import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'start',
    meta: { layout: 'start' },
    component: () => import('../views/StartPage.vue')
  },
  {
    path: '/reader',
    name: 'reader',
    meta: { layout: 'reader', authReader: true },
    component: () => import('../views/ReaderPage.vue')
  },
  {
    path: '/writer',
    name: 'writer',
    meta: { layout: 'writer', authWriter: true },
    component: () => import('../views/WriterPage.vue')
  },
  {
    path: '/new-story',
    name: 'new-story',
    meta: { layout: 'writer', authWriter: true },
    component: () => import('../views/NewStory.vue')
  },
  {
    path: '/edit-story',
    name: 'edit-story',
    meta: { layout: 'writer', authWriter: true },
    component: () => import('../views/EditStory.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const role = store.getters.authRole
  if (to.matched.some(record => record.meta.authReader)) {
    if (role == 'reader') {
      next()
      return
    }
    if (role == 'writer') {
      next('/writer')
      return
    }
    next('/')
  } else if (to.matched.some(record => record.meta.authWriter)) {
    if (role == 'writer') {
      next()
      return
    }
    if (role == 'reader') {
      next('/reader')
      return
    }
    next('/')
  } else {
    next();
  }
})

export default router
