<template>
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
</template>

<script setup>

import {ref} from "vue";

const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario logueado con éxito')
const errorMessage = ref('Error al loguear')

async function showSuccessAlert(message = 'Usuario registrado con éxito') {
    successMessage.value = message
    successAlert.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            successAlert.value = false;
            resolve();
        }, 3000);
    });
}

async function showErrorAlert(message = 'Error el registrar usuario') {
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

</style>
