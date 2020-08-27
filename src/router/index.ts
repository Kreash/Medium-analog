import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'
// import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'start',
    meta: { layout: 'start' },
    component: () => import('../views/Start.vue')
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
      // console.log('enter:', role)
      next()
      return
    }
    console.log('required reader')
    if (role == 'writer') {
      next('/writer')
      return
    }
    next('/')
  } else if (to.matched.some(record => record.meta.authWriter)) {
    if (role == 'writer') {
      // console.log('enter:', role)
      next()
      return
    }
    console.log('required writer:', store.getters.authRole)
    if (role == 'reader') {
      next('/reader')
      return
    }
    next('/')
  } else {
    next();
  }
})





// router.beforeEach((to, from, next) => {
//   // console.log(store.state.user.role);
//   console.log(to.matched.some(record => record.meta.authReader))
//   next()
//   // const currentUser = this.$store.state.user.role
//   // const requireAuth = to.matched.some(record => record.meta.authReader)

//   // if (requireAuth && !currentUser){
//   //   next('/login&message=login')
//   // } else {
//   //   next()
//   // }
// })

export default router
