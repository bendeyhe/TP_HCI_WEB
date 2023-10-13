<template>
    <AppBar/>
    <h1>Inicio de Sesión</h1>
    <div class="login-box">
        <!--
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img>
        -->
        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>

            <v-text-field
                density="compact"
                placeholder="Ingresá tu Usuario"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                v-model="username"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
                <a
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    ¿Olvidó su contraseña?</a>
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Ingresá tu contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                v-model="password"
                @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-card
                class="mb-12"
                color="surface-variant"
                variant="tonal"
            >
                <v-card-text class="text-medium-emphasis text-caption">
                    Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
                    hours. If you must login now, you can also click "Forgot login password?" below to reset the login
                    password.
                </v-card-text>
            </v-card>

            <v-btn
                block
                class="mb-8"
                size="large"
                variant="tonal"
                @click="login"
            >
                Iniciar Sesión
            </v-btn>
            <RouterLink to="/create-account">
                <v-card-text class="text-center">
                    <a
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >

                        Crear cuenta
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </RouterLink>
        </v-card>
    </div>


</template>


<script setup>
import {ref} from 'vue';
import {useRouter, useRoute, RouterLink} from 'vue-router'
import {useLoginStore} from '@/stores/loginStore.js';
import AppBar from '@/components/AppBar.vue'
import storage from "@/storage/storage";

const loginStore = useLoginStore()

const username = ref('')
const password = ref('')
const route = useRoute()
const router = useRouter()

async function login() {
    const result = await loginStore.login(username.value, password.value);
    if (result.error) {
        console.error('Error en la autenticación:', result.error);
    } else {
        console.log('Usuario autenticado:', result);
        storage.user = username.value
        storage.token = result.token
        const redirectUrl = route.query.redirect || '/' // si redirect es un path "/login" puede que les funcione directo el push()
        await router.push({path: redirectUrl})
    }
}
</script>


<script>
export default {
    data: () => ({
        visible: false,
    }),
}
</script>

<style scoped>
.v-btn {
    color: #8efd00;
    background-color: #000000;
    margin-right: 10px;
    margin-left: 10px;
}

.login-box {
    padding-top: 5%;
}

p {
    text-align: center;
    padding-top: 25px;
}

h1{
    text-align: center;
    padding-top:25px;
}
</style>
