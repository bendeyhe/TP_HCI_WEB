<template>
    <v-app>
        <v-main>
            <AppBar/>
            <RouterView/>
        </v-main>
    </v-app>
</template>

<script setup>
import {RouterView} from 'vue-router';
import AppBar from "@/components/AppBar.vue";

const userStore = useUserStore();

function isLogged() {
    return userStore.getTokenState() !== null && userStore.getTokenState() !== '';
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
