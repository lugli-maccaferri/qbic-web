import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue';
import Server from '../views/Server.vue';
import Files from '../views/Files.vue';
import PanelView from '../components/PanelView.vue';
import api from '@/lib/api';
import store from '@/store';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    meta: {
      requires_login: true
    },
  },
  {
    path: '/servers',
    name: 'Servers',
    meta: { requires_login: true },
    component: PanelView,
    children: [
      {
        path: ':id',
        name: 'Server view',
        component: Server,
        meta: { requires_login: true }
      },
      {
        path: ':id/files',
        name: 'Server files',
        component: Files,
        meta: { requires_login: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
  async(to, from, next) => {

    if(to.meta){

      if(to.meta.requires_login){

        try{
          
          const user = await api.auth.validate();
          console.log(user);
          next()

        }catch(err){

          location.href = "/login";

        }

      }

      next();

    }
  }
)

export default router
