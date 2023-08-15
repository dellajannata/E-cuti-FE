<template>
    <!-- Pegawai -->
    <div class="col-lg-3 col-sm-6">
        <div class="card"> 
            <div class="card-body"> 
                <h3 class="card-title">Total Pegawai</h3>
                <div class="d-inline-block">
                    <h2>4565</h2>
                    <p>Uhuuyy</p>
                </div>
                <span class="float-right display-5 opacity-5"><i class="fa fa-shopping-cart"></i></span>
            </div>
        </div>
    </div>       
    
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
        <div class="card"> 
            <div class="card-body"> 
                <h3 class="card-title">Pengajuan Cuti</h3>
                <div class="d-inline-block">
                    <h2>12</h2>
                    <p class="text-white">Ayeee ayee</p>
                </div>
                <span class="float-right display-5 opacity-5"><i class="fa fa-shopping-cart"></i></span>
            </div>
        </div>
    </div>                                                                                                                                                                                                
</template>
<script>
import axios from 'axios';
export default {
    name: "logout",
    middleware: ['auth'] ,
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
                const response = await axios.post('http://127.0.0.1:8000/api/logout', requestData);
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