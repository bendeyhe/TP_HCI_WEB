import{createRouter, createWebHistory} from 'vue-router'
import ExampleComponent from '@/components/ExampleComponent.vue'

const routes = [

    {
        path: '/example',
        component: ExampleComponent
    },

    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router