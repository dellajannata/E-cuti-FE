<template>
  <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
      <div class="me-3">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
      </div>
      <div>
        <a class="navbar-brand brand-logo" href="/dashboard">
          <img src="../assets/css/vertical-layout-light/logo1.png" alt="" />
        </a>
        <!-- <a class="navbar-brand brand-logo-mini" href="index.html">
          <img src="../assets/css/vertical-layout-light/logo1.png" alt="" />
        </a> -->
      </div>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-top">
      <h2 class="ecuti-navbar">
        Sistem Permohonan Cuti
      </h2>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown d-none d-lg-block user-dropdown">
          <a class="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <!-- <img class="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image"> -->
          </a>
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
            <div class="dropdown-header text-center">
              <!-- <img class="img-md rounded-circle" src="images/faces/face8.jpg" alt="Profile image"> -->
              <p class="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
              <p class="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
            </div>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i> My
              Profile <span class="badge badge-pill badge-danger">1</span></a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2"></i>
              Messages</a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2"></i>
              Activity</a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2"></i>
              FAQ</a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i>Sign Out</a>
          </div>
        </li>
      </ul>
      <li class="nav-item">
        <button class="btn btn-danger logout-button" @click="logout()">Logout</button>
      </li>
      <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
        data-bs-toggle="offcanvas">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  methods: {
    async logout() {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan keluar?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Keluar'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
              this.backLogin()
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'warning',
          title: 'Gagal Logout',
          text: 'Coba ulangi.',
        });
      };
    },
    backLogin() {
      this.$router.push('/login');
    }
  }
}
</script>