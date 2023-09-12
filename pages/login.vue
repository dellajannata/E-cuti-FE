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
						<input class="input100" type="password" v-model="form.password" name="password" placeholder="Enter password">
						<span class="focus-input100"></span>
					</div>

					<div class="w-full flex-sb-m p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">Remember me</label>
						</div>
						<div>
							<a href="#" class="txt1">Forgot Password?</a>
						</div>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
  
<script setup>
import Swal from 'sweetalert2';

const { $sanctumAuth, $apiFetch } = useNuxtApp()
const router = useRouter()
const appConfig = useAppConfig()

const error = ref('') // Changed to a single error message

const form = ref({
	email: '',
	password: ''
})

const REDIRECT_ROUTES = {
	ADMIN: '/dashboard',
    KABID: '/dashboard_kabid',
    KASUBAG: '/dashboard_kasubag',
    KADIS: '/dashboard_kadis',
    SEKRETARIS: '/dashboard_sekretaris',
    PEGAWAI: '/dashboard_pegawai'
}

const onLogin = async () => {
	try {
		// Menggunakan metode login dari $sanctumAuth
		await $sanctumAuth.login(form.value, (resp) => {
			console.log(resp)

			// Response akan berisi token dan data user jika login berhasil
			const token = resp.access_token
			const user = JSON.stringify(resp.user)

			// Simpan token di localStorage
			localStorage.setItem('token', token)
			localStorage.setItem('user', user)

			// check role untuk redirect setelah login
			console.log(resp.user.role)
			switch (resp.user.role) {
				case 'admin':
					return router.push(REDIRECT_ROUTES.ADMIN)
				case 'kabid':
					return router.push(REDIRECT_ROUTES.KABID)
				case 'kasubag umum':
					return router.push(REDIRECT_ROUTES.KASUBAG)
				case 'kadis':
					return router.push(REDIRECT_ROUTES.KADIS)
				case 'sekretaris':
					return router.push(REDIRECT_ROUTES.SEKRETARIS)
				case 'pegawai':
					return router.push(REDIRECT_ROUTES.PEGAWAI)
				default:
					return router.push('/dashboard')
			}
		})
	} catch (error) {
		console.error(error);

		// Menampilkan pesan kesalahan kepada pengguna
		Swal.fire({
			icon: 'warning',
			title: 'Gagal Login',
			text: 'Harap periksa kembali email dan password.',
		});
	}
};
</script>