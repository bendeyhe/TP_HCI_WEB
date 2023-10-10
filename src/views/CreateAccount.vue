<template>
    <AppBar/>

    <v-sheet rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
            <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
            placeholder="Ingrese su e-mail"
            ></v-text-field>

            <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
            placeholder="Repita su e-mail"
            ></v-text-field>

            <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            ></v-text-field>

            <br>

            <v-btn
            :loading="loading"
            block
            size="large"
            type="submit"
            variant="elevated"
            >
            Crear cuenta
            </v-btn>
            
        </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import storage from '../storage/storage.js'
import GoBack from "@/components/GoBack.vue"; //esto hay que cambiarlo cuando tengamos Pinia
import AppBar from '@/components/AppBar.vue'

const username = ref(null)
const password = ref(null)
const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.v-btn{
    color: #8efd00;
    background-color: #000000;
    margin-right : 10px;
    margin-left : 10px;
}

.v-sheet{
    padding-top: 5%;
}

</style>