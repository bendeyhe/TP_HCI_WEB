<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { RouterView } from 'vue-router';

  import HelloWorld from '@/components/HelloWorld.vue'
  import MainPage from "@/views/HomeView.vue";
  import ExampleComponent from "@/components/ExampleComponent.vue";

</script>
