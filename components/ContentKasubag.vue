<template>
  <div class="dashboard-content">
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
      <div class="card-2">
        <div class="card-body">
          <h4 class="card-title">Pengajuan Cuti Saya</h4>
          <div class="d-inline-block">
            <h2>{{ data_cuti.length }}</h2>
            <NuxtLink href="/data_pengajuan_cuti_kasubag" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
          </div>
          <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
        </div>
      </div>
    </div>

    <!-- Rekap Cuti Kasubag-->
    <div class="col-lg-3 col-sm-6">
      <div class="card-2">
        <div class="card-body">
          <h4 class="card-title">Rekap Cuti Saya</h4>
          <div class="d-inline-block">
            <h2>{{ rekap_cuti_kasubag.length }}</h2>
            <NuxtLink to="/rekap_cuti_acc_kasubag" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
          </div>
          <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
        </div>
      </div>
    </div>

    <!-- Persetujuan Cuti -->
    <div class="col-lg-3 col-sm-6">
      <div class="card-2">
        <div class="card-body">
          <h4 class="card-title">Persetujuan Cuti</h4>
          <div class="d-inline-block">
            <h2>{{ cuti_kasubag.length }}</h2>
            <NuxtLink to="/pengajuan_cuti_acc_kasubag_umum" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
          </div>
          <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
        </div>
      </div>
    </div>
  
      <!-- Rekap Cuti Seluruh Pegawai Sesuai Dinas-->
      <div class="col-lg-3 col-sm-6">
        <div class="card-2">
          <div class="card-body">
            <h4 class="card-title">Rekap Cuti</h4>
            <div class="d-inline-block">
              <h2>{{ getUniqueUserIds(rekap_cuti).length }}</h2>
              <NuxtLink to="/rekap_cuti_acc_kasubag" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
            </div>
            <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
          </div>
        </div>
      </div>
      <!-- User -->
      <!-- Halo, {{ userLoggedin?.name }} -->
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        data_cuti: [],
        rekap_cuti_kasubag: [],
        cuti_kasubag: [],
        rekap_cuti: [],
        data_pegawai: [],
        userLoggedin: null,
      }
    },
    created() {
      this.getUserData();
    },
    methods: {
      getIdUserYangLogin() {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.id : ''; // Mengambil id pengguna dari objek pengguna 
      },
      getUserData() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.userLoggedin = user;
        this.getDataPegawai();
      },
      getDataPengajuanCuti() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
          console.log(res.data.data);
          const idUser = this.getIdUserYangLogin();
          // Filter data cuti sesuai dengan nama pengguna yang login
          this.data_cuti = res.data.data.filter(data_cuti => {
            return data_cuti.user_id === idUser &
            data_cuti.status !== "Selesai" &
            data_cuti.status !== "Ditolak Sekretaris" &
            data_cuti.status !== "Ditolak Kadis";
        });
          // Filter data rekap cuti sesuai dengan nama pengguna yang login
          this.rekap_cuti_kasubag = res.data.data.filter(data_cuti => {
            return data_cuti.user_id === idUser &
            data_cuti.status === "Selesai";
          });
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      getDataCutiKasubag() {
        const accessToken = localStorage.getItem('token');
        const unitKerja = this.getUnitKerjaPegawai();

        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kasubag', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.cuti_kasubag = res.data.data.filter(
            (cuti_kasubag) => cuti_kasubag.pegawai.unit_kerja.nama === unitKerja && cuti_kasubag.status === 'ACC Kabid'
          );
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      getDataRekapCuti() {
        const accessToken = localStorage.getItem('token');
        const unitKerja = this.getUnitKerjaPegawai();

        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.rekap_cuti = res.data.data.filter(
            (rekap_cuti) => rekap_cuti.pegawai.unit_kerja.nama === unitKerja && rekap_cuti.status === 'Selesai'
          );
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      getDataPegawai() {
        const accessToken = localStorage.getItem('token');
        axios
          .get('http://127.0.0.1:8000/api/pegawai_all', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            this.data_pegawai = res.data.data;
            this.getDataCutiKasubag(); 
            this.getDataRekapCuti(); 
            this.getDataPengajuanCuti(); 
          })
          .catch((error) => {
            console.error('Error fetching pegawai data:', error);
          });
      },
      getPegawaiId() {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.pegawai_id : ''; // Mengambil id user dari objek pengguna
      },
      getUnitKerjaPegawai() {
        const user = this.getPegawaiId();
        const pegawai = this.data_pegawai.find((pegawai) => pegawai.id === user);

        if (pegawai) {
          console.log('Unit Kerja Pegawai:', pegawai.unit_kerja.nama);
          return pegawai.unit_kerja.nama;
        } else {
          console.log('Unit Kerja Pegawai Tidak Tersedia');
          return 'Unit Kerja Pegawai Tidak Tersedia';
        }
      },
      getUniqueUserIds(cutiData) {
        // Menggunakan Set untuk mendapatkan nilai unik dari user_id
        const uniqueUserIds = new Set(cutiData.map(cuti => cuti.user_id));
        return [...uniqueUserIds];
      }
    }
  };
  </script>