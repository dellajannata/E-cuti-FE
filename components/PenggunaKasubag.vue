<template>
    <div class="card">
        <div class="card-body">
            <div class="tittle-profile">
                <h4 class="card-title">Data Pengguna</h4>
                <div class="card-pegawai">
                    <NuxtLink :to="`../editPenggunaKasubag_${data_profile.id}`" class="btn btn-primary btn-sm">Edit</NuxtLink>
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
                    </tbody> <br>
                    <h4 class="card-title">Data Pegawai</h4>
                    <tbody>
                        <tr>
                            <th>Nama</th>
                            <td>{{ getNamaPegawai() }}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>Jabatan</th>
                            <td>{{ getJabatanPegawai() }}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>Pangkat</th>
                            <td>{{ getPangkatPegawai() }}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>NIP</th>
                            <td>{{ getNipPegawai() }}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th>Alamat</th>
                            <td>{{ getAlamatPegawai() }}</td>
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
            axios.get('http://127.0.0.1:8000/api/pegawai', {
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
        getPegawaiId() {
            const userData = JSON.parse(localStorage.getItem('user'));
            return userData ? userData.pegawai_id : ''; // Mengambil id user dari objek pengguna 
        },
        getNamaPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.nama : 'Nama Pegawai Tidak Tersedia';
        },
        getJabatanPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.jabatan : 'Jabatan Pegawai Tidak Tersedia';
        },
        getPangkatPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.pangkat : 'Pangkat Pegawai Tidak Tersedia';
        },
        getNipPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.nip : 'NIP Pegawai Tidak Tersedia';
        },
        getAlamatPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.alamat : 'Alamat Pegawai Tidak Tersedia';
        },
        getUnitKerjaPegawai() {
            const user = this.getPegawaiId();
            const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
            return pegawai ? pegawai.unit_kerja : 'Unit Kerja Pegawai Tidak Tersedia';
        },
    }
};
</script>