<template>
    <v-app v-if="!isOnline()">
        <v-main>
            <AppBar/>
            <RouterView/>
        </v-main>
    </v-app>
    <v-app v-else>
        <v-main>
            <img :src="getImageUrl('nointernet.jpg')" alt="nointernet"/>
        </v-main>
    </v-app>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppBar from "@/components/AppBar.vue"

const userStore = useUserStore();

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
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
img {
    width: 72px;
    height: 30px;
}
</style>
