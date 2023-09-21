<template>
  <v-app id="inspire">
    <!--<v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
-->
    <v-app-bar scroll-behavior="elevate" color="primary">
      <!--
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
       -->

      <v-app-bar-title>TooBig</v-app-bar-title>
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

    <v-img src="https://img.asmedia.epimg.net/resizer/3kjYbfgz9L4yg96V8Yb8qKFnI84=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EGRQNQBFYJNNZK2E5LRAJOBULQ.jpg"></v-img>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
          <template v-for="n in 4" :key="n">
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong>Category {{ n }}</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)

import SearchBar from "@/components/SearchBar.vue";
</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>

<style scoped>
/* todo por qué no anda esto?????? tuve que poner el color en el app-bar de arriba
.v-app-bar{
  color: primary;
  background-color: secondary;
}*/

.v-app-bar-title{
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  color: #8efd00;
  background-color: #000;
}

.SearchBar{
  margin-left: auto;
  margin-right: auto;
}

.v-btn{
  margin-right : 10px;
  margin-left : 10px;
}
</style>
