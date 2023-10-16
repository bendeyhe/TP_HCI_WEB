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
            class="mx-auto pt-6 pa-12 pb-8"
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

            <!--
            <v-card
                class="mb-12"
                color="surface-variant"
                variant="tonal"
            >
                <v-card-text class="text-medium-emphasis text-caption">
                    Si olvidó su contraseña puede recuperarla haciendo click en el enlace de arriba que dice "¿Olvidó su contraseña?".
                </v-card-text>
            </v-card>
            -->

            <v-btn
                block
                class="mb-8"
                size="large"
                variant="tonal"
                @click="loginUser"
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
import {useUserStore} from '@/stores/userStore.js';
import AppBar from '@/components/AppBar.vue'
import storage from "@/storage/storage";

const userStore = useUserStore()

const username = ref('')
const password = ref('')
const route = useRoute()
const router = useRouter()

async function loginUser() {
    const result = await userStore.login(username.value, password.value);
    if (result.error) {
        console.error('Error en la autenticación:', result.error); // todo mostrar error en pantalla
    } else {
        console.log('Usuario autenticado:', result); // todo mostrar mensaje de éxito en pantalla
        userStore.setToken(result.token)
        const redirectUrl = route.query.redirect || '/'
        await router.push({path: redirectUrl})
    }
}

async function logoutUser() {
    await userStore.logout()
    storage.user = null
    storage.token = null
    await router.push({path: '/login'})
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
    padding-top: 2%;
}

p {
    text-align: center;
    padding-top: 25px;
}

h1 {
    text-align: center;
    padding-top: 25px;
}
</style>
