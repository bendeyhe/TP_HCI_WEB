import{createRouter, createWebHistory} from 'vue-router'
/* aca importar para carga estática*/
import HomeView from '@/views/HomeView.vue'
import storage from '../storage/storage.js'


const routes = [

    {
        path: '/',
        name: 'Home',
        meta: { requiresAuth: false },
        component: HomeView
    },

    {
        path: '/example',
        name: 'example',
        meta: { requiresAuth: true },
        component: () => import('@/components/ExampleComponent.vue')
      /* de esta manera se carga dinámicamente, bajo demanda */
    },

    {
        path: '/my-profile',
        name: 'my-profile',
        meta: { requiresAuth: true },
        component: () => import('@/views/MyProfile.vue')
    },

    {
        path: '/create-routine',
        name: 'create-routine',
        meta: { requiresAuth: true },
        component: () => import('@/views/CreateRoutine.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: () => import('@/views/LoginView.vue')
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: { requiresAuth: false },
        component: () => import('@/views/NotFound.vue')
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach((to, from, next) => {

    if(to.matched.some(route => route.meta.requiresAuth)){
        if(!storage.user){
            next({name: 'login', query: {redirect: to.fullPath }})
        }else{
            next()
        }
    } else {
        next()
    }
})


export default router
