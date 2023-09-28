<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <form class="login100-form validate-form" @submit.prevent="onPushEmail()">
          <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
            <span class="label-input100">E-mail</span>
            <input class="input100" v-model="email" type="email" name="email" placeholder="Masukkan Email Anda" />
            <span class="focus-input100"></span>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn" type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import Swal from "sweetalert2";
import axios from "axios";

definePageMeta({
  layout: "blank",
});

const router = useRouter();
const email = ref("");

const onPushEmail = async () => {
  await axios
    .post("http://127.0.0.1:8000/api/forgot-password", { email: email.value })
    .then((response) => {
      Swal.fire(
        'Periksa Email Anda!',
        'Harap periksa email untuk mengubah password.',
        'success'
      );
    })
    .catch((error) => {
      console.log(error.response);
    });
};
</script>