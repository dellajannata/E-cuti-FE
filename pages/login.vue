<template>
	<div class="limiter">
	  <div class="container-login100">
		<div class="wrap-login100">
		  <form class="login100-form validate-form" @submit.prevent="onLogin()">
			<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
			  <span class="label-input100">E-mail</span>
			  <input class="input100" v-model="form.email" type="email" name="email" placeholder="Enter Email">
			  <span class="focus-input100"></span>
			</div>
  
			<div class="wrap-input100 validate-input m-b-18" data-validate="Password is required">
			  <span class="label-input100">Password</span>
			  <div class="input-icon">
				<input class="input100" :type="showPassword ? 'text' : 'password'" v-model="form.password"
				  name="password" placeholder="Enter password">
				<i class="password-icon" :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
				  @click="togglePasswordVisibility"></i>
			  </div>
			  <span class="focus-input100"></span>
			</div>
  
			<div>
			  <!-- Tombol Login dengan spinner -->
			  <button @click="onLogin" :disabled="loading">
				<span class="login100-form-btn" v-if="!loading">Login</span>
				<span v-else>
				  <span class="login100-form-btn">Loading...</span> 
				</span>
			  </button>
			</div>
		  </form>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import Swal from 'sweetalert2';
  
  const showPassword = ref(false);
  const loading = ref(false); // Tambahkan ref untuk loading
  
  const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
  };
  
  definePageMeta({
	layout: 'blank'
  });
  
  const { $sanctumAuth, $apiFetch } = useNuxtApp();
  const router = useRouter();
  const appConfig = useAppConfig();
  
  const error = ref('');
  
  const form = ref({
	email: '',
	password: '',
  });
  
  const REDIRECT_ROUTES = {
	ADMIN: '/dashboard',
	KABID: '/dashboard_kabid',
	KASUBAG: '/dashboard_kasubag',
	KADIS: '/dashboard_kadis',
	SEKRETARIS: '/dashboard_sekretaris',
	PEGAWAI: '/dashboard_pegawai',
  };
  
  const onLogin = async () => {
	loading.value = true; // Menampilkan loading saat mulai login
	try {
	  // Menggunakan metode login dari $sanctumAuth
	  await $sanctumAuth.login(form.value, (resp) => {
		console.log(resp);
  
		// Response akan berisi token dan data user jika login berhasil
		const token = resp.access_token;
		const user = JSON.stringify(resp.user);
  
		// Simpan token di localStorage
		localStorage.setItem('token', token);
		localStorage.setItem('user', user);
  
		// check role untuk redirect setelah login
		console.log(resp.user.role);
		switch (resp.user.role) {
		  case 'admin':
			return router.push(REDIRECT_ROUTES.ADMIN);
		  case 'kabid':
			return router.push(REDIRECT_ROUTES.KABID);
		  case 'kasubag umum':
			return router.push(REDIRECT_ROUTES.KASUBAG);
		  case 'kadis':
			return router.push(REDIRECT_ROUTES.KADIS);
		  case 'sekretaris':
			return router.push(REDIRECT_ROUTES.SEKRETARIS);
		  case 'pegawai':
			return router.push(REDIRECT_ROUTES.PEGAWAI);
		  default:
			return router.push('/dashboard');
		}
	  });
	} catch (error) {
	  console.error(error);
	  // Menampilkan pesan kesalahan kepada pengguna
	  Swal.fire({
		icon: 'warning',
		title: 'Gagal Login',
		text: 'Harap periksa kembali email dan password.',
	  });
	} finally {
	  loading.value = false;
	}
  };
  </script>
  
  <style scoped>
  /* Gaya spinner yang sesuai dengan preferensi Anda */
  .loader {
	border: 5px solid #f3f3f3;
	border-top: 5px solid #3498db;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 2s linear infinite;
	margin-right: 10px;
	/* Mengatur jarak dari tombol login */
  }
  
  .container-login100-form-btn {
	display: flex;
	align-items: center;
	justify-content: center;
  }
  
  .spinner {
	width: 48px;
	height: 48px;
	border-width: 4px;
  }
  </style>
  