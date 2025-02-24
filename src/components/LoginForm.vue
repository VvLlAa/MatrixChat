<script setup>
import {ref} from 'vue';
import { useMainStore } from "@/stores/MainStore.js";

const MainStore = useMainStore();
const homeserver = ref('https://matrix.org');
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  await MainStore.login(homeserver.value, username.value, password.value);
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="homeserver" placeholder="Homeserver" required/>
    <input v-model="username" placeholder="Username" required/>
    <input v-model="password" placeholder="Password" type="password" required/>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form input {
  padding: 10px;
}
</style>