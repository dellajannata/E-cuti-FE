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
        async logout() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            const requestData = this.data_pengguna;
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.post('http://127.0.0.1:8000/api/logout', requestData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log("Logout successful.");
                this.removeTokenFromLocalStorage();
                this.backLogin();

                this.isLoading = false;
                this.isLoadingTitle = "Loading";

            }
            catch (error) {
                console.error(error)
            };
        },
        backLogin() {
            this.$router.push('/login');
        },
        removeTokenFromLocalStorage() {
            localStorage.removeItem('access_token');
            this.isLoading = false;
            this.isLoadingTitle = "Loading";
            this.backLogin();
        }
    }
}
</script>