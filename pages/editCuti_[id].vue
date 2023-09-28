<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <div class="card-edit-pegawai">
                    <h4 class="card-title">Edit Pengajuan Cuti</h4>
                    <NuxtLink class="btn btn-primary" to="/data_pengajuan_cuti_pegawai">Kembali</NuxtLink>
                </div>
                <div v-for="(cuti, index) in pengajuan_cuti" :key="index">
                    <form class="forms-sample" @submit.prevent="edit_data(cuti.id)">
                        <div class="form-group">
                            <label for="tgl_awal">Tanggal Awal</label>
                            <input type="date" v-model="cuti.tgl_awal" class="form-control" id="tgl_awal"
                                placeholder="Masukkan Tanggal Awal Anda">
                            <span class="text-danger">{{ errorList.tgl_awal }}</span>
                        </div>
                        <div class="form-group">
                            <label for="tgl_akhir">Tanggal Akhir</label>
                            <input type="date" v-model="cuti.tgl_akhir" class="form-control" id="tgl_akhir"
                                placeholder="Masukkan Tanggal Akhir Anda">
                            <span class="text-danger">{{ errorList.tgl_akhir }}</span>
                        </div>
                        <div class="form-group">
                            <label for="alasan">Alasan</label>
                            <input type="text" v-model="cuti.alasan" class="form-control" id="alasan"
                                placeholder="Masukkan Alasan Anda">
                            <span class="text-danger">{{ errorList.alasan }}</span>
                        </div>
                        <div class="form-group">
                            <label for="user_penyetuju">Kabid</label>
                            <select v-model="cuti.user_penyetuju" class="form-control" id="user_penyetuju">
                                <option value="" disabled>Pilih Kabid</option>
                                <option v-for="kabidUser in kabidUsers" :key="kabidUser.id" :value="kabidUser.id">{{
                                    kabidUser.pegawai.nama }}</option>
                            </select>
                            <span class="text-danger">{{ this.errorList.user_penyetuju }}</span>
                        </div>
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
})
</script>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import SidebarPegawai from '../components/SidebarPegawai.vue';
import Navbar from '../components/Navbar.vue';

export default {
    name: "EditCuti",
    components: {
        SidebarPegawai,
        Navbar,
    },
    data() {
        return {
            cutiId: '',
            pengajuan_cuti: {
                tgl_awal: '',
                tgl_akhir: '',
                alasan: '',
                user_penyetuju: '',
                user_id: JSON.parse(localStorage.getItem('user')).id,
            },
            isLoading: false,
            isLoadingTitle: "Loading",
            errorList: {
                tgl_awal: '',
                tgl_akhir: '',
                alasan: '',
                user_penyetuju: '',
            },
            kabidUsers: [],
        }
    },
    created() {
        this.getKabidUsers();
    },
    mounted() {
        this.cutiId = this.$route.params.id
        // alert(this.pegawaiId);
        this.getPengajuanCuti(this.cutiId);
    },
    methods: {
        getPengajuanCuti(cutiId) {
            const accessToken = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log(res.data.data);
                this.pengajuan_cuti = res.data.data;
            })
        },
        async edit_data(cutiId) {
            this.errorList = {
                tgl_awal: '',
                tgl_akhir: '',
                alasan: '',
                user_penyetuju: '',
            };
            try {
                const result = await Swal.fire({
                    title: 'Apakah Anda yakin akan mengubah data pengajuan cuti?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya'
                });

                if (result.isConfirmed) {
                    if (!this.rememberMe) {
                        const data = this.pengajuan_cuti[0];
                        console.log(data);
                        const requestData = {
                            user_id: data.user_id,
                            tgl_awal: data.tgl_awal,
                            tgl_akhir: data.tgl_akhir,
                            alasan: data.alasan,
                            user_penyetuju: data.user_penyetuju,
                        }
                        console.log(requestData);


                        try {
                            const accessToken = localStorage.getItem('token');
                            const response = await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`, requestData, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                            console.log(response.data);
                            // alert(response.data.message);
                            Swal.fire(
                                'Berhasil!',
                                'Data Anda berhasil diubah.',
                                'success'
                            );
                            this.backDataPengajuanCuti();

                        } catch (error) {
                            console.error(error);
                            if (!requestData.tgl_awal) {
                                this.errorList.tgl_awal = 'Harus diisi.';
                            }
                            if (!requestData.tgl_akhir) {
                                this.errorList.tgl_akhir = 'Harus diisi.';
                            }
                            if (!requestData.alasan) {
                                this.errorList.alasan = 'Harus diisi.';
                            }
                            if (!requestData.user_penyetuju) {
                                this.errorList.user_penyetuju = 'Harus diisi.';
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        backDataPengajuanCuti() {
            this.$router.push('/data_pengajuan_cuti_pegawai');
        },
        async getKabidUsers() {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                this.kabidUsers = response.data.data.filter(user => user.role === "kabid" );
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>