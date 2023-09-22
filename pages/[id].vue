<template>
  <div class="col-md-9 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="card-edit-pegawai">
          <h4 class="card-title">Edit Data Pegawai</h4>
          <NuxtLink class="btn btn-primary" to="/data_pegawai">Kembali</NuxtLink>
        </div>
        <div v-for="(pegawai, index) in data_pegawai" :key="index">
          <form class="forms-sample" @submit.prevent="edit_data(pegawai.id)">
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" v-model="pegawai.nama" class="form-control" id="nama" placeholder="Masukkan Nama Anda">
              <span class="text-danger">{{ errorList.nama }}</span> 
            </div>
            <div class="form-group">
              <label for="jabatan_id">Jabatan</label>
                <select v-model="pegawai.jabatan_id" class="form-control" id="jabatan_id">
                  <option value="" disabled>Pilih Jabatan</option>
                  <option v-for="jabatan in jabatanId" :key="jabatan.id" :value="jabatan.id">{{ jabatan.nama }}</option>
                </select>
              <span class="text-danger">{{ errorList.jabatan_id }}</span> 
            </div>
            <div class="form-group">
              <label for="pangkat">Pangkat</label>
                <select v-model="pegawai.pangkat" class="form-control" id="pangkat">
                    <option value="" disabled>Pilih Pangkat</option>
                    <option v-for="pangkat in pangkatOptions" :value="pangkat">{{ pangkat }}</option>
                </select>
              <span class="text-danger">{{ errorList.pangkat }}</span> 
            </div>
            <div class="form-group">
              <label for="nip">NIP</label>
              <input type="text" v-model="pegawai.nip" class="form-control" id="nip" placeholder="Masukkan NIP Anda">
              <span class="text-danger">{{ errorList.nip }}</span>
            </div>
            <div class="form-group">
              <label for="alamat">Alamat</label>
              <input type="text" v-model="pegawai.alamat" class="form-control" id="alamat" placeholder="Masukkan Alamat Anda">
              <span class="text-danger">{{ errorList.alamat }}</span> 
            </div>
            <div class="form-group">
              <label for="unitKerja_id">Unit Kerja</label>
                <select v-model="pegawai.unitKerja_id" class="form-control" id="unitKerja_id">
                  <option value="" disabled>Pilih Unit Kerja</option>
                  <option v-for="unit in UnitKerjaId" :key="unit.id" :value="unit.id">{{ unit.nama }}</option>
                </select>
              <span class="text-danger">{{ errorList.unitKerja_id }}</span>
            </div>
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script setup>
definePageMeta({
  middleware: ['redirect-login'],
  layout: 'default'
})
</script>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: "EditPegawai",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      pegawaiId: '',
      data_pegawai: {
        nama: '',
        jabatan_id: '',
        pangkat: '',
        nip: '',
        alamat: '',
        unitKerja_id: '',
        dinas: '',
      },
      isLoading: false,
      isLoadingTitle: "Loading",
      errorList: {
        nama: '',      
        jabatan_id: '',  
        pangkat: '',   
        nip: '',       
        alamat: '',    
        unitKerja_id: '', 
      },
      jabatanId: [],
      UnitKerjaId: [],
      pangkatOptions: ['Juru Muda (I/a)','Juru Muda Tingkat 1 (I/b)', 'Juru (I/c)', 'Juru Tingkat 1 (I/d)', 
                      'Pengatur Muda (II/a)', 'Pengatur Muda Tingkat 1 (II/b)', 'Pengatur (II/c)', 'Pengatur Tingkat 1 (II/d)',
                      'Penata Muda (III/a)', 'Penata Muda Tingkat 1 (III/b)', 'Penata (III/c)', 'Penata Tingkat 1 (III/d)',
                      'Pembina (IV/a)', 'Pembina Tingkat 1(IV/b)', 'Pembina Utama Muda (IV/c)', 'Pembina Utama Madya (IV/d)', 'Pembina Utama (IV/e)']
    }
  },
  created() {
    this.getJabatan();
    this.getUnitKerja();
  },
  mounted() {
    this.pegawaiId = this.$route.params.id
    // alert(this.pegawaiId);
    this.getPegawai(this.pegawaiId);
  },
  methods: {
    getPegawai(pegawaiId) {
      const accessToken = localStorage.getItem('token');
      axios.get(`http://127.0.0.1:8000/api/pegawai/${pegawaiId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      })
    },
    async edit_data(pegawaiId) {
      this.errorList = {
        nama: '',
        jabatan_id: '',
        pangkat: '',
        nip: '',
        alamat: '',
        unitKerja_id: '',
      };
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan mengubah data?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const data = this.data_pegawai[0];
            console.log(data);
            const requestData = {
              nama: data.nama,
              jabatan_id: data.jabatan_id,
              pangkat: data.pangkat,
              nip: data.nip,
              alamat: data.alamat,
              unitKerja_id: data.unitKerja_id,
            }
            console.log(requestData);


            try {
              const accessToken = localStorage.getItem('token');
              const response = await axios.put(`http://127.0.0.1:8000/api/pegawai/${pegawaiId}`, requestData, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              console.log(response.data);
              // alert(response.data.message);

              Swal.fire(
                'Berhasil!',
                'Data Anda berhasil diubah.',
                'success'
              );
              this.backDataPegawai();

            } catch (error) {
              console.error(error);
             if (!requestData.nama) {
                this.errorList.nama = 'Harus diisi.';
              }
              if (!requestData.jabatan_id) {
                this.errorList.jabatan_id = 'Harus diisi.';
              }
              if (!requestData.pangkat) {
                this.errorList.pangkat = 'Harus diisi.';
              }
              if (!requestData.nip) {
                this.errorList.nip = 'Harus diisi.';
              }
              if (!requestData.alamat) {
                this.errorList.alamat = 'Harus diisi.';
              }
              if (!requestData.unitKerja_id) {
                this.errorList.unitKerja_id = 'Harus diisi.';
              }
            }
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
}
</script>