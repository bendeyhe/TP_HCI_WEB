<template>
    <v-app>
        <v-main>
            <RouterView/>
        </v-main>
    </v-app>
</template>

<script setup>
import {RouterView} from 'vue-router';
</script>

<script>

import {useUserStore} from "@/stores/userStore";

export default {
    async created() {
        await useUserStore().initialize();
    }
}
</script>
