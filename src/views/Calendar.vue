<!-- <template>
    <div class="grid grid-cols-7 gap-0 text-center">
      <div class="border p-2 cursor-pointer" v-for="(day, index) in days" :key="index" @click="selectDay(day)">
        {{ day }}
        <EventCard
          v-for="event in events.filter(e => e.day === day)"
          :key="event._id"
          :event="event"
          :editEvent="editEvent"
          :confirmDelete="confirmDeleteEvent"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import EventCard from './EventCard.vue';
  
  const props = defineProps({
    days: Array,
    events: Array,
    selectDay: Function,
    editEvent: Function,
    confirmDeleteEvent: Function
  });
  </script>
  
  <style scoped>
  /* Add styles for calendar */
  </style>
   -->