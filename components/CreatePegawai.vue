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
                        </div>
                        <div class="form-group">
                            <label for="jabatan">Jabatan</label>
                            <input type="text" v-model="data_pegawai.jabatan" class="form-control" id="jabatan"
                                placeholder="Masukkan Jabatan Anda">
                        </div>
                        <div class="form-group">
                            <label for="nip">NIP</label>
                            <input type="text" v-model="data_pegawai.nip" class="form-control" id="nip"
                                placeholder="Masukkan NIP Anda">
                        </div>
                        <div class="form-group">
                            <label for="alamat">Alamat</label>
                            <input type="text" v-model="data_pegawai.alamat" class="form-control" id="alamat"
                                placeholder="Masukkan Alamat Anda">
                        </div>
                        <div class="form-group">
                            <label for="unit_kerja">Unit Kreja</label>
                            <input type="text" v-model="data_pegawai.unit_kerja" class="form-control" id="unit_kerja"
                                placeholder="Masukkan Unit Kerja Anda">
                        </div>
                        <div class="form-group">
                            <label for="dinas">Dinas</label>
                            <input type="text" v-model="data_pegawai.dinas" class="form-control" id="dinas"
                                placeholder="Masukkan Dinas Anda">
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
            isLoadingTitle: "Loading",
            rememberMe: false, // Add a new data property to store "Remember me" checkbox state
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
                        const requestData = this.data_pegawai;
                        const response = await axios.post('http://127.0.0.1:8000/api/pegawai', requestData);

                        this.data_pegawai.nama = '';
                        this.data_pegawai.jabatan = '';
                        this.data_pegawai.nip = '';
                        this.data_pegawai.alamat = '';
                        this.data_pegawai.unit_kerja = '';
                        this.data_pegawai.dinas = '';
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