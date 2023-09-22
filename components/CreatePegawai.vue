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
                            <label for="jabatan_id">Pilih Jabatan</label>
                            <select v-model="data_pegawai.jabatan_id" class="form-control" id="jabatan_id">
                                <option value="" disabled>Pilih Jabatan</option>
                                <option v-for="jabatan in jabatanId" :key="jabatan.id" :value="jabatan.id">{{
                                    jabatan.nama }}</option>
                            </select>
                            <span class="text-danger">{{ this.errorList.jabatan_id }}</span>
                        </div>
                        <div class="form-group">
                            <label for="pangkat">Pangkat</label>
                            <select v-model="data_pegawai.pangkat" class="form-control" id="pangkat">
                                <option value="" disabled>Pilih Unit Kerja</option>
                                <option v-for="pangkat in pangkatOptions" :value="pangkat">{{ pangkat }}</option>
                            </select>
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
                            <label for="unitKerja_id">Pilih Unit Kerja</label>
                            <select v-model="data_pegawai.unitKerja_id" class="form-control" id="unitKerja_id">
                                <option value="" disabled>Pilih Unit Kerja</option>
                                <option v-for="unit in UnitKerjaId" :key="unit.id" :value="unit.id">{{
                                    unit.nama }}</option>
                            </select>
                            <span class="text-danger">{{ this.errorList.unitKerja_id }}</span>
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
                jabatan_id: '',
                pangkat: '',
                nip: '',
                alamat: '',
                unitKerja_id: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading",
            rememberMe: false,
            errorList: {},
            jabatanId: [],
            UnitKerjaId: [],
            pangkatOptions: ['Juru Muda (I/a)','Juru Muda Tingkat 1 (I/b)', 'Juru (I/c)', 'Juru Tingkat 1 (I/d)', 
                            'Pengatur Muda (II/a)', 'Pengatur Muda Tingkat 1 (II/b)', 'Pengatur (II/c)', 'Pengatur Tingkat 1 (II/d)',
                            'Penata Muda (III/a)', 'Penata Muda Tingkat 1 (III/b)', 'Penata (III/c)', 'Penata Tingkat 1 (III/d)',
                            'Pembina (IV/a)', 'Pembina Tingkat 1(IV/b)', 'Pembina Utama Muda (IV/c)', 'Pembina Utama Madya (IV/d)', 'Pembina Utama (IV/e)']
        };
    },
    created() {
        this.getJabatan();
        this.getUnitKerja();
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
                        const requiredFields = ['nama', 'jabatan_id', 'pangkat', 'nip', 'alamat', 'unitKerja_id'];
                        let hasError = false;
                        for (const field of requiredFields) {
                            if (!this.data_pegawai[field]) {
                                this.errorList[field] = 'Harus diisi.';
                                hasError = true;
                            } else {
                                this.errorList[field] = null;
                            }
                        }
                        if (hasError) {
                            return;
                        }

                        const requestData = this.data_pegawai;
                        const accessToken = localStorage.getItem('token');
                        const response = await axios.post('http://127.0.0.1:8000/api/pegawai', requestData, {
                            headers: {
                            'Authorization': `Bearer ${accessToken}`
                            }
                        });

                        this.data_pegawai.nama = '';
                        this.data_pegawai.jabatan_id = '';
                        this.data_pegawai.pangkat = '';
                        this.data_pegawai.nip = '';
                        this.data_pegawai.alamat = '';
                        this.data_pegawai.unitKerja_id = '';
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
        },
        async getJabatan() {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/jabatan', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                this.jabatanId = response.data.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getUnitKerja() {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/unit_kerja', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                this.UnitKerjaId = response.data.data;
            } catch (error) {
                console.error(error);
            }
        },
    }
};
</script>