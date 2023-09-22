<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegajuan Cuti Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <NuxtLink class="btn btn-primary" to="/create_pengajuan_cuti_pegawai"><i class="fa fa-plus"></i></NuxtLink>
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
              <th>Nama Penyetuju</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in filteredCuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja.nama }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_awal) }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_akhir) }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>{{ waktu_pengajuan(cuti.created_at) }}</td>
              <td>{{ cuti.status }}</td>
              <td>{{ cuti.user_penyetuju}}</td>
              <td>
                <template v-if="cuti.status == 'Selesai'">
                  <button @click="$event => cetakPDF($event, cuti.id)" class="btn btn-success btn-sm">Cetak PDF</button>
                </template>
                <template v-else-if="cuti.status == 'Belum' | cuti.status.includes('ACC')">
                  Proses ACC
                </template>
                <template v-else>
                  Ditolak
                </template>
              </td>
              <td class="btn-action">
                <template v-if="cuti.status != 'Selesai' && cuti.status != 'Ditolak Kabid' && cuti.status != 'Ditolak Kasubag Umum' && cuti.status != 'Ditolak Sekretaris' && cuti.status != 'Ditolak Kadis'">
                  <NuxtLink :to="`../editCuti_${cuti.id}`" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i></NuxtLink>
                </template>
                <button @click="deleteCuti(cuti.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
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
      unit_kerja:[],
      searchQuery: ""
    }
  },
  computed: {
    filteredCuti() {
      const idUser = this.getIdUserYangLogin(); // Mengambil id pengguna dari localStorage 

      // Filter data cuti berdasarkan id pengguna yang login
      return this.data_cuti.filter(cuti => cuti.user_id === idUser);
    },
  },
  mounted() {
    this.getDataPengajuanCuti();
    this.getUnitKerja();
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        const accessToken = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`, {
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
                // Jika ada hasil pencarian
                this.data_cuti = res.data.data;
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
    getIdUserYangLogin() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? userData.id : ''; // Mengambil id pengguna dari objek pengguna 
    },
    getDataPengajuanCuti() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getUnitKerja() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/unit_kerja', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.unit_kerja = res.data.data;
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
    async deleteCuti(cutiId) {
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
          const accessToken = localStorage.getItem('token');
          await axios.delete(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          Swal.fire(
            'Berhasil!',
            'Data Anda berhasil dihapus.',
            'success'
          );
          this.getDataPengajuanCuti();
        }
      } catch (error) {
        console.error(error);
      }
    },
    editCuti(cutiId) {
      axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`).then(res => {
        this.getDataPengajuanCuti();
      });
    },

    cetakPDF(event, cutiId) {
      const accessToken = localStorage.getItem('token');
      axios.get(`http://127.0.0.1:8000/api/cetak-pdf/${cutiId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        responseType: 'blob'
      }).then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = 'surat-permohonan-cuti.pdf'; 
        link.click();

        window.URL.revokeObjectURL(url);
      }).catch(error => {
        console.error('Error fetching PDF:', error);
      });

    }
  }
}
</script>