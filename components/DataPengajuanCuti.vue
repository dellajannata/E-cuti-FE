<template>
    <div class="card">
      <div class="card-body">
        <div class="card-pegawai">
          <h4 class="card-title">Data Pegajuan Cuti</h4>
          <a class="btn btn-success" href="/create_pengajuan_cuti">Tambah</a>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Jenis Cuti</th>
                <th>Tanggal Awal</th>
                <th>Tanggal Akhir</th>
                <th>Alasan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jacob</td>
                <td>Photoshop</td>
                <td class="text-danger"> 28.76% <i class="ti-arrow-down"></i></td>
                <td><label class="badge badge-danger">Pending</label></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
