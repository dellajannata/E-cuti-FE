<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Unit Kerja</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Cari" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <NuxtLink class="btn btn-primary" to="/create_unit_kerja"><i class="fa fa-plus"></i></NuxtLink>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in data_unit_kerja" :key="index">
              <td>{{ calculateRowNumber(index) }}</td>
              <td>{{ unit.nama }}</td>
              <td class="btn-action">
                <NuxtLink :to="`../editUnitKerja_${unit.id}`" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i></NuxtLink>
                <button @click="deleteUnitKerja(unit.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
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

export default {
  data() {
    return {
      data_unit_kerja: [],
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 5,
    }
  },
  created() {
    // Get the page query parameter from the route
    const page = parseInt(this.$route.query.page) || 1;
    this.currentPage = page;
    // fetching data
    this.getDataUnitKerja();
  },
  watch: {
    $route(to) {
      // Update the current page when the route changes
      const page = parseInt(to.query.page) || 1;
      this.currentPage = page;
      this.getDataUnitKerja();
    }
  },
  methods: {
    getDataUnitKerja() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/unit_kerja', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            page: this.currentPage
          }
      }).then(res => {
        console.log(res.data.data);
        this.data_unit_kerja = res.data.data;
        this.totalPages = res.data.pagination.last_page;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    search() {
      if (this.searchQuery !== "") {
        const accessToken = localStorage.getItem('token'); 
        axios.get(`http://127.0.0.1:8000/api/unit_kerja/search/${this.searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            page: this.currentPage
          }
        })
        .then(res => {
          console.log(res.data.data);

          if (res.data.data !== null) {
            // Cek apakah ada hasil pencarian
            if (res.data.data.length === 0) {
              // Jika tidak ada hasil yang cocok, set data_unit_kerja sebagai array kosong
              this.data_unit_kerja = [];
            } else {
              this.data_unit_kerja = res.data.data;
            }
            this.totalPages = res.data.pagination.last_page;
          } else {
            // Respons data null, set data_unit_kerja sebagai array kosong
            this.data_unit_kerja = [];
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      } else {
        this.getDataUnitKerja();
      }
    },

    async deleteUnitKerja(unitId) {
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
            await axios.delete(`http://127.0.0.1:8000/api/unit_kerja/${unitId}`, {
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
              this.getDataUnitKerja();
            })
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          'Gagal!',
          'Unit kerja gagal dihapus karena pegawai memiliki unit kerja ini',
          'warning',
          this.getDataUnitKerja()
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