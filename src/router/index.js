
import Vue from 'vue'
import Router from 'vue-router'
import TableOfGoods from '@/components/TableOfGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableOfGoods',
      component: TableOfGoods
    }
  ]
})
