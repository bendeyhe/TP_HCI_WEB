<template>

      <v-app-bar scroll-behavior="elevate" class="bg-secondary">
        <!--
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         -->

        <v-app-bar-title><h2>TooBig</h2></v-app-bar-title>

        <SearchBar/>
        <v-btn>Crear Rutina</v-btn>
        <v-btn prepend-icon="mdi-account-circle"> Mi Perfil </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <!--  -->
      </v-navigation-drawer>

</template>

<script setup>
  import SearchBar from "@/components/SearchBar.vue";
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
</style>


<style scoped>
.v-btn{
  color: #8efd00;
  margin-right : 10px;
  margin-left : 10px;
}
</style>
