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
            <tr v-for="(cuti, index) in uniqueCuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja }}</td>
              <td>{{ cuti.totalCuti }}</td>
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
  computed: {
    getUserUnit() {
      const kabidId = JSON.parse(localStorage.getItem('user')).pegawai_id;
      if (this.data_pegawai.length) {
        const filtering = this.data_pegawai.find(item => item.id === kabidId);
        return filtering.unit_kerja;
      }
    },
    uniqueCuti() {
      const uniqueCuti = {};
      if (this.data_cuti.length && this.getUserUnit) {
        this.data_cuti.forEach(item => {
          if (item.pegawai.unit_kerja === this.getUserUnit && item.status === 'Selesai') {
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
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then(res => {
            console.log(res.data.data);
            this.data_cuti = res.data.data.filter(cuti => cuti.status === "Selesai");
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
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kabid', {
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
  }
}
</script>
