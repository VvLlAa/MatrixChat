<script setup>
import LoginForm from './components/LoginForm.vue';
import RoomList from './components/RoomList.vue';
import { useMainStore } from "@/stores/MainStore.js";

const MainStore = useMainStore();
</script>

<template>
  <div>
    <h1>Matrix Чат</h1>
    <LoginForm v-if="!MainStore.isAuthenticated" />
    <RoomList v-else />
  </div>
</template>