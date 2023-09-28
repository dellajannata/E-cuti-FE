<template>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <form class="login100-form validate-form" @submit.prevent="onResetPassword()">
            <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
              <span class="label-input100">New Password</span>
              <input class="input100" v-model="password" type="password" name="password" placeholder="Masukkan Password Baru Anda" />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
              <span class="label-input100">Confirm New Password</span>
              <input class="input100" v-model="password_confirmation" type="password" name="password_confirmation" placeholder="Masukkan Password Baru Anda Kembali" />
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
  import { useUrlSearchParams } from "@vueuse/core";
  import axios from "axios";
  
  definePageMeta({
    layout: "blank",
  });
  
  const params = useUrlSearchParams("history");
  const router = useRouter();
  
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  // const token = ref("");
  const { token } = useUrlSearchParams("history");
  
  const onResetPassword = async () => {
    await axios
      .put("http://127.0.0.1:8000/api/forgot-password", {
        token: token,
        password: password.value,
        password_confirmation: password_confirmation.value,
      })
      .then((response) => {
        alert(response.message);
        // console.log(response, password.value, password_confirmation.value, token);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error.response, password.value, password_confirmation.value, token);
        // Show error message to the user
      });
  };
  </script>