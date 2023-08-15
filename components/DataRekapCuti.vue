<template>
  <div class="card">
    <h4 class="card-title">Data Pegajuan Cuti</h4>
    <div class="card-body">
      <div class="card-pegawai">
        <div class="search">
          <input class="search__input" type="text" placeholder="Search" v-model="searchQuery" @input="search">
        </div>
        <a class="btn btn-primary" href="/create_pengajuan_cuti">Tambah</a>
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
              <th>Status</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cuti.pegawai_id) }}</td>
              <td>{{ getUnitKerja(cuti.pegawai_id) }}</td>
              <td>{{ cuti.tgl_awal }}</td>
              <td>{{ cuti.tgl_akhir }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>{{ cuti.status }}</td>
              <td v-if="cuti.status == 'Selesai'">
                <button @click="$event => cetakPDF($event, cuti.id)" class="btn btn-success btn-sm">Cetak PDF</button>
              </td>
              <td v-else>Proses ACC</td>
              <td>
                <NuxtLink :to="`../editCuti_${cuti.id}`" class="btn btn-warning btn-sm">Edit</NuxtLink>
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
      // const token = localStorage.getItem('access_token');
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti', {
        // headers: {
        //   'Authorization': 'Bearer ${token}'
        // }
      }).then(res => {
        console.log(res.data.data);
        this.data_cuti = res.data.data.filter(cuti => cuti.status === "Selesai");
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai', {
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
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
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`);
            Swal.fire(
              'Berhasil!',
              'Data Anda berhasil dihapus.',
              'success',
              this.getDataPengajuanCuti()
            );
          }
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