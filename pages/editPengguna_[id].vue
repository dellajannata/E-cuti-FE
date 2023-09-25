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
                            <label for="oldPassword">Password Lama</label>
                            <div class="input-group">
                                <input :type="showPassword.oldPassword ? 'text' : 'password'" v-model="pengguna.oldPassword"
                                    class="form-control" id="oldPassword" placeholder="Masukkan Password Lama Anda">
                                <div class="input-group-append">
                                    <span class="input-group-text password-icon"
                                        @click="togglePasswordVisibility('oldPassword')">
                                        <i :class="showPassword.oldPassword ?  'fa fa-eye': 'fa fa-eye-slash'"></i>
                                    </span>
                                </div>
                            </div>
                            <span class="text-danger">{{ errorList.oldPassword }}</span>
                        </div>
                        <div class="form-group">
                            <label for="newPassword">Password Baru</label>
                            <div class="input-group">
                                <input :type="showPassword.newPassword ? 'text' : 'password'" v-model="pengguna.newPassword"
                                    class="form-control" id="newPassword" placeholder="Masukkan Password Baru Anda">
                                <div class="input-group-append">
                                    <span class="input-group-text password-icon"
                                        @click="togglePasswordVisibility('newPassword')">
                                        <i :class="showPassword.newPassword ? 'fa fa-eye': 'fa fa-eye-slash'"></i>
                                    </span>
                                </div>
                            </div>
                            <span class="text-danger">{{ errorList.newPassword }}</span>
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
    layout: ['sidebar-role']
})
</script>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import SidebarPegawai from '../components/SidebarPegawai.vue';
import Navbar from '../components/Navbar.vue';

export default {
    name: "EditPegawai",
    components: {
        SidebarPegawai,
        Navbar,
    },
    data() {
        return {
            penggunaId: '',
            pengguna: {
                name: '',
                email: '',
                oldPassword: '',
                newPassword: ''
            },

            showPassword: {
                oldPassword: false,
                newPassword: false,
            },

            isLoading: false,
            isLoadingTitle: "Loading",
            errorList: {
                name: '',
                email: '',
                oldPassword: '',
                newPassword: ''
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

        
        togglePasswordVisibility(inputName) {
            this.showPassword[inputName] = !this.showPassword[inputName];
        },

        async edit_data(penggunaId) {
            this.errorList = {
                name: '',
                email: '',
                oldPassword: '',
                newPassword: ''
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
                    const requestData = {
                        name: data.name,
                        email: data.email,
                        oldPassword: data.oldPassword,
                        newPassword: data.newPassword
                    }

                    // Periksa apakah password lama sesuai
                    if (!requestData.oldPassword) {
                        this.errorList.oldPassword = 'Harus diisi.';
                    } else {
                        try {
                            const accessToken = localStorage.getItem('token');
                            const response = await axios.put(`http://127.0.0.1:8000/api/profile/${penggunaId}`, requestData, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                            // Jika password lama sesuai, lanjutkan dengan pembaruan
                            if (response.data.success) {
                                const requestData = {
                                    name: data.name,
                                    email: data.email,
                                    old_password: data.oldPassword,
                                    new_password: data.newPassword,
                                };
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
                                    if (!requestData.old_password) {
                                        this.errorList.oldPassword = 'Harus diisi.';
                                    }
                                    if (!requestData.new_password) {
                                        this.errorList.newPassword = 'Harus diisi.';
                                    } else {
                                        this.errorList.oldPassword = 'Password lama salah';
                                        console.log("error")
                                    }
                                }
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        backDataPengguna() {
            this.$router.push('/pengguna_pegawai');
        }
    }
}
</script>