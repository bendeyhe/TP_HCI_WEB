import {createRouter, createWebHistory} from 'vue-router'
/* aca importar para carga estática*/
import HomeView from '@/views/HomeView.vue'
import storage from '../storage/storage.js'
import {useUserStore} from "@/stores/userStore.js";
import {useRoutineStore} from "@/stores/routineStore";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {requiresAuth: false},
        component: HomeView
    },
    {
        path: '/example',
        name: 'example',
        meta: {requiresAuth: true},
        component: () => import('@/components/ExampleComponent.vue')
        /* de esta manera se carga dinámicamente, bajo demanda */
    },
    {
        path: '/my-profile',
        name: 'my-profile',
        meta: {requiresAuth: true},
        component: () => import('@/views/MyProfile.vue')
    },
    {
        path: '/create-routine',
        name: 'create-routine',
        meta: {requiresAuth: true},
        component: () => import('@/views/CreateRoutine.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {requiresAuth: false},
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/create-account',
        name: 'create-account',
        meta: {requiresAuth: false},
        component: () => import('@/views/CreateAccount.vue')
    },
    {
        path: '/validate',
        name: 'validate',
        meta: {requiresAuth: false},
        component: () => import('@/views/ValidateMail.vue')
    },
    {
        path: "/routine-details/:id",
        name: "routine-details",
        meta: {requiresAuth: true},
        props: true,
        component: () => import("@/views/RoutineDetails.vue"),
        beforeEnter: async (to, from, next) => {
            const routineId = to.params.id;
            const result = await useRoutineStore().getRoutine(routineId);
            try{
                if (result.success) {
                    next();
                } else {
                    next({name: 'not-found'})
                }
            } catch (error) {
                console.error("Error en la solicitud API:", error);
                next({ name: "not-found" }); //todo hacer una pantallita de error o algo? o dejar el not found?

            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: {requiresAuth: false},
        component: () => import('@/views/NotFound.vue')
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach((to, from, next) => {

    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (useUserStore().getTokenState === null || useUserStore().getTokenState === undefined || useUserStore().getTokenState === '') {
            next({name: 'login', query: {redirect: to.fullPath}})
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
