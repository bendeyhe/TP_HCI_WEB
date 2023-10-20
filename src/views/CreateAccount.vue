<template>
    <AppBarWithoutSearch/>
    <h1>Crear Cuenta</h1>
    <div class="register-box">
        <v-card
            class="mx-auto pt-6
             pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Nombre</div>
            <v-text-field
                density="compact"
                placeholder="Ingresá tu nombre"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                v-model="firstName"
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Apellido</div>
            <v-text-field
                density="compact"
                placeholder="Ingresá tu apellido"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                v-model="lastName"
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Nombre de Usuario</div>
            <v-text-field
                density="compact"
                placeholder="Ingresá tu nombre de usuario"
                prepend-inner-icon="mdi-account-box"
                variant="outlined"
                v-model="username"
                :rules="[(v) => !!v || 'Campo requerido', (v) => v.length >= 4 || 'Debe tener al menos 4 caracteres']"
                required
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Contraseña</div>
            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Ingresá tu contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                v-model="password"
                @click:append-inner="visible = !visible"
                :rules="[(v) => !!v || 'Campo requerido', (v) => v.length >= 3 || 'Debe tener al menos 3 caracteres']"
                required
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Dirección de Email</div>
            <v-text-field
                density="compact"
                placeholder="Ingresá tu dirección de email"
                variant="outlined"
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
                :rules="[(v) => !!v || 'Campo requerido', (v) => /.+@.+\..+/.test(v) || 'Debe ser una dirección de correo válida']"
                required
                :disabled="loading"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Género</div>
            <v-select
                density="compact"
                variant="outlined"
                v-model="gender"
                :items="genderOptions"
                prepend-inner-icon="mdi-human-male-female"
                :disabled="loading"
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

            <RouterLink to="/login">
                <v-card-text class="text-center">
                    <a
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Ya tengo cuenta
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </RouterLink>

            <v-card-actions>
                <v-btn
                    variant="text"
                    @click="resetForm"
                    style="background-color: lightgray; border-color: #8efd00; color: #000000;"
                >
                    <v-icon>mdi-cancel</v-icon>
                    &nbsp;
                    Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="registrarse"
                    variant="text"
                    @click="register"
                >
                    <template v-if="loading">
                        <v-progress-circular
                            indeterminate
                            size="20"
                            color="white"
                        ></v-progress-circular>
                    </template>
                    <template v-else>
                        <v-icon>mdi-account-plus</v-icon>
                        &nbsp;
                        REGISTRARSE
                    </template>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue';
import {useRouter, useRoute, RouterLink} from 'vue-router'
import {useUserStore} from "@/stores/userStore";
import AppBarWithoutSearch from "@/components/AppBarWithoutSearch.vue";


const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const username = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const email = ref('')
const genderOptions = ['Masculino', 'Femenino', 'Otro'];
const genderOptionsEnglish = ['male', 'female', 'other'];
const gender = ref('');
const genderEnglish = ref('');
const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('Usuario registrado con éxito')
const errorMessage = ref('Error al registrar usuario')
const formErrors = ref([])
const loading = ref(false);

const validateForm = () => {
    formErrors.value = [];
    if (!username.value || username.value.length < 4)
        formErrors.value.push('El nombre de usuario es obligatorio y debe tener al menos 4 caracteres.\n');
    if (!password.value || password.value.length < 3)
        formErrors.value.push('La contraseña es obligatorio y debe tener al menos 3 caracteres.\n');
    if (!email.value || !/.+@.+\..+/.test(email.value))
        formErrors.value.push('La dirección de correo debe ser válida.\n');
};

async function register() {
    validateForm();
    let result;
    try {
        if (formErrors.value.length > 0) {
            const error = formErrors.value.join('');
            await showErrorAlert(error);
        } else {
            loading.value = true;
            convertToEnglishGender()
            result = await userStore.register(username.value, password.value, email.value, firstName.value, lastName.value, genderEnglish.value);
            if (result.success) {
                userStore.setToken(result.token);
                userStore.setMail(email.value);
                //await showSuccessAlert('Su usuario fue registrado con éxito y en casilla de' +
                //    ' email: ' + email.value + ' recibirá un mensaje para verificar su cuenta.');
                await router.push({path: '/validate', query: {email: email.value, username: username.value}})
            } else {
                loading.value = false;
                if (result.details[0].includes('email') && result.details[0].includes('validation'))
                    await showErrorAlert('La dirección de correo debe ser válida.');
                else if (result.details[0].includes('username'))
                    await showErrorAlert('Ya hay un usuario registrado con el nombre: ' + username.value);
                else if (result.details[0].includes('email'))
                    await showErrorAlert('Ya hay un usuario registrado con el email: ' + email.value);
                else
                    await showErrorAlert('Error en el registro: ' + result.error);
            }
        }
    } finally {
        loading.value = false;
    }
}

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


function resetForm() {
    username.value = ''
    password.value = ''
    email.value = ''
    firstName.value = ''
    lastName.value = ''
    gender.value = ''
}

function convertToEnglishGender() {
    const index = genderOptions.indexOf(gender.value);
    if (index !== -1) {
        genderEnglish.value = genderOptionsEnglish[index];
    }
}


</script>

<script>
export default {
    data: () => ({
        visible: false,
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre & Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        errorMessages: '',
        name: null,
        email: null,
        pwd: null,
    }),
}
</script>

<style scoped>
.registrarse {
    color: #8efd00;
    background-color: #000000;
    margin-right: 10px;
    margin-left: 10px;
}

h1 {
    text-align: center;
    padding-top: 25px;
}

.register-box {
    padding-top: 2%;
}

</style>
