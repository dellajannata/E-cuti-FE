// plugins/axios.js

export default function ({ $axios, redirect }) {
    // Setel token dari local storage untuk setiap permintaan
    const token = localStorage.getItem('access_token');
    // dd(token);
  
    if (token) {
      $axios.setToken(token, 'Bearer');
    }else {
      return redirect('/login'); // Redirect ke halaman login jika pengguna belum login
    }
  
    // Tambahkan axios interceptor untuk menambahkan header Authorization
    $axios.onRequest((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
    });
  
    // Tambahkan axios interceptor untuk menangani respons yang tidak diotorisasi (401)
    $axios.onError((error) => {
      const code = parseInt(error.response && error.response.status);
      if (code === 401) {
        // Redirect ke halaman login jika permintaan tidak diotorisasi
        // atau token kedaluwarsa
        return redirect('/login');
      }
    });
  }