<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegajuan Cuti Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <router-link class="btn btn-primary" :to="'/create_pengajuan_cuti'">Tambah</router-link>
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
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cuti.pegawai_id) }}</td>
              <td>{{ formatUnitKerja(getUnitKerja(cuti.pegawai_id)) }}</td>
              <td>{{ cuti.tgl_awal }}</td>
              <td>{{ cuti.tgl_akhir }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>{{ formatTimestamp24Hour(cuti.created_at) }}</td>
              <td>{{ cuti.status }}</td>
              <td>
                <template v-if="cuti.status == 'Selesai'">
                  <button @click="$event => cetakPDF($event, cuti.id)" class="btn btn-success btn-sm">Cetak PDF</button>
                </template>
                <template v-else>Proses ACC</template>
              </td>
              <td class="btn-action">
                <router-link :to="`../editCuti_${cuti.id}`" class="btn btn-warning btn-sm">Edit</router-link>
                <button @click="deleteCuti(cuti.id)" class="btn btn-danger btn-sm">Hapus</button>
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
      data_pegawai: [],
      searchQuery: ""
    }
  },
  mounted() {
    this.getDataPengajuanCuti();
    this.getDataPegawai();
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`)
          .then(res => {
            console.log(res.data.data);
            this.data_cuti = res.data.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        this.getDataPengajuanCuti();
      }
    },
    getDataPengajuanCuti() {
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti')
        .then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai')
        .then(res => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
    },
    getNamaPegawai(pegawaiId) {
      const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
      return pegawai ? pegawai.nama : 'Nama Pegawai Tidak Tersedia';
    },
    getUnitKerja(pegawaiId) {
      const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
      return pegawai ? pegawai.unit_kerja : 'Unit Kerja Tidak Tersedia';
    },
    formatUnitKerja(unitKerja) {
      if (unitKerja.split(' ').length > 3) {
        const parts = unitKerja.split(' ');
        return `${parts.slice(0, 3).join(' ')}<br><br>${parts.slice(3).join(' ')}`;
      }
      return unitKerja;
    },
    formatTimestamp24Hour(timestamp) {
      const jakartaTimeZone = 'Asia/Jakarta';
      const created_at = new Date(timestamp);
      const jakartaTime = new Date(created_at.toLocaleString("en-US", { timeZone: jakartaTimeZone }));

      // Opsi untuk menghilangkan zona waktu (GMT +7)
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // Menggunakan format 24 jam
      };

      // Membuat tampilan waktu tanpa zona waktu
      const formattedTime = jakartaTime.toLocaleString("en-US", options).replace(/,/, '');

      return formattedTime;
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
          const accessToken = localStorage.getItem('access_token');
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
      axios.get(`http://127.0.0.1:8000/api/cetak-pdf/${cutiId}`, {
        responseType: 'blob'
      }).then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
      }).catch(error => {
        console.error('Error fetching PDF:', error);
      });
    }
  }
}
</script>