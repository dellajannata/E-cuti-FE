<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" @submit.prevent="login_pengguna">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<!-- <span class="Sign-In">Sign In</span> -->
						<span class="label-input100">E-mail</span>
						<input class="input100" v-model="data_pengguna.email" type="email" name="email"
							placeholder="Enter Email">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate="Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" v-model="data_pengguna.password" name="password"
							placeholder="Enter password">
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-30">
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
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
	name: "Login",
	middleware: 'auth',
	data() {
		return {
			data_pengguna: {
				email: '',
				password: '',
			},
			isLoading: false,
			isLoadingTitle: "Loading"
		}
	},
	methods: {
		async login_pengguna() {
			const requestData = this.data_pengguna;
			try {
				const response = await axios.post('http://127.0.0.1:8000/api/login', requestData);
				console.log(response.data);
				if (typeof window !== 'undefined') {
					localStorage.setItem('access_token', response.data.access_token);
				}
				console.log(response.data.access_token);
				this.backDashboard();

				this.data_pengguna.email = '';
				this.data_pengguna.password = '';

				this.isLoading = false;
				this.isLoadingTitle = "Loading";

			}
			catch (error) {
				console.error(error);
				Swal.fire({
					icon: 'Gagal Login',
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