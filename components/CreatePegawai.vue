<template>
    <div class="col-md-9 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Data Pegawai</h4>
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>
                <div v-else>
                    <form class="forms-sample" @submit.prevent="save_data">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text"  v-model="data_pegawai.nama" class="form-control" id="nama" placeholder="Masukkan Nama Anda">
                        </div>
                        <div class="form-group">
                            <label for="jabatan">Jabatan</label>
                            <input type="text" v-model="data_pegawai.jabatan" class="form-control" id="jabatan" placeholder="Masukkan Jabatan Anda">
                        </div>
                        <div class="form-group">
                            <label for="nip">NIP</label>
                            <input type="text" v-model="data_pegawai.nip" class="form-control" id="nip" placeholder="Masukkan NIP Anda">
                        </div>
                        <div class="form-group">
                            <label for="alamat">Alamat</label>
                            <input type="text" v-model="data_pegawai.alamat" class="form-control" id="alamat" placeholder="Masukkan Alamat Anda">
                        </div>
                        <div class="form-group">
                            <label for="unit_kerja">Unit Kreja</label>
                            <input type="text" v-model="data_pegawai.unit_kerja" class="form-control" id="unit_kerja" placeholder="Masukkan Unit Kerja Anda">
                        </div>
                        <div class="form-group">
                            <label for="dinas">Dinas</label>
                            <input type="text" v-model="data_pegawai.dinas" class="form-control" id="dinas" placeholder="Masukkan Dinas Anda">
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
    name: "CreatePegawai",
    data() {
        return {
            data_pegawai: {
                nama: '',
                jabatan: '',
                nip: '',
                alamat: '',
                unit_kerja: '',
                dinas: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading"
        }
    },
    methods: {
        async save_data() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            const requestData = this.data_pegawai;
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/pegawai', requestData);
                console.log(response.data);
                alert(response.data.message);

                this.data_pegawai.id = '';
                this.data_pegawai.nama = '';
                this.data_pegawai.jabatan = '';
                this.data_pegawai.nip = '';
                this.data_pegawai.alamat = '';
                this.data_pegawai.unit_kerja = '';
                this.data_pegawai.dinas = '';

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