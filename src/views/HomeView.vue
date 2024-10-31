<template>
  <div>
    <h1>Bienvenue sur la page d'accueil</h1>
    <button @click="logout">Déconnexion</button>
  </div>

  <div class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center"> 
      <div class="flex items-center justify-between mb-8 w-full max-w-4xl">
        <div class="flex items-center">
          <div class="bg-gray-200 p-4 rounded-lg">
            <div class="grid grid-cols-4 gap-0">
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                <i class="fas fa-check text-green-500"></i>
              </div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                <i class="fas fa-check text-green-500"></i>
              </div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                <i class="fas fa-check text-green-500"></i>
              </div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg"></div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg"></div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg"></div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg"></div>
              <div class="w-12 h-12 bg-white flex items-center justify-center rounded-lg"></div>
            </div>
          </div>
          <div class="ml-8">
            <img alt="Illustration of a person standing with a calendar" class="w-32 h-32" height="150" src="https://storage.googleapis.com/a1aa/image/ILbcldDfYs0lNiMguVZJgKvoe3Ni4d95EuUg9IQyBZfqa0XnA.jpg" width="150"/>
          </div>
        </div>
        <div v-if="showModal" class="bg-white p-4 rounded-lg shadow-lg w-80">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">{{ editingEvent ? 'Edit event' : 'Add a new event' }}</h2>
            <button @click="closeModal" class="text-red-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-red-600 mb-2">{{ selectedDay }}</p>
          <input v-model="newEvent" class="w-full border-b border-gray-300 mb-4 p-2" placeholder="New event" type="text"/>
          <button @click="editingEvent ? updateEvent() : addEvent()" class="bg-green-600 text-white px-4 py-2 rounded">
            {{ editingEvent ? 'Update' : 'Submit' }}
          </button>
        </div>
      </div>
      <div v-if="successMessage" class="bg-green-200 text-green-800 p-2 rounded mb-4">
        {{ successMessage }}
      </div>
      <div class="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">Calendar App</h1>
          <button @click="showModal = true" class="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-plus mr-2"></i>
            New Event
          </button>
        </div>
        <div class="grid grid-cols-7 gap-0 text-center">
          <div class="border p-2 cursor-pointer" v-for="(day, index) in days" :key="index" @click="selectDay(day)">
            {{ day }}
            <div v-for="event in events.filter(e => e.day === day)" :key="event._id" class="mt-2 bg-blue-100 p-1 rounded">
              {{ event.title }}
              <button @click="editEvent(event)" class="text-blue-500 ml-2">Edit</button>
              <button @click="confirmDeleteEvent(event)" class="text-red-500 ml-2">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showConfirmModal" class="bg-white p-4 rounded-lg shadow-lg w-80 mt-4">
        <h2 class="text-lg font-semibold">Confirm Deletion</h2>
        <p class="mb-4">Are you sure you want to delete this event?</p>
        <div class="flex justify-end">
          <button @click="deleteConfirmed" class="bg-red-600 text-white px-4 py-2 rounded mr-2">Delete</button>
          <button @click="closeConfirmModal" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const showModal = ref(false);
const showConfirmModal = ref(false);
const successMessage = ref('');
const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
const selectedDay = ref('');
const newEvent = ref('');
const events = ref([]);
const editingEvent = ref(null);
const eventToDelete = ref(null);

onMounted(async () => {
  await fetchEvents();
});

const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');

  // Redirect to the authentication page
  router.push('/auth');
};
const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events');
    events.value = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

const addEvent = async () => {
  if (newEvent.value && selectedDay.value) {
    try {
      const event = { day: selectedDay.value, title: newEvent.value };
      const response = await axios.post('http://localhost:3000/events', event);
      events.value.push(response.data);
      successMessage.value = 'Event added successfully!';
      closeModal();
      setTimeout(() => successMessage.value = '', 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding event:', error);
    }
  } else {
    alert('Please enter an event and select a day.');
  }
};

const updateEvent = async () => {
  if (editingEvent.value) {
    try {
      const response = await axios.put(`http://localhost:3000/events/${editingEvent.value._id}`, {
        title: newEvent.value,
        day: selectedDay.value
      });
      const index = events.value.findIndex(e => e._id === editingEvent.value._id);
      events.value[index] = response.data;
      closeModal();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
};

const confirmDeleteEvent = (event) => {
  showConfirmModal.value = true;
  eventToDelete.value = event;
};

const deleteConfirmed = async () => {
  if (eventToDelete.value) {
    try {
      await axios.delete(`http://localhost:3000/events/${eventToDelete.value._id}`);
      events.value = events.value.filter(e => e._id !== eventToDelete.value._id);
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
};

const closeConfirmModal = () => {
  showConfirmModal.value = false;
  eventToDelete.value = null;
};

const selectDay = (day) => {
  selectedDay.value = day;
  showModal.value = true;
};

const editEvent = (event) => {
  showModal.value = true;
  editingEvent.value = event;
  newEvent.value = event.title;
  selectedDay.value = event.day;
};

const closeModal = () => {
  showModal.value = false;
  editingEvent.value = null;
  newEvent.value = '';
  selectedDay.value = '';
};

</script>

<style scoped>
/* Add any additional styles here */
</style>
