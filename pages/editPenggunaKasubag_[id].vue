<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <div class="card-edit-pegawai">
                    <h4 class="card-title">Edit Pengguna</h4>
                </div>
                <div>
                    <form class="forms-sample" @submit.prevent="edit_data(pengguna.id)">
                        <div class="form-group">
                            <label for="name">Username</label>
                            <input type="name" v-model="pengguna.name" class="form-control" id="name"
                                placeholder="Masukkan Username Anda">
                            <span class="text-danger">{{ errorList.name }}</span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="pengguna.email" class="form-control" id="email"
                                placeholder="Masukkan Email Anda">
                            <span class="text-danger">{{ errorList.email }}</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="pengguna.password" class="form-control" id="password"
                                placeholder="Masukkan Password Anda">
                            <span class="text-danger">{{ errorList.password }}</span>
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
    layout: ['sidebar-kasubag']
})
</script>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar.vue';

export default {
    name: "EditPegawai",
    components: {
        Navbar,
    },
    data() {
        return {
            penggunaId: '',
            pengguna: {
                name: '',
                email: '',
                password: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading",
            errorList: {
                name: '',
                email: '',
                password: '',
            }
        }
    },
    mounted() {
        this.getPengguna();
    },
    methods: {
        getPengguna() {
            const accessToken = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log(res.data.data);
                this.pengguna = res.data.data;
            })
        },
        async edit_data(penggunaId) {
            this.errorList = {
                name: '',
                email: '',
                password: '',
            };
            try {
                const result = await Swal.fire({
                    title: 'Apakah Anda yakin akan mengubah data pengguna?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya'
                });

                if (result.isConfirmed) {
                    const data = this.pengguna;
                    console.log(data);
                    const requestData = {
                        name: data.name,
                        password: data.password,
                        email: data.email,
                    }
                    console.log(requestData);

                    try {
                        const accessToken = localStorage.getItem('token');
                        const response = await axios.put(`http://127.0.0.1:8000/api/profile/${penggunaId}`, requestData, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                        console.log(response.data);
                        Swal.fire(
                            'Berhasil!',
                            'Data Anda berhasil diubah.',
                            'success'
                        );
                        this.backDataPengguna();

                    } catch (error) {
                        if (!requestData.name) {
                            this.errorList.name = 'Harus diisi.';
                        }
                        if (!requestData.email) {
                            this.errorList.email = 'Harus diisi.';
                        }
                        if (!requestData.password) {
                            this.errorList.password = 'Harus diisi.';
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        backDataPengguna() {
            this.$router.push('/pengguna_kasubag');
        }
    }
}
</script>