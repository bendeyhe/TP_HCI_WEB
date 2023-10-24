<template>
    <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Buscar rutinas..."
        append-inner-icon="mdi-magnify"
        v-model="searchQuery"
        single-line
        hide-details
        @click:append-inner="onClick"
        @keydown.enter="onClick"
    ></v-text-field>
</template>

<script setup>
import {ref, watch} from 'vue'
import router from "@/router";
import {useRoute} from "vue-router";

const loaded = ref(false)
const loading = ref(false)
const searchQuery = ref('')

const route = useRoute()

watch(() => route.name, () => { if (route.name !== 'routines') searchQuery.value = '' } )

function onClick() {
    router.push({name: 'routines', params: {query: searchQuery.value}})

    /*loading.value = true;
    setTimeout(() => {
        loading.value = false;
        loaded.value = true;
    }, 2000);*/
}
</script>

<style scoped>
.v-text-field {
    color: #8efd00;
    align-content: center;

    margin-right: 10px;
    margin-left: 10px;
    padding-left: 10em;
    padding-right: 10em;
}
</style>

