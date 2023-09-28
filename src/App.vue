<template>
  <v-app>
    <v-main>
      <MainPage />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import MainPage from "@/components/MainPage.vue";
  import ExampleComponent from "@/components/ExampleComponent.vue";

</script>
