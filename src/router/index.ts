import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/script-list',
    name: 'script-list',
    component: () => import(/* webpackChunkName: "script-list" */ '@/views/ScriptList.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
  },
  {
    path: '/manual',
    name: 'manual',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
  },
  {
    path: '/language',
    name: 'language',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
  },
  {
    path: '/system-info',
    name: 'system-info',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import(/* webpackChunkName: "userinfo" */ '@/views/UserInfo.vue'),
  },
  {
    path: '/my-script',
    name: 'my-script',
    component: () => import(/* webpackChunkName: "userinfo" */ '@/views/UserInfo.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "userinfo" */ '@/views/UserInfo.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
