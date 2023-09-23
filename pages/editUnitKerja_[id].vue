<template>
  <div class="col-md-9 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="card-edit-pegawai">
          <h4 class="card-title">Edit Data Unit Kerja</h4>
          <NuxtLink class="btn btn-primary" to="/data_unit_kerja">Kembali</NuxtLink>
        </div>
        <div v-for="(unit, index) in data_unit_kerja" :key="index">
          <form class="forms-sample" @submit.prevent="edit_data(unit.id)">
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" v-model="unit.nama" class="form-control" id="nama" placeholder="Masukkan Unit Kerja">
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
  name: "EditUnitKerja",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      unitKerjaId: '',
      data_unit_kerja: {
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
    this.unitKerjaId = this.$route.params.id
    // alert(this.pegawaiId);
    this.getUnitKerja(this.unitKerjaId);
  },
  methods: {
    getUnitKerja(unitKerjaId) {
      const accessToken = localStorage.getItem('token');
      axios.get(`http://127.0.0.1:8000/api/unit_kerja/${unitKerjaId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_unit_kerja = res.data.data;
      })
    },
    async edit_data(unitKerjaId) {
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
            const data = this.data_unit_kerja[0];
            console.log(data);
            const requestData = {
              nama: data.nama,
            }
            console.log(requestData);


            try {
              const accessToken = localStorage.getItem('token');
              const response = await axios.put(`http://127.0.0.1:8000/api/unit_kerja/${unitKerjaId}`, requestData, {
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
              this.backDataUnitKerja();

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
    backDataUnitKerja() {
      this.$router.push('/data_unit_kerja');
    },
  }
}
</script>