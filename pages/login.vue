<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" @submit.prevent="login_pengguna">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<!-- <span class="Sign-In">Sign In</span> -->
						<span class="label-input100">E-mail</span>
						<input class="input100" v-model="data_pengguna.email" type="email" name="email" placeholder="Enter Email">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate="Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" v-model="data_pengguna.password" name="password"
							placeholder="Enter password">
						<span class="focus-input100"></span>
					</div>

					<div class="w-full flex-sb-m p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>
						<div>
							<a href="#" class="txt1">
								Forgot Password?
							</a>
						</div>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: "Login",
  auth: "guest",
  data() {
    return {
      data_pengguna: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login_pengguna() {
      try {
        console.log(this.data_pengguna.email);
        await axios.post('http://localhost:8000/api/login', this.data_pengguna)
          .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            // Simpan informasi pengguna di localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Pemeriksaan peran pengguna
            const userRole = response.data.user.role;
            if (userRole === 'admin_utama') {
              this.$router.push('/dashboard');
            } else if (userRole === 'user') {
              this.$router.push('/data_pengajuan_cuti');
            } else {
              this.$router.push('/dashboard');
            }
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'warning',
          title: 'Gagal Login',
          text: 'Harap periksa kembali email dan password.',
        });
      };
    },
    backDashboard() {
      this.$router.push('/dashboard');
    }
  }
}
</script>
