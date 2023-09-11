<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Data Pengajuan Cuti</h4>
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>
                <div v-else>
                    <form class="forms-sample" @submit.prevent="save_data">
                        <div class="form-group">
                            <label for="pegawai_id">Pegawai ID</label>
                            <input type="text" v-model="data_pengajuan_cuti.pegawai_id" class="form-control" id="pegawai_id"
                                placeholder="Masukkan Jenis Cuti Anda">
                        </div>
                        <div class="form-group">
                            <label for="tgl_awal">Tanggal Awal</label>
                            <input type="date" v-model="data_pengajuan_cuti.tgl_awal" class="form-control" id="tgl_awal">
                        </div>
                        <div class="form-group">
                            <label for="tgl_akhir">Tanggal Akhir</label>
                            <input type="date" v-model="data_pengajuan_cuti.tgl_akhir" class="form-control" id="tgl_akhir">
                        </div>
                        <div class="form-group">
                            <label for="alasan">Alasan</label>
                            <input type="text" v-model="data_pengajuan_cuti.alasan" class="form-control" id="alasan"
                                placeholder="Masukkan Alasan Anda">
                        </div>
                        <div class="form-check form-check-flat form-check-primary">
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
    name: "CreatePengajuanCuti",
    data() {
        return {
            data_pengajuan_cuti: {
                pegawai_id: '',
                tgl_awal: '',
                tgl_akhir: '',
                alasan: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading"
        }
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
                        const requiredFields = ['pegawai_id', 'tgl_awal', 'tgl_akhir', 'alasan'];
                        let hasError = false;
                        for (const field of requiredFields) {
                            if (!this.data_pengajuan_cuti[field]) {
                                this.errorList[field] = 'Field is required.';
                                hasError = true;
                            } else {
                                this.errorList[field] = null;
                            }
                        }
                        if (hasError) {
                            return;
                        }

                        const requestData = this.data_pengajuan_cuti;
                        const accessToken = localStorage.getItem('token'); 
                        const response = await axios.post('http://127.0.0.1:8000/api/pengajuan_cuti', requestData, {
                            headers: {
                            'Authorization': `Bearer ${accessToken}`
                            }
                        });

                        this.data_pengajuan_cuti.pegawai_id = '';
                        this.data_pengajuan_cuti.tgl_awal = '';
                        this.data_pengajuan_cuti.tgl_akhir = '';
                        this.data_pengajuan_cuti.alasan = '';
                        Swal.fire(
                            'Berhasil!',
                            'Data Anda berhasil tersimpan.',
                            'success'
                        );
                        this.backDataPengajuanCuti();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },

        backDataPengajuanCuti() {
            this.$router.push('/data_pengajuan_cuti');
        }
    }
}
</script>