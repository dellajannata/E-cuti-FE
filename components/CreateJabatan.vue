<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Data Jabatan</h4>
                <div>
                    <form class="forms-sample" @submit.prevent="save_data">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" v-model="data_jabatan.nama" class="form-control" id="nama"
                                placeholder="Masukkan Nama Jabatan">
                            <span class="text-danger">{{ this.errorList.nama }}</span>
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

export default {
    name: "CreateJabatan",
    data() {
        return {
            data_jabatan: {
                nama: '',
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
                    confirmButtonText: 'Yes'
                });

                if (result.isConfirmed) {
                    if (!this.rememberMe) {
                        this.errorList = {};
                        const requiredFields = ['nama'];
                        let hasError = false;
                        for (const field of requiredFields) {
                            if (!this.data_jabatan[field]) {
                                this.errorList[field] = 'Harus diisi.';
                                hasError = true;
                            } else {
                                this.errorList[field] = null;
                            }
                        }
                        if (hasError) {
                            return;
                        }

                        const requestData = this.data_jabatan;
                        const accessToken = localStorage.getItem('token');
                        const response = await axios.post('http://127.0.0.1:8000/api/jabatan', requestData, {
                            headers: {
                            'Authorization': `Bearer ${accessToken}`
                            }
                        });

                        this.data_jabatan.nama = '';
                        Swal.fire(
                            'Berhasil!',
                            'Data Anda berhasil tersimpan.',
                            'success'
                        );
                        this.backDataJabatan();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        backDataJabatan() {
            this.$router.push('/data_jabatan');
        }
    }
};
</script>