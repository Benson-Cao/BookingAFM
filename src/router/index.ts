import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Home',
        component: () => import('../views/Home.vue'),
        redirect:'/book',
        children: [
            { path: "/book", name: "Book", component: () => import('../components/Booking.vue') },        
            { path: "/userInfo", name: "userInfo", component: () => import('../components/UserInfo.vue')},
            { path: "/order", name: "order", component: () => import('../components/Order.vue')},
        ]
    },
    { path:'/login', name: 'Login', component: () => import('../views/Login.vue') },
    { path: "/index", name: "Index", component: () => import('../views/backEnd/index.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // @ts-ignore
    // window.document.title=to.meta.title
    if(to.path==='/login'){
        window.localStorage.removeItem('token')
        next()
    }else{
        const token=window.localStorage.getItem('token')
        if(token){
            next()
        }else{
            window.localStorage.removeItem('token')
            next('/login')
        }
    }
})

export default router