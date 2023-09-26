<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Rekapan Cuti Pegawai</h4>
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
              <th>Total Pengajuan Cuti</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in filteredCuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja.nama }}</td>
              <td>{{ cuti.totalCuti }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button  @click="exportToExcel" class="btn btn-success btn-sm">Export to Excel</button>
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
      data_pegawai: [],
      searchQuery: ""
    }
  },
  mounted() {
    this.getDataPengajuanCuti();
    this.getDataPegawai();
  },
  computed: {
    filteredCuti() {
      const uniqueCuti = {};
      if (this.data_cuti.length) {
        this.data_cuti.forEach(item => {
          if (item.status === 'Selesai') {
            uniqueCuti[item.user_id] = uniqueCuti[item.user_id] || { totalCuti: 0, pegawai: item.pegawai };
            uniqueCuti[item.user_id].totalCuti++;
          }
        });
        return Object.values(uniqueCuti);
      } else {
        return [];
      }
    },
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        const accessToken = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti_all/search/${this.searchQuery}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
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
                // Jika ada hasil pencarian, filter data berdasarkan status yang "Selesai"
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
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_cuti = res.data.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPegawai() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/pegawai_all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
        console.error('Error fetching pegawai data:', error);
      });
    },
    exportToExcel() {
      // Ganti dengan URL yang benar untuk ekspor Excel di backend Anda
      const exportUrl = 'http://127.0.0.1:8000/api/cuti/export';

      // Mengambil token dari localStorage jika diperlukan
      const accessToken = localStorage.getItem('token');

      // Konfigurasi header untuk permintaan HTTP GET
      const config = {
        responseType: 'blob', // Respons berupa blob (file)
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };

      // Buat permintaan HTTP GET untuk mengunduh file Excel
      axios.get(exportUrl, config)
        .then(response => {
          // Membuat objek URL dari data blob
          const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

          // Membuat elemen <a> untuk mengeksekusi unduhan
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'rekap_cuti.xlsx';

          // Mengeksekusi unduhan
          link.click();

          // Membersihkan objek URL
          window.URL.revokeObjectURL(blobUrl);

          // Menampilkan SweetAlert2 sebagai umpan balik
          Swal.fire({
            title: 'Export Successful',
            text: 'The Excel file has been downloaded successfully.',
            icon: 'success',
          });
        })
        .catch(error => {
          console.error('Error exporting to Excel:', error);
          
          // Menampilkan SweetAlert2 sebagai umpan balik dalam kasus error
          Swal.fire({
            title: 'Export Failed',
            text: 'An error occurred while exporting to Excel.',
            icon: 'error',
          });
        });
    }

  }
}
</script>
