<template>
    <v-app-bar scroll-behavior="elevate" class="bg-secondary">

        <RouterLink to="/">
            <v-app-bar-title><h2>TooBig</h2></v-app-bar-title>
        </RouterLink>

        <slot name="search">
            <SearchBar/>
        </slot>
        <RouterLink to="/create-routine">
            <v-btn>Crear Rutina</v-btn>
        </RouterLink>

        <slot name="perfil">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn prepend-icon="mdi-account-circle" v-bind="props">Mi Perfil</v-btn>
                </template>
                <v-list>
                    <v-list-item @click="goTo('/my-profile')">Perfil</v-list-item>
                    <v-list-item @click="goTo('/my-exercises')">Mis ejercicios</v-list-item>
                    <v-list-item @click="goTo('/my-routines')">Mis rutinas</v-list-item>
                    <v-list-item @click="goTo('/favourite')">Favoritos</v-list-item>
                    <v-list-item @click="logout">Cerrar sesión</v-list-item>
                </v-list>
            </v-menu>
        </slot>
    </v-app-bar>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue";
import {RouterLink} from 'vue-router';
import router from "@/router";
import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()

const goTo = (route) => {
    router.push({path: route});
};

const logout = async () => {
    await userStore.removeToken();
    await router.push({path: '/login'});
};
</script>

<style scoped>

h2 {
    font-family: Montserrat, sans-serif;
    font-weight: bolder;
    font-size: 200%;
    color: #000000;
    background-color: #8efd00;
    padding: 20px;
    display: inline-block;
}

.v-btn {
    color: #8efd00;
    margin-right: 10px;
}
</style>

