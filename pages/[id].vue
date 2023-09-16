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
              </div>
              <div class="form-group">
                <label for="jabatan">Jabatan</label>
                <input type="text" v-model="pegawai.jabatan" class="form-control" id="jabatan"
                  placeholder="Masukkan Jabatan Anda">
              </div>
              <div class="form-group">
                <label for="pangkat">Pangkat</label>
                <input type="text" v-model="pegawai.pangkat" class="form-control" id="pangkat"
                  placeholder="Masukkan Pangkat Anda">
              </div>
              <div class="form-group">
                <label for="nip">NIP</label>
                <input type="text" v-model="pegawai.nip" class="form-control" id="nip" placeholder="Masukkan NIP Anda">
              </div>
              <div class="form-group">
                <label for="alamat">Alamat</label>
                <input type="text" v-model="pegawai.alamat" class="form-control" id="alamat"
                  placeholder="Masukkan Alamat Anda">
              </div>
              <div class="form-group">
                <label for="unit_kerja">Unit Kreja</label>
                <input type="text" v-model="pegawai.unit_kerja" class="form-control" id="unit_kerja"
                  placeholder="Masukkan Unit Kerja Anda">
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
        isLoadingTitle: "Loading"
      }
    },
    mounted() {
      this.pegawaiId = this.$route.params.id
      // alert(this.pegawaiId);
      this.getPegawai(this.pegawaiId);
      // const token = localStorage.getItem('access_token');
      // if (!token) {
      //     //MAKA REDIRECT KE HALAMAN LOGIN
      //     this.$router.push('/login')
      // }
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
                this.backDataPegawai();
  
              } catch (error) {
                console.error(error);
                alert("An error occurred while updating data.");
                this.isLoading = false;
                this.isLoadingTitle = "Loading";
              }
              Swal.fire(
                'Berhasil!',
                'Data Anda berhasil diubah.',
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
  }
  </script>