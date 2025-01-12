import {createRouter, createWebHistory} from 'vue-router'
/* aca importar para carga estática*/
import HomeView from '@/views/HomeView.vue'
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
        path: '/edit-routine/:id',
        name: 'edit-routine',
        meta: {requiresAuth: true},
        props: true,
        component: () => import('@/views/EditRoutine.vue'),
    },
    {
        path: '/favourite',
        name: 'favourite',
        meta: {requiresAuth: true},
        component: () => import('@/views/FavouriteView.vue')
    },
    {
        path: '/my-exercises',
        name: 'my-exercises',
        meta: {requiresAuth: true},
        component: () => import('@/views/MyExercisesView.vue')
    },
    {
        path: '/my-routines',
        name: 'my-routines',
        meta: {requiresAuth: true},
        component: () => import('@/views/MyRoutines.vue')
    },
    {
        path: '/routines/:query?',
        name: 'routines',
        meta: {requiresAuth: true},
        component: () => import('@/views/Routines.vue'),
        props: (route) => ({ query: route.params.query })
    },
    {
        path: '/all-routines',
        name: 'all-routines',
        meta: {requiresAuth: true},
        component: () => import('@/views/AllRoutines.vue')
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
            try {
                if (result.success) {
                    next();
                } else {
                    next({name: 'not-found'})
                }
            } catch (error) {
                console.error("Error en la solicitud API:", error);
                next({name: "not-found"});
            }
        }
    },
    {
        path: "/favourite-routines",
        name: "favourite-routines",
        meta: {requiresAuth: true},
        props: true,
        component: () => import("@/views/FavouriteView.vue")
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
