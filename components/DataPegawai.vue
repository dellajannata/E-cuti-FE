<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <NuxtLink class="btn btn-primary" href="/create_pegawai"><i class="fa fa-plus"></i></NuxtLink>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Pangkat</th>
              <th>NIP</th>
              <th>Alamat</th>
              <th>Unit kerja</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pegawai, index) in data_pegawai" :key="index">
              <td>{{ calculateRowNumber(index) }}</td>
              <td>{{ pegawai.nama }}</td>
              <td>{{ pegawai.jabatan }}</td>
              <td>{{ pegawai.pangkat }}</td>
              <td>{{ pegawai.nip }}</td>
              <td>{{ pegawai.alamat }}</td>
              <td><template v-if="pegawai.unit_kerja.length > 3">
                  {{ pegawai.unit_kerja.split(' ').slice(0, 3).join('  ') }}
                  <br><br>
                  {{ pegawai.unit_kerja.split(' ').slice(3).join('  ') }}
                </template>
                <template v-else>
                  {{ pegawai.unit_kerja }}
                </template>
              </td>
              <td class="btn-action">
                <NuxtLink :to="`../${pegawai.id}`" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i></NuxtLink>
                <button @click="deletePegawai(pegawai.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination justify-content-end mb-2">
        <div class="btn-wrapper d-flex">
          <div @click="prevPage" class="btn" :disabled="currentPage === 1"><i class="mdi mdi-chevron-double-left"></i>
          </div>
          <div v-for="i in totalPages" :key="i" class="btn" @click="goToPage(i)" :class="{ active: currentPage === i }">
            {{ i }}
          </div>
          <div @click="nextPage" class="btn" :disabled="currentPage === totalPages"><i
              class="mdi mdi-chevron-double-right"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
// const API_BASE = 'http://127.0.0.1:8000/api';

export default {
  data() {
    return {
      data_pegawai: [],
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
    }
  },
  created() {
    // Get the page query parameter from the route
    const page = parseInt(this.$route.query.page) || 1;
    this.currentPage = page;
    // fetching data
    this.getDataPegawai();
  },
  watch: {
    $route(to) {
      // Update the current page when the route changes
      const page = parseInt(to.query.page) || 1;
      this.currentPage = page;
      this.getDataPegawai();
    }
  },
  methods: {
    getDataPegawai() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/pegawai', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            page: this.currentPage
          }
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
        this.totalPages = res.data.pagination.last_page;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    search() {
      if (this.searchQuery !== "") {
        const accessToken = localStorage.getItem('token'); 
        axios.get(`http://127.0.0.1:8000/api/pegawai/search/${this.searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(res => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      } else {
        this.getDataPegawai();
      }
    },

    async deletePegawai(pegawaiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menghapus data?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus data ini!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/pegawai/${pegawaiId}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .then(() => {
              Swal.fire(
                'Berhasil!',
                'Data Anda berhasil dihapus.',
                'success'
              );
              this.getDataPegawai();
            })
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Gagal!',
          'Data Anda gagal dihapus karena telah melakukan pengajuan cuti.',
          'warning',
          this.getDataPegawai()
        );
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: this.currentPage + 1 } })
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: this.currentPage - 1 } })
      }
    },
    goToPage(num) {
      if (this.currentPage !== num) {
        this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: num } })
      }
    },
    calculateRowNumber(index) {
      // Calculate the row number based on the current page and index
      return (this.currentPage - 1) * this.itemsPerPage + index + 1;
    }
  }
}
</script>

<style>
.card {
  height: auto !important;
}
.pagination .btn-wrapper {
  border: 1px solid #DEE2E6;
  border-radius: 8px;
  overflow: hidden;
}
.pagination .btn {
  min-width: 40px;
  border-radius: 0;
  color: #B1141D;
}
.pagination .btn:not(:last-child) {
  border-right: 1px solid #DEE2E6;
}
.pagination .btn.active {
  background-color: #B1141D;
  color: #fff;
}
.pagination .btn[disabled=true] {
  background-color: #E9ECEF;
  color: gray;
  cursor: auto;
}
</style>