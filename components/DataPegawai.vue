<template>
  <div class="card">
    <div class="card-body">
      <div class="card-pegawai">
        <h4 class="card-title">Data Pegawai</h4>
        <a class="btn btn-success" href="/create_pegawai">Tambah</a>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>NIP</th>
              <th>Alamat</th>
              <th>Unit kerja</th>
              <th>Dinas</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pegawai, index) in data_pegawai" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pegawai.nama }}</td>
              <td>{{ pegawai.jabatan }}</td>
              <td>{{ pegawai.nip }}</td>
              <td>{{ pegawai.alamat }}</td>
              <td>{{ pegawai.unit_kerja }}</td>
              <td>{{ pegawai.dinas }}</td>
              <td>
                <NuxtLink :to="`../${pegawai.id}`" class="btn btn-warning btn-sm">Edit</NuxtLink>
              </td>
              <td><button @click="$event => deletePegawai($event, pegawai.id)"
                  class="btn btn-danger btn-sm">Hapus</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      data_pegawai: []
    }
  },
  mounted() {
    this.getDataPegawai();
  },
  methods: {
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai').then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    deletePegawai(event,pegawaiId) {
      if(confirm('Apakah Anda yakin ingin menghapus?')){
        event.target.innerText = "Deleting";
        axios.delete(`http://127.0.0.1:8000/api/pegawai/${pegawaiId}`).then(res => {
          event.target.innerText = "Delete";
          this.getDataPegawai();
        })

      }
    },
  }
}
</script>