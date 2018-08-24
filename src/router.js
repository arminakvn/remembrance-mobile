import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EncyclopediaItem from './components/EncyclopediaItem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/encyclopedia-item/Trees Provide Relief' },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
            path: '/encyclopedia-item/:id',
            name: 'encyclopedia-item',
            component: EncyclopediaItem,
            props: true 
          }
      ]
    },

  ]
})
