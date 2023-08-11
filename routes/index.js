import Vue from 'vue';
import Dashboard from '../pages/dashboard';
Vue.use(VueRouter);

const routes =[
    {
        path: '/dashboard',
        component:Dashboard,
        children:[
            {
                // middleware:'auth',
                path: '/dashboard',
                component:()=>import('../pages/dashboard.vue')
            },
            {
                // middleware:'auth',
                path: '/data_pegawai',
                component:()=>import('../pages/data_pegawai.vue')
            },
            {
                // middleware:'auth',
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
            {
                path: '/edit_pegawai/${id}',
                component:()=>import('../pages/edit_pegawai.vue')
            },
            {
                path: '/data_rekap_cuti',
                component:()=>import('../pages/data_rekap_cuti.vue')
            },
            {
                path: '/login',
                component:()=>import('../pages/login.vue')
            },
            {
                path: '/cetak_pdf/${id}',
                component:()=>import('../pages/cetak_pdf.vue')
            },
        ]
    }
]
const router = new VueRouter(
    {
        base: process.env.BASE_URL,
        routes
    }
)
export default router;