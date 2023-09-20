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
              <label for="jabatan">Jabatan</label>
              <input type="text" v-model="pegawai.jabatan" class="form-control" id="jabatan" placeholder="Masukkan Jabatan Anda">
              <span class="text-danger">{{ errorList.jabatan }}</span> 
            </div>
            <div class="form-group">
              <label for="pangkat">Pangkat</label>
              <input type="text" v-model="pegawai.pangkat" class="form-control" id="pangkat" placeholder="Masukkan Pangkat Anda">
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
              <label for="unit_kerja">Unit Kerja</label>
              <input type="text" v-model="pegawai.unit_kerja" class="form-control" id="unit_kerja" placeholder="Masukkan Unit Kerja Anda">
              <span class="text-danger">{{ errorList.unit_kerja }}</span>
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
        jabatan: '',
        pangkat: '',
        nip: '',
        alamat: '',
        unit_kerja: '',
        dinas: '',
      },
      isLoading: false,
      isLoadingTitle: "Loading",
      errorList: {
        nama: '',      
        jabatan: '',  
        pangkat: '',   
        nip: '',       
        alamat: '',    
        unit_kerja: '', 
      }
    }
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
        jabatan: '',
        pangkat: '',
        nip: '',
        alamat: '',
        unit_kerja: '',
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
              jabatan: data.jabatan,
              pangkat: data.pangkat,
              nip: data.nip,
              alamat: data.alamat,
              unit_kerja: data.unit_kerja,
              dinas: data.dinas,
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
              if (!requestData.jabatan) {
                this.errorList.jabatan = 'Harus diisi.';
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
              if (!requestData.unit_kerja) {
                this.errorList.unit_kerja = 'Harus diisi.';
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
    }
  }
}
</script>