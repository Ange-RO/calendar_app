<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center mb-6">{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
        <form @submit.prevent="isLogin ? loginUser() : registerUser()">
          <div class="mb-4">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div v-if="!isLogin" class="mb-4">
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirmez le mot de passe"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {{ isLogin ? 'Se connecter' : 'S\'inscrire' }}
          </button>
        </form>
        <button
          @click="toggleAuth"
          class="mt-4 w-full text-blue-500 hover:underline"
        >
          {{ isLogin ? 'Créer un compte' : 'Se connecter' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        isLogin: true,
      };
    },
    methods: {
      toggleAuth() {
        this.isLogin = !this.isLogin;
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      async registerUser() {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
    
    localStorage.setItem('token', response.data.token);
    alert(response.data.message);

    // Redirection vers la page d'accueil
    this.$router.push('/home');
  } catch (error) {
    alert(error.response.data.message);
  }
},

async loginUser() {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: this.email,
      password: this.password
    });

    localStorage.setItem('token', response.data.token);
    alert(response.data.message);

    // Redirection vers la page d'accueil
    this.$router.push('/home');
  } catch (error) {
    console.error('Login error:', error); 
    alert(error.response.data.message);
  }
}
}
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles */
  </style>
  