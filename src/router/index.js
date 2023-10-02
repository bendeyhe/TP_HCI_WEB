import{createRouter, createWebHistory} from 'vue-router'
/* aca importar para carga estática*/
import HomeView from '@/views/HomeView.vue'


const routes = [

    {
        path: '/',
        name: 'Home',
        component: HomeView
    },

    {
        path: '/example',
        name: 'example',
        component: () => import('@/components/ExampleComponent.vue')
      /* de esta manera se carga dinámicamente, bajo demanda */
    },

    {
      path: '/my-profile',
      name: 'my-profile',
      component: () => import('@/views/MyProfile.vue')
    },

    {
      path: '/create-routine',
      name: 'create-routine',
      component: () => import('@/views/CreateRoutine.vue')
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound.vue')
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
