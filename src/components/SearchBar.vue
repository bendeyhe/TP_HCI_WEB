<template>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Buscar..."
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
        @keydown.enter="onClick"
        v-model="searchQuery"
      ></v-text-field>
</template>

<script setup>
import { ref } from 'vue'

const loaded = ref(false)
const loading = ref(false)
const searchQuery = ref('')

function onClick () {
  if (searchQuery.value.trim() !== ''){
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
}
</script>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
    searchQuery: ''
  }),

  methods: {
    onClick () {
      if (searchQuery.value.trim() !== ''){
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  },
  },
}
</script>


<style scoped>
.v-text-field{
  color: #8efd00;
  align-content: center;

  margin-right : 10px;
  margin-left : 10px;
  padding-left: 10em;
  padding-right:10em;
}
</style>

