import Vue from 'vue';
import Dashboard from '../pages/dashboard';
Vue.use(VueRouter);

const routes =[
    {
        path: '/dashboard',
        component:Dashboard,
        children:[
            {
                path: '/dashboard',
                component:()=>import('../pages/dashboard.vue')
            },
            {
                path: '/data_pegawai',
                component:()=>import('../pages/data_pegawai.vue')
            },
            {
                path: '/create_pegawai',
                component:()=>import('../pages/create_pegawai.vue')
            },
            {
                path: '/data_pengajuan_cuti',
                component:()=>import('../pages/data_pengajuan_cuti.vue')
            },
            {
                path: '/create_pengajuan_cuti',
                component:()=>import('../pages/create_pengajuan_cuti.vue')
            },
        ]
    }
]
const router = new VueRouter(
    {
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    }
)
export default router;