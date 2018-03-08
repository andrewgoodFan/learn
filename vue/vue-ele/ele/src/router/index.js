import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import city from '@/components/city'
import takeout from '@/components/pages/takeout'
import search from '@/components/pages/search'
import shop from '@/components/pages/shop'
Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/city/:id',
      name: 'city',
      component: city
    },
    {
      path: '/takeout/:geohash',
      name: 'takeout',
      component: takeout
    },
     {
      path: '/search/:geohash',
      name: 'search',
      component: search
    },
      {
      path: '/shop/:geohash/:id',
      name: 'shop',
      component: shop
    }
  ]
})
