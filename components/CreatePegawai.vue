<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Data Pegawai</h4>
                <div>
                    <form class="forms-sample" @submit.prevent="save_data">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" v-model="data_pegawai.nama" class="form-control" id="nama"
                                placeholder="Masukkan Nama Anda">
                            <span class="text-danger">{{ this.errorList.nama }}</span>
                        </div>
                        <div class="form-group">
                            <label for="jabatan">Jabatan</label>
                            <input type="text" v-model="data_pegawai.jabatan" class="form-control" id="jabatan"
                                placeholder="Masukkan Jabatan Anda">
                            <span class="text-danger">{{ this.errorList.jabatan }}</span>
                        </div>
                        <div class="form-group">
                            <label for="pangkat">Pangkat</label>
                            <input type="text" v-model="data_pegawai.pangkat" class="form-control" id="pangkat"
                                placeholder="Masukkan Pangkat Anda">
                            <span class="text-danger">{{ this.errorList.pangkat }}</span>
                        </div>
                        <div class="form-group">
                            <label for="nip">NIP</label>
                            <input type="text" v-model="data_pegawai.nip" class="form-control" id="nip"
                                placeholder="Masukkan NIP Anda">
                            <span class="text-danger">{{ this.errorList.nip }}</span>
                        </div>
                        <div class="form-group">
                            <label for="alamat">Alamat</label>
                            <input type="text" v-model="data_pegawai.alamat" class="form-control" id="alamat"
                                placeholder="Masukkan Alamat Anda">
                            <span class="text-danger">{{ this.errorList.alamat }}</span>
                        </div>
                        <div class="form-group">
                            <label for="unit_kerja">Unit Kreja</label>
                            <input type="text" v-model="data_pegawai.unit_kerja" class="form-control" id="unit_kerja"
                                placeholder="Masukkan Unit Kerja Anda">
                            <span class="text-danger">{{ this.errorList.unit_kerja }}</span>
                        </div>
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import authMiddleware from '../middleware/auth';

export default {
    name: "CreatePegawai",
    auth: true,
    middleware: [authMiddleware],
    data() {
        return {
            data_pegawai: {
                nama: '',
                jabatan: '',
                pangkat: '',
                nip: '',
                alamat: '',
                unit_kerja: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading",
            rememberMe: false,
            errorList: {},
        };
    },
    methods: {
        async save_data() {
            try {
                const result = await Swal.fire({
                    title: 'Apakah Anda yakin akan menyimpan data?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, save it!'
                });

                if (result.isConfirmed) {
                    if (!this.rememberMe) {
                        this.errorList = {};
                        const requiredFields = ['nama', 'jabatan', 'pangkat', 'nip', 'alamat', 'unit_kerja'];
                        let hasError = false;
                        for (const field of requiredFields) {
                            if (!this.data_pegawai[field]) {
                                this.errorList[field] = 'Field is required.';
                                hasError = true;
                            } else {
                                this.errorList[field] = null;
                            }
                        }
                        if (hasError) {
                            return;
                        }

                        const requestData = this.data_pegawai;
                        const accessToken = localStorage.getItem('access_token');
                        const response = await axios.post('http://127.0.0.1:8000/api/pegawai', requestData);

                        this.data_pegawai.nama = '';
                        this.data_pegawai.jabatan = '';
                        this.data_pegawai.pangkat = '';
                        this.data_pegawai.nip = '';
                        this.data_pegawai.alamat = '';
                        this.data_pegawai.unit_kerja = '';
                        Swal.fire(
                            'Berhasil!',
                            'Data Anda berhasil tersimpan.',
                            'success'
                        );
                        this.backDataPegawai();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        backDataPegawai() {
            this.$router.push('/data_pegawai');
        }
    }
};
</script>