<template>
    <div class="mx-auto mydiv">
        <h1 class="text-center">Mis Ejercicios</h1>
        <div class="mx-auto">
            <v-dialog width="500" class="mx-auto">
                <template v-slot:activator="{ props }">
                    <v-btn
                        class="nuevo-ejercicio"
                        v-bind="props"
                        text="Open Dialog"
                        style="margin: 0 auto; display: block;"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Crear Nuevo Ejercicio
                    </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card title="Crear Nuevo Ejercicio">
                        <v-card-text>
                            <v-text-field
                                label="Nombre del ejercicio"
                                v-model="newEjercicio.name"
                                maxlength="100"
                                counter
                                variant="outlined"
                            ></v-text-field>
                            <v-text-field
                                label="Descripción"
                                v-model="newEjercicio.detail"
                                maxlength="200"
                                counter
                                variant="outlined"
                            ></v-text-field>
                            <v-autocomplete density="compact" variant="outlined" label="Tipo" v-model="type"
                                            :items="['Ejercicio', 'Descanso']" default="Ejercicio"></v-autocomplete>
                            <v-text-field
                                label="Imagen"
                                v-model="newEjercicio.url"
                                variant="outlined"
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
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text="cancelar"
                                class="cancelar"
                                @click="
                                () => {
                                    isActive.value = false;
                                }
                            "
                            ></v-btn>
                            <v-btn
                                class="confirmar"
                                text="Confirmar"
                                @click="
                                async() => {
                                    if((await saveExercise()) === true)
                                        isActive.value = false;
                                }
                            "
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <div class="fondo">
            <v-row class="width" justify="start">
                <v-col v-for="exercise in myExercises">
                    <ExerciseDetail :exercise="exercise" :myExercises="myExercises" :myPage="true"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/userStore";
import {onBeforeMount} from "vue";
import ExerciseDetail from "@/components/ExerciseDetail.vue";
import {useExerciseStore} from "@/stores/exerciseStore";

const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

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

const exerciseStore = useExerciseStore();
const userStore = useUserStore();
const myExercises = ref([]);
const type = ref("Ejercicio");

const newEjercicio = ref({
    name: "",
    detail: "",
    url: 'https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg',
    type: "",
    number: 0,
    index: 0
});

onBeforeMount(async () => {
    const user = await userStore.getCurrentUser();
    if (user.success) {
        if (user.data.metadata.exercises) {
            myExercises.value = user.data.metadata.exercises;
        }

    }
});

async function updateMyExercises() {
    const user = await userStore.getCurrentUser();
    if (user.success) {
        if (user.data.metadata.exercises) {
            myExercises.value = user.data.metadata.exercises;
        }
    }
}

async function saveExercise() {
    if (type.value === 'Descanso')
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    if (newEjercicio.value.url === '')
        newEjercicio.value.url = 'https://th.bing.com/th/id/OIG.hUKUpOfOW_DIJ924Uky.?pid=ImgGn&w=1024&h=1024&rs=1'
    if (!newEjercicio.value.name) {
        await showErrorAlert('El nombre del ejercicio es obligatorio')
        return false
    } else if (!newEjercicio.value.detail) {
        newEjercicio.value.detail = ''
    } else if (!newEjercicio.value.url) {
        await showErrorAlert('Es obligatorio añadir una imagen al ejercicio mediante una url')
        return false
    } else if (!newEjercicio.value.type) {
        await showErrorAlert('El tipo del ejercicio es obligatorio')
        return false
    }
    for (let i = 0; i < myExercises.value.length; i++) {
        if (myExercises.value[i].name === newEjercicio.value.name) {
            await showErrorAlert('Ya existe un ejercicio con ese nombre')
            return false
        }
    }
    let result = await exerciseStore.addExercise(newEjercicio.value);
    if (result.success) {
        newEjercicio.value.index = result.data.id
        const user = await userStore.getCurrentUser()
        if (user.success) {
            if (!user.data.metadata)
                user.data.metadata = {}
            if (!user.data.metadata.exercises)
                user.data.metadata.exercises = []
            user.data.metadata.exercises.push(newEjercicio.value)
            await userStore.modifyCurrentUser(user.data.firstName, user.data.lastName, user.data.gender, user.data.metadata)
            myExercises.value = user.data.metadata.exercises;
        }
        result = await exerciseStore.addExerciseImage(result.data.id, newEjercicio.value)
        if (result.success) {
            newEjercicio.value = {
                name: '',
                detail: '',
                url: 'https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg',
                type: '',
                number: myExercises.value.length,
                index: 0
            }
        }
        return true
    } else {
        await showErrorAlert('Error al crear el ejercicio')
        return false
    }
    return true
}

</script>

<style scoped>
h1 {
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
}

.nuevo-ejercicio {
    background-color: #8efd00;
    color: #000000;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 50px;
}


.nombre-rutina {
    width: 400px;
    padding-left: 20px;
}

.o {
    padding-left: 25px;
    padding-top: 25px;
}

.confirmar {
    background-color: #8efd00;
    color: #000000;
    margin-right: 10px;
    margin-top: 20px;
}

.cancelar {
    background-color: #000000;
    color: #8efd00;
    margin-right: 10px;
    margin-top: 20px;
}

h2 {
    padding-left: 25px;
    padding-bottom: 35px;
}

.mydiv {
    margin-bottom: 50px;
}

.save {
    background-color: #8efd00;
    color: #000000;
    margin-top: 40px;
}

.fondo {
    background-color: lightgray;
    border-radius: 20px;
    margin: 30px;
    padding-right: 20px;
}
</style>

