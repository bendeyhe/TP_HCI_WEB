<template>
    <AppBarWithoutSearch/>
    <h1>Validación de Mail</h1>
    <div class="login-box">
        <v-card
            class="mx-auto pt-6 pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Mail</div>

            <v-text-field
                density="compact"
                placeholder="Ingresá tu mail"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="email"
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Código de verificación</div>

            <v-text-field
                density="compact"
                placeholder="Ingresá el código"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                v-model="code"
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
                @click="validate"
            >
                <template v-if="loading">
                    <v-progress-circular
                        indeterminate
                        size="20"
                        color="white"
                    ></v-progress-circular>
                </template>
                <template v-else>
                    VALIDAR
                </template>
            </v-btn>
        </v-card>
    </div>


</template>


<script setup>
import {onBeforeMount, ref} from 'vue';
import {useRouter, useRoute, RouterLink} from 'vue-router'
import {useUserStore} from '@/stores/userStore'
import AppBar from '@/components/AppBar.vue'
import AppBarWithoutSearch from "@/components/AppBarWithoutSearch.vue";

const userStore = useUserStore()

const email = ref('')
const code = ref('')
const route = useRoute()
const router = useRouter()
const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario logueado con éxito')
const errorMessage = ref('Error al loguear')
const formErrors = ref([])
const loading = ref(false);

const validateForm = () => {
    formErrors.value = [];
    if (!email.value)
        formErrors.value.push('El mail es obligatorio.');
    if (!code.value)
        formErrors.value.push('El código es obligatorio.');
};

async function validate() {
    validateForm();
    if (formErrors.value.length > 0) {
        const error = formErrors.value.join('');
        await showErrorAlert(error);
        loading.value = false;
    } else {
        loading.value = true;
        const result = await userStore.verify_email(email.value, code.value);
        if (result.status !== 200) {
            loading.value = false;
            await showErrorAlert('El código ingresado es incorrecto.');
        } else {
            await showSuccessAlert('Su mail fue validado con éxito.');
            await router.push({path: '/login'})
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
        }, 5000);
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
