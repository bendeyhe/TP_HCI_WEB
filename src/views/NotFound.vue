<template>
    <img :src="getImageUrl('unauthorized.jpg')" alt="Unauthorized" class="image" />
    <RouterLink to="/">
        <v-btn>Volver a TooBIG</v-btn>
    </RouterLink>
</template>

<script setup>
import Unauthorized from "@/assets/training.jpg";

function getImageUrl(name){
    return new URL(`../assets/${name}`, import.meta.url).href
}
</script>

<style scoped>
.v-btn{
  color: #8efd00;
  background-color: #000000;
  margin-right : 10px;
  margin-left : 10px;
}

.image {
    width: 500px;
    height: auto;
}
</style>
