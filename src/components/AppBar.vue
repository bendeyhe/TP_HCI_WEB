<template>
    <v-app-bar scroll-behavior="elevate" class="bg-secondary">

        <RouterLink to="/">
            <v-app-bar-title><h2>TooBig</h2></v-app-bar-title>
        </RouterLink>

        <SearchBar/>

        <RouterLink to="/create-routine">
            <v-btn>Crear Rutina</v-btn>
        </RouterLink>

        <RouterLink to="/my-profile">
            <v-btn prepend-icon="mdi-account-circle"> Mi Perfil </v-btn>
        </RouterLink>

    </v-app-bar>
</template>

<script setup>
  import SearchBar from "@/components/SearchBar.vue";
  import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* todo por qué no anda esto?????? tuve que poner el color en el app-bar de arriba
.v-app-bar{
  color: primary;
  background-color: secondary;
}*/

h2{
  font-family: Montserrat, sans-serif;
  font-weight: bolder;
  font-size: 200%;
  color: #000000;
  background-color: #8efd00;
  padding:20px;
  display: inline-block;
}

.v-btn{
  color: #8efd00;
  margin-right : 10px;
  margin-left : 10px;
}
</style>

