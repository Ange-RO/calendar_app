<!-- <template>
    <div>
      <p class="text-red-600 mb-2">{{ selectedDay }}</p>
      <input 
        :value="eventTitle" 
        @input="updateEventTitle" 
        class="w-full border-b border-gray-300 mb-4 p-2" 
        placeholder="New event" 
        type="text" 
      />
      <button @click="submitEvent" class="bg-green-600 text-white px-4 py-2 rounded">
        {{ isEditing ? 'Update' : 'Submit' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      eventTitle: {
        type: String,
        required: true,
      },
      selectedDay: {
        type: String,
        required: true,
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      updateEventTitle(event) {
        this.$emit('update:eventTitle', event.target.value);
      },
      submitEvent() {
        // Your submit logic here
      },
    },
  };
  </script>
   -->