<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const lastEvent = computed(() => {
  const lastEvent = props.room.timeline[props.room.timeline.length - 1];
  return lastEvent ? lastEvent.getContent().body : 'No messages';
});
</script>

<template>
  <div class="room-item">
    <div class="details">
      <h3>Комната: {{ room.name }}</h3>
      <p>Последнее собщение: {{ lastEvent }}</p>
      <p>Непрочитано: {{ props.room.notificationCounts.total  }}</p>
    </div>
  </div>
</template>

<style scoped>
.room-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #232323;
  border-radius: 10px;
  padding: 10px;
}
</style>
