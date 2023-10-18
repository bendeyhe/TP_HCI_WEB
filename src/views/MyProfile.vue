<template>
  <AppBar/>
  <h1>Mi Perfil</h1>

    <div class="login-box">
        <v-card
            class="mx-auto pt-6 pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <!--Voy a mostrar nombre el usuario-->
            <div class="text-subtitle-1 text-medium-emphasis">Nombre de Usuario: {{userData.username}}</div>

            <!--Voy a mostrar el email del usuario-->
            <div class="text-subtitle-1 text-medium-emphasis">Email: {{userData.email}}</div>


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
                size="large"
                variant="tonal"
                @click="logoutUser"
            >
                <template v-if="loading">
                    <v-progress-circular
                        indeterminate
                        size="20"
                        color="white"
                    ></v-progress-circular>
                </template>
                <template v-else>
                    Cerrar Sesión
                </template>
            </v-btn>
        </v-card>
    </div>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import {ref, onBeforeMount} from "vue";
import storage from "@/storage/storage";
import {RouterLink, useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore()

const router = useRouter()
const loading = ref(false);
const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario logueado con éxito')
const errorMessage = ref('Error al loguear')

const userData = ref({
    username: '',
    //firstName: '',
    //lastName: '',
    //gender: '',
    email: '',
    //phone: '',
    //avatar_url: '',
    date: ''
})

onBeforeMount(async ()=>{
    await getUserData()
})


async function getUserData(){
    const result = await userStore.getCurrentUser()
    if (result.success) {
        userData.value.username = result.data.username
        userData.value.email = result.data.email
        userData.value.date = result.data.date
    } else {
        await showErrorAlert('Error al obtener los datos del usuario')
    }
}

async function logoutUser() {
    loading.value = true
    //await userStore.logout(); todo ver porque esto no funciona y si es necesario
    await userStore.removeToken();
    await router.push({path: '/login'});
}


async function showSuccessAlert(message) {
    successMessage.value = message
    successAlert.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            successAlert.value = false;
            resolve();
        }, 3000);
    });
}

async function showErrorAlert(message) {
    errorMessage.value = message
    errorAlert.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            errorAlert.value = false;
            resolve();
        }, 5000);
    });
}

</script>

<style scoped>
.v-btn {
    color: #8efd00;
    background-color: #000000;
    margin-right: 10px;
    margin-top: 20px;
}
.logOut {
    color: #8efd00;
    background-color: #000000;
    margin-right: 10px;
    margin-left: 10px;
}
h1 {
    text-align: center;
    padding-top: 25px;
}
</style>
