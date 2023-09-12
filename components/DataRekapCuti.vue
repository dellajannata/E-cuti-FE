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
              <th>Total Pegajuan Cuti</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cutiGroup, index) in sortedCutiGroups" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cutiGroup[0].user_id) }}</td>
              <td><template v-if="getUnitKerja(cutiGroup[0].user_id).split(' ').length > 3">
                  {{ getUnitKerja(cutiGroup[0].user_id).split(' ').slice(0, 3).join(' ') }}<br><br>
                  {{ getUnitKerja(cutiGroup[0].user_id).split(' ').slice(3).join(' ') }}
                </template>
                <template v-else>
                  {{ getUnitKerja(cutiGroup[0].user_id) }}
                </template></td>
              <td>{{ getTotalCuti(cutiGroup[0].user_id) }}</td>
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
      data_cuti: {},
      data_pegawai: [],
      data_pengguna: [],
      searchQuery: ""
    }
  },
  mounted() {
    this.getDataPengajuanCuti();
    this.getDataPegawai();
    this.getDataPengguna();
  },
  computed: {
    sortedCutiGroups() {
      return Object.values(this.data_cuti).sort((a, b) => b.length - a.length);
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
            if (res.data.data) {
              const cutiByUserId = {};
              res.data.data.forEach(cuti => {
                if (cuti.status !== "Selesai") {
                  const userId = cuti.user_id || 'Unknown'; // Mengatasi cuti yang tidak memiliki user_id
                  if (!cutiByUserId[userId]) {
                    cutiByUserId[userId] = [];
                  }
                  cutiByUserId[userId].push(cuti);
                }
              });
              this.data_cuti = cutiByUserId;
            } else {
              this.data_cuti = {};
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
        }
      }).then(res => {
        console.log(res.data.data);
        
        // Menggunakan objek untuk mengelompokkan data berdasarkan user_id
        const cutiByUserId = {};
        res.data.data.forEach(cuti => {
          if (cuti.status !== "Selesai") {
            if (!cutiByUserId[cuti.user_id]) {
              cutiByUserId[cuti.user_id] = [];
            }
            cutiByUserId[cuti.user_id].push(cuti);
          }
        });

        this.data_cuti = cutiByUserId;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPegawai() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/pegawai', {
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
    getDataPengguna() {
      const accessToken = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => {
          console.log(res.data.data);
          this.data_pengguna = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
    },
    getIdPegawai(userId) {
      const user = this.data_pengguna.find(pengguna => pengguna.id === userId);
      return user ? user.pegawai_id : 'Id Pegawai Tidak Tersedia';
    },
    getNamaPegawai(userId) {
      const idPengguna = this.getIdPegawai(userId);
      const namaPegawai = this.data_pegawai.find(pegawai => pegawai.id === idPengguna);
      return namaPegawai ? namaPegawai.nama : 'Nama Pegawai Tidak Tersedia';
    },
    getUnitKerja(userId) {
      const idPegawai = this.getIdPegawai(userId);
      const namaPegawai = this.data_pegawai.find(pegawai => pegawai.id === idPegawai);
      return namaPegawai ? namaPegawai.unit_kerja : 'Unit Kerja Pegawai Tidak Tersedia';
    },
    getTotalCuti(userId) {
      if (this.data_cuti[userId] && this.data_cuti[userId].length > 0) {
        const totalCutiSelesai = this.data_cuti[userId].filter(cuti => cuti.status === "Selesai").length;
        return totalCutiSelesai;
      } else {
        return 0;
      }
    }
  }
}
</script>