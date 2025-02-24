<script setup>
import { computed } from 'vue';
import RoomItem from './RoomItem.vue';
import { useMainStore } from "@/stores/MainStore.js";

const MainStore = useMainStore();

const sortedRooms = computed(() => {
  return [...MainStore.rooms].sort((a, b) => {
    const aLastEvent = a.timeline[a.timeline.length - 1]?.getDate() || 0;
    const bLastEvent = b.timeline[b.timeline.length - 1]?.getDate() || 0;
    return bLastEvent - aLastEvent || a.name.localeCompare(b.name);
  });
});
</script>

<template>
  <div>
    <h2>Комнаты</h2>
    <div v-if="sortedRooms.length">
      <RoomItem v-for="room in sortedRooms" :key="room.roomId" :room="room" />
    </div>
    <p v-else>Загрузка...</p>
  </div>
</template>