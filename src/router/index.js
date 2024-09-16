import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signin from '@/views/Signin.vue';
import Orders from '../views/Orders.vue';
import ReplyDetail from '@/views/ReplyDetail.vue';
import Forbidden from '../views/Forbidden.vue';
import Page404 from '../views/Page404.vue';

import { userAuth } from '@/composable/userAuth';

const { isAuthenticated } = userAuth();

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { layout: 'NoHeaderFooterLayout' }, // Layout per la rotta principale
  },
  {
    path: '/sign-in',
    name: 'Signin',
    component: Signin,
    meta: { layout: 'NoHeaderFooterLayout' },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/reply/:id',
    name: 'replyDetail',
    component: ReplyDetail,
    meta: { requiresAuth: true, layout: 'DefaultLayout' },
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden,
    meta: { layout: 'NoHeaderFooterLayout' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: Page404,
    meta: { layout: 'NoHeaderFooterLayout' }, // Layout per questa rotta
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verifica se la route richiede autenticazione e se l'utente non è autenticato
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Reindirizza all pagina di login
    next('/login');
  } else {
    next();
  }
});

export default router;
