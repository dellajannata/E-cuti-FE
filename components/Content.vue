<template>
    <div class="card">
        <h1>aaaa</h1>
        <button @click="logout()" class="btn btn-danger">Logout</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "logout",
    data() {
        return {
            data_pengguna: {
                email:'',
                password: '',
            },
            isLoading: false,
            isLoadingTitle: "Loading"
        }
    },
    methods: {
        async logout() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            const requestData = this.data_pengguna;
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/logout', requestData);
                console.log(response.data);
                this.backLogin();

                // this.data_pengguna.email = '';
                // this.data_pengguna.password = '';
                this.isLoading = false;
                this.isLoadingTitle = "Loading";

            }
            catch (error) {
                console.error(error)
            };
        },
        backLogin() {
            this.$router.push('/login');
        }
    }
}
</script>