<template>
    <AppBarWithoutSearch/>
    <h1>Inicio de Sesión</h1>
    <div class="login-box">
        <v-card
            class="mx-auto pt-6 pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>

            <v-text-field
                density="compact"
                placeholder="Ingresá tu usuario"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                v-model="username"
                :disabled="loading || passedUsername"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
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
                :disabled="loading"
            ></v-text-field>

            <v-alert
                v-if="successAlert"
                color="success"
                icon="$success"
                :text=successMessage
            ></v-alert>
            <v-alert
                v-if="errorAlert"
                color="error"
                icon="$error"
                :text=errorMessage
            ></v-alert>

            <v-btn
                block
                class="mb-8"
                size="large"
                variant="tonal"
                @click="loginUser"
            >
                <template v-if="loading">
                    <v-progress-circular
                        indeterminate
                        size="20"
                        color="white"
                    ></v-progress-circular>
                </template>
                <template v-else>
                    Iniciar Sesión
                </template>
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
import {onBeforeMount, ref} from 'vue';
import {useRouter, useRoute, RouterLink} from 'vue-router'
import {useUserStore} from '@/stores/userStore'
import AppBarWithoutSearch from "@/components/AppBarWithoutSearch.vue";

const userStore = useUserStore()

const username = ref('')
const password = ref('')
const route = useRoute()
const router = useRouter()
const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario logueado con éxito')
const errorMessage = ref('Error al loguear')
const formErrors = ref([])
const loading = ref(false);
const passedUsername = ref(false)

onBeforeMount(() => {
    if (route.query.username) {
        passedUsername.value = true;
        username.value = route.query.username;
    }
});

const validateForm = () => {
    formErrors.value = [];
    if (!username.value)
        formErrors.value.push('El usuario es obligatorio. ');
    if (!password.value)
        formErrors.value.push('La contraseña es obligatoria.');
};

async function loginUser() {
    validateForm();
    if (formErrors.value.length > 0) {
        const error = formErrors.value.join('');
        await showErrorAlert(error);
        loading.value = false;
    } else {
        loading.value = true;
        const result = await userStore.login(username.value, password.value);
        if (result.error || !result.success) {
            loading.value = false;
            await showErrorAlert('Usuario o contraseña incorrectos.');
        } else {
            userStore.setToken(result.data.token)
            userStore.updateToken(result.data.token, true)
            await showSuccessAlert('Usuario autenticado con éxito');
            const redirectUrl = route.query.redirect || '/'
            await router.push({path: redirectUrl})
        }
    }
}

async function showSuccessAlert(message) {
    successMessage.value = message
    successAlert.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            successAlert.value = false;
            resolve();
        }, 1500);
    });
}

async function showErrorAlert(message) {
    errorMessage.value = message
    errorAlert.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            errorAlert.value = false;
            resolve();
        }, 1500);
    });
}

</script>


<script>
import {useUserStore} from "@/stores/userStore";

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
    margin-top: 20px;
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
