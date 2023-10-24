<template>
    <v-app v-if="isOnline()">
        <v-main>
            <AppBar/>
            <RouterView/>
        </v-main>
    </v-app>
    <v-app v-else>
        <v-main>
            <AppBar/>
            <div class="center-container">
                <div class="image-container">
                    <img :src="getImageUrl('nointernet.jpg')" alt="No tienes conexión a internet" class="image"/>
                </div>
                <div class="flex-container">
                    <h2>No tienes conexión a internet. Conéctese a una red y recargue la página.</h2>
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppBar from "@/components/AppBar.vue"

const userStore = useUserStore();

function getImageUrl(name) {
    return new URL(`./assets/${name}`, import.meta.url).href
}

function isOnline() {
    return window.navigator.onLine;
}

</script>

<script>
import {useUserStore} from "@/stores/userStore";

export default {
    async created() {
        await useUserStore().initialize();
    }
}

</script>

<style scoped>
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

</style>
