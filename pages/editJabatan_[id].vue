<template>
  <div class="col-md-9 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="card-edit-pegawai">
          <h4 class="card-title">Edit Data Jabatan</h4>
          <NuxtLink class="btn btn-primary" to="/data_jabatan">Kembali</NuxtLink>
        </div>
        <div v-for="(jabatan, index) in data_jabatan" :key="index">
          <form class="forms-sample" @submit.prevent="edit_data(jabatan.id)">
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" v-model="jabatan.nama" class="form-control" id="nama" placeholder="Masukkan Jabatan">
              <span class="text-danger">{{ errorList.nama }}</span> 
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
  name: "EditJabatan",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      jabatanId: '',
      data_jabatan: {
        nama: '',
      },
      isLoading: false,
      isLoadingTitle: "Loading",
      errorList: {
        nama: '',    
      },
    }
  },
  mounted() {
    this.jabatanId = this.$route.params.id
    // alert(this.pegawaiId);
    this.getJabatan(this.jabatanId);
  },
  methods: {
    getJabatan(jabatanId) {
      const accessToken = localStorage.getItem('token');
      axios.get(`http://127.0.0.1:8000/api/jabatan/${jabatanId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_jabatan = res.data.data;
      })
    },
    async edit_data(jabatanId) {
      this.errorList = {
        nama: '',
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
            const data = this.data_jabatan[0];
            console.log(data);
            const requestData = {
              nama: data.nama,
            }
            console.log(requestData);


            try {
              const accessToken = localStorage.getItem('token');
              const response = await axios.put(`http://127.0.0.1:8000/api/jabatan/${jabatanId}`, requestData, {
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
              this.backDataJabatan();

            } catch (error) {
              console.error(error);
              if (!requestData.nama) {
                this.errorList.nama = 'Harus diisi.';
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    backDataJabatan() {
      this.$router.push('/data_jabatan');
    },
  }
}
</script>