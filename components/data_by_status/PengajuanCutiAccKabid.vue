<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Persetujuan Cuti Kabid</h4>
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
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in filterByUnitKerja" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja.nama }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_awal) }}</td>
              <td>{{ tgl_pengajuan(cuti.tgl_akhir) }}</td>
              <td>{{ cuti.alasan }}</td>
              <td v-if="cuti.status == 'ACC Kabid'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'ACC Kasubag Umum'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'ACC Sekretaris'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'ACC Kadis'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'Selesai'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'Ditolak Kabid'">
                Ditolak
              </td>
              <td v-else-if="cuti.status == 'Ditolak Kasubag Umum'">
                Ditolak
              </td>
              <td v-else-if="cuti.status == 'Ditolak Sekretaris'">
                Ditolak
              </td>
              <td v-else-if="cuti.status == 'Ditolak Kadis'">
                Ditolak
              </td>
              <td v-else class="btn-action">
                <button @click="validasi(cuti.id)" class="btn btn-warning btn-sm">ACC</button>
                <button @click="validasiTolak(cuti.id)" class="btn btn-danger btn-sm">Tolak</button>
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
  computed: {
    getUserUnit() {
      const dinasId = JSON.parse(localStorage.getItem('user')).pegawai_id;
      if (this.data_pegawai.length) {
        const filtering = JSON.parse(JSON.stringify(this.data_pegawai.find(item => item.id === dinasId)))
        console.log(filtering.unitKerja_id)
        return filtering.unitKerja_id
      }
    },
    filterByUnitKerja() {
      return this.data_cuti.filter((item) => {
        return item.pegawai.unit_kerja.id === this.getUserUnit;
      });
    },
  },

  methods: {
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
                this.data_cuti = res.data.data.filter(cuti => cuti.status === "Selesai" || cuti.status === "Belum" || cuti.status === "ACC Kabid" || cuti.status === "Ditolak Kabid");
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
    async validasi(cutiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menyetujui pengajuan cuti?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, setuju!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('token');
            await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti_acc_kabid/${cutiId}`, null, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            Swal.fire(
              'Berhasil!',
              'Pengajuan cuti berhasil disetujui.',
              'success',
              this.getDataPengajuanCuti()
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async validasiTolak(cutiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menolak pengajuan cuti?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, tolak!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('token');
            await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti_tolak_kabid/${cutiId}`, null, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            Swal.fire(
              'Berhasil!',
              'Pengajuan cuti berhasil ditolak.',
              'success',
              this.getDataPengajuanCuti()
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>