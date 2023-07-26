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
                            <label for="jenis_cuti">Jenis Cuti</label>
                            <input type="text"  v-model="data_pengajuan_cuti.jenis_cuti" class="form-control" id="jenis_cuti" placeholder="Masukkan Jenis Cuti Anda">
                        </div>
                        <div class="form-group">
                            <label for="tgl_awal">Tanggal Awal</label>
                            <input type="date" v-model="data_pengajuan_cuti.tgl_awal" class="form-control" id="tgl_awal" >
                        </div>
                        <div class="form-group">
                            <label for="tgl_akhir">Tanggal Akhir</label>
                            <input type="date" v-model="data_pengajuan_cuti.tgl_akhir" class="form-control" id="tgl_akhir">
                        </div>
                        <div class="form-group">
                            <label for="alasan">Alasan</label>
                            <input type="text" v-model="data_pengajuan_cuti.alasan" class="form-control" id="alasan" placeholder="Masukkan Alasan Anda">
                        </div>
                        <div class="form-check form-check-flat form-check-primary">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "CreatePengajuanCuti",
    data() {
        return {
            data_pengajuan_cuti: {
                jenis_cuti: '',
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
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            const requestData = this.data_pengajuan_cuti;
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/pengajuan_cuti', requestData);
                console.log(response.data);
                alert("Data Berhasil Ditambahkan");

                this.data_pengajuan_cuti.jenis_cuti = '';
                this.data_pengajuan_cuti.tgl_awal = '';
                this.data_pengajuan_cuti.tgl_akhir = '';
                this.data_pengajuan_cuti.alasan = '';

                this.isLoading = false;
                this.isLoadingTitle = "Loading";

            }
            catch (error) {
                console.error(error)
            };
        }
    }
}
</script>