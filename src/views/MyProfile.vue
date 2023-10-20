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

            <div class="text-subtitle-1 text-medium-emphasis">Nombre</div>
            <v-text-field
                density="compact"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                v-model="userData.firstName"
                :disabled="!isEditing || loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Apellido</div>
            <v-text-field
                density="compact"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                v-model="userData.lastName"
                :disabled="!isEditing || loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Nombre de usuario</div>
            <v-text-field
                density="compact"
                prepend-inner-icon="mdi-account-box"
                variant="outlined"
                v-model="userData.username"
                :disabled="true"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
            <v-text-field
                density="compact"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="userData.email"
                :disabled="true"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Género</div>
            <v-select
                density="compact"
                variant="outlined"
                v-model="userData.gender"
                :items="genderOptions"
                prepend-inner-icon="mdi-human-male-female"
                :disabled="!isEditing || loading"
            ></v-select>

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

            <v-card-actions>
                <v-btn
                    variant="tonal"
                    @click="isEditing ? cancelEdit() : editProfile()"
                    class="ml-auto"
                    style="background-color: lightgray; border-color: #8efd00; color: #000000;"
                >
                    <template v-if="loading">
                        <v-progress-circular
                            indeterminate
                            size="20"
                            color="white"
                        ></v-progress-circular>

                    </template>
                    <template v-else>
                        <v-icon>
                            {{ isEditing ? 'mdi-cancel' : 'mdi-pencil' }}
                        </v-icon>
                        &nbsp;
                        {{ isEditing ? 'Cancelar' : 'Editar Perfil' }}
                    </template>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    variant="tonal"
                    @click="isEditing ? saveProfile() : logoutUser()"
                    class="mr-0"
                >
                    <template v-if="loading">
                        <v-progress-circular
                            indeterminate
                            size="20"
                            color="white"
                        ></v-progress-circular>
                    </template>
                    <template v-else>
                        <v-icon>
                            {{ isEditing ? 'mdi-content-save' : 'mdi-logout' }}
                        </v-icon>
                        &nbsp;
                        {{ isEditing ? 'Guardar' : 'Cerrar Sesión' }}
                    </template>
                </v-btn>
            </v-card-actions>
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
const loading = ref(false)
const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario logueado con éxito')
const errorMessage = ref('Error al loguear')
const isEditing = ref(false)
const genderOptions = ['Masculino', 'Femenino', 'Otro'];
const genderOptionsEnglish = ['male', 'female', 'other'];
const genderEnglish = ref('')

const userData = ref({
    username: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: ''
})

onBeforeMount(async () => {
    await getUserData()
})


async function getUserData() {
    loading.value = true;
    const result = await userStore.getCurrentUser()
    if (result.success) {
        userData.value.username = result.data.username
        userData.value.email = result.data.email
        const index = genderOptionsEnglish.indexOf(result.data.gender);
        if (index !== -1) {
            userData.value.gender = genderOptions[index];
        }
        userData.value.firstName = result.data.firstName
        userData.value.lastName = result.data.lastName
    } else {
        await showErrorAlert('Error al obtener los datos del usuario')
    }
    loading.value = false;
}

async function logoutUser() {
    loading.value = true
    //await userStore.logout(); todo ver porque esto no funciona y si es necesario
    await userStore.removeToken();
    await router.push({path: '/login'});
}

async function editProfile() {
    isEditing.value = true;
}

async function saveProfile() {
    isEditing.value = false;
    convertToEnglishGender()
    const result = await userStore.modifyCurrentUser(userData.value.firstName, userData.value.lastName, genderEnglish.value);
    await getUserData()
    if (result.success) {
        await showSuccessAlert('Usuario actualizado con éxito')
    } else {
        await showErrorAlert('Error al actualizar el usuario')
    }
}

async function cancelEdit() {
    await getUserData()
    isEditing.value = false;
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

function convertToEnglishGender() {
    const index = genderOptions.indexOf(userData.value.gender);
    if (index !== -1) {
        genderEnglish.value = genderOptionsEnglish[index];
    }
}

</script>

<style scoped>
.v-btn {
    color: #8efd00;
    background-color: #000000;
}

h1 {
    text-align: center;
    padding-top: 25px;
}
</style>
