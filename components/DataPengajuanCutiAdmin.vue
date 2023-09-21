<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegajuan Cuti Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Unit Kerja</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Akhir</th>
              <th>Alasan</th>
              <th>Waktu Pengajuan</th>
              <th>Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ calculateRowNumber(index) }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_awal) }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_akhir) }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>{{ waktu_pengajuan(cuti.created_at) }}</td>
              <td>{{ cuti.status }}</td>
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
      data_cuti: [],
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 2,
    }
  },
  created() {
    // Get the page query parameter from the route
    const page = parseInt(this.$route.query.page) || 1;
    this.currentPage = page;
    // fetching data
    this.getDataPengajuanCuti();
  },
  watch: {
    $route(to) {
      // Update the current page when the route changes
      const page = parseInt(to.query.page) || 1;
      this.currentPage = page;
      this.getDataPengajuanCuti();
    }
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        const accessToken = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`, {
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
                // Jika tidak ada hasil yang cocok, set data_cuti sebagai array kosong
                this.data_cuti = [];
              } else {
                // Jika ada hasil pencarian, filter data berdasarkan status yang bukan "Selesai"
                this.data_cuti = res.data.data.filter(cuti => cuti.status === 'Selesai');
              }
              this.totalPages = res.data.pagination.last_page;
            } else {
              // Respons data null, set data_cuti sebagai array kosong
              this.data_cuti = [];
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        this.getDataPengajuanCuti();
      }
    },
    getDataPengajuanCuti() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          page: this.currentPage
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
          this.totalPages = res.data.pagination.last_page;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    tgl_pengajuan(timestamp) {
      const jakartaTimeZone = 'Asia/Jakarta';
      const created_at = new Date(timestamp);
      const jakartaTime = new Date(created_at.toLocaleString("en-US", { timeZone: jakartaTimeZone }));

      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      const formattedTime = jakartaTime.toLocaleString("en-US", options).replace(/,/, '');

      const [month, day, year] = formattedTime.split('/');

      // Menggabungkan kembali dalam format yang diinginkan
      const newFormattedTime = `${day}-${month}-${year}`;

      return newFormattedTime;
    },
    waktu_pengajuan(timestamp) {
      const jakartaTimeZone = 'Asia/Jakarta';
      const created_at = new Date(timestamp);
      const jakartaTime = new Date(created_at.toLocaleString("en-US", { timeZone: jakartaTimeZone }));

      // Opsi untuk menghilangkan zona waktu (GMT +7)
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // Menggunakan format 24 jam
      };
      const formattedTime = jakartaTime.toLocaleString("en-US", options).replace(/,/, '');

      const [month, day, year] = formattedTime.split('/');

      // Menggabungkan kembali dalam format yang diinginkan
      const newFormattedTime = `${day}-${month}-${year}`;

      return newFormattedTime;
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