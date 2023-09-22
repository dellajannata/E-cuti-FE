<template>
    <div class="card">
        <div class="card-body">
            <div class="tittle-profile">
                <h4 class="card-title">Data Pengguna</h4>
                <div class="card-pegawai">
                    <NuxtLink :to="`../editPengguna_${data_profile.id}`" class="btn btn-primary btn-sm">Edit</NuxtLink>
                </div>
            </div>
            <br>
            <div class="table-responsive">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{{ data_profile.name }}</td>


                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <td>{{ data_profile.email }}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>Password</th>
                            <td>{{ data_profile.password }}</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            data_profile: [],
            data_pegawai: []
        }
    },
    mounted() {
        this.getDataProfile();
        this.getDataPegawai();
    },
    methods: {
        getDataProfile() {
            const accessToken = localStorage.getItem('token');
            axios.get('http://127.0.0.1:8000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log(res.data.data);
                this.data_profile = res.data.data;
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        getDataPegawai() {
            const accessToken = localStorage.getItem('token');
            axios.get('http://127.0.0.1:8000/api/pegawai_all', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log(res.data.data);
                this.data_pegawai = res.data.data;
            })
                .catch(error => {
                    console.error('Error fetching pegawai data:', error);
                });
        },
    }
};
</script>