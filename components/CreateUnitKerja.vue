<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Data Unit Kerja</h4>
                <div>
                    <form class="forms-sample" @submit.prevent="save_data">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" v-model="data_unit_kerja.nama" class="form-control" id="nama"
                                placeholder="Masukkan Nama Unit Kerja">
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
    name: "CreateUnitKerja",
    data() {
        return {
            data_unit_kerja: {
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
                            if (!this.data_unit_kerja[field]) {
                                this.errorList[field] = 'Harus diisi.';
                                hasError = true;
                            } else {
                                this.errorList[field] = null;
                            }
                        }
                        if (hasError) {
                            return;
                        }

                        const requestData = this.data_unit_kerja;
                        const accessToken = localStorage.getItem('token');
                        const response = await axios.post('http://127.0.0.1:8000/api/unit_kerja', requestData, {
                            headers: {
                            'Authorization': `Bearer ${accessToken}`
                            }
                        });

                        this.data_unit_kerja.nama = '';
                        Swal.fire(
                            'Berhasil!',
                            'Data Anda berhasil tersimpan.',
                            'success'
                        );
                        this.backDataUnitKerja();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        backDataUnitKerja() {
            this.$router.push('/data_unit_kerja');
        }
    }
};
</script>