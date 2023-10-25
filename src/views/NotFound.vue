<template>
    <div class="center-container">
        <div class="image-container">
            <img :src="getImageUrl('unauthorized.jpg')" alt="Unauthorized" class="image" />
        </div>
        <h2 class="center-button">No se ha encontrado esa página.</h2>
        <RouterLink to="/">
            <v-btn class="center-button">Volver a TooBIG</v-btn>
        </RouterLink>
    </div>
</template>

<script setup>
import Unauthorized from "@/assets/training.jpg";

function getImageUrl(name){
    return new URL(`../assets/${name}`, import.meta.url).href
}
</script>

<style scoped>
.v-btn{
  color: #000000;
  background-color: #8efd00;

}

.image {
    width: 500px;
    height: auto;
}

.center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}


.image-container {
    max-width: 100%;
}


.center-button {
    margin-top: 5px;
}
</style>
