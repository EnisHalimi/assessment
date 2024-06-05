import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import SiteView from '../views/SiteView.vue'
import SingleSiteView from '../views/SingleSiteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Sites',
      component: SiteView
    },
    {
      path: '/site/:id',
      name: 'Single Site',
      component: SingleSiteView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
