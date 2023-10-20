<template>
    <AppBar>
        <template v-slot:search>
            <div class="flex-grow-1"></div>
        </template>

        <template v-slot:perfil>
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn prepend-icon="mdi-account-circle" v-bind="props">Ingresar</v-btn>
                </template>
                <v-list>
                    <v-list-item @click="goTo('/login')">Iniciar sesión</v-list-item>
                    <v-list-item @click="goTo('/create-account')">Registrarse</v-list-item>
                    <v-list-item @click="goTo('/validate')">Verificar email</v-list-item>
                </v-list>
            </v-menu>
        </template>
    </AppBar>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import router from "@/router";

const goTo = (route) => {
    router.push({path: route});
};
</script>

<style scoped>
.v-btn {
    color: #8efd00;
    margin-right: 10px;
    margin-left: 10px;
}
</style>
