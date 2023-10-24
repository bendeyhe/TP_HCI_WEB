<template>
    <v-card class="ml-8 my-2" width="280" height="510">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

        <div v-if="exercise?.name !== ''">
            <img
                class="image"
                :src="exercise?.url"
                alt="Foto del Ejercicio"
                height="175"
            />
            <v-card-text class="titulo"> {{ exercise?.name }}</v-card-text>
            <div class="font-weight-bold tipo-ej">Tipo de Ejercicio: {{ typeToSpanish(exercise?.type) }}</div>

            <v-card-text>
                <v-row allign="center" class="mx-0"></v-row>
                <div class="overflow2" v-if="myPage == true">{{ exercise?.detail }}</div>
                <div class="overflow" v-else>{{ exercise?.detail }}</div>
            </v-card-text>
        </div>
        <div v-else>
            <v-card-text
            >Seleccione o cree un ejercicio para agregar a la
                rutina
            </v-card-text
            >
        </div>
        <div class="actions">
            <v-card-actions v-if="myPage == true" class="actions">
                <v-btn class="trashbtn" @click="openConfirmDeleteDialog" prepend-icon="mdi-trash-can"
                >Eliminar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="editar" @click="openEditDialog" v-bind="props" prepend-icon="mdi-pencil"
                >Editar
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>

    <v-dialog width="475" class="mx-auto" v-model="confirmDelete">
        <template v-slot:activator="{ props }">

        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title>¿Está seguro/a que desea eliminar el ejercicio?</v-card-title>
                <v-card-text>Esta operación no se puede deshacer.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="cancelar"
                        class="cancelar"
                        prepend-icon="mdi-close"
                        @click="
                                        () => {
                                            isActive.value = false;
                                        }
                                    "
                    ></v-btn>
                    <v-btn
                        class="confirmar"
                        text="Confirmar"
                        newEjercicio.index="exercise.index"
                        prepend-icon="mdi-check"
                        @click="
                                        () => {
                                            isActive.value = false;
                                            deleteExercise(exercise);
                                        }
                                    "
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>


    <v-dialog width="500" class="mx-auto" v-model="editDialog">
        <template v-slot:activator="{ props }">

        </template>
        <template v-slot:default="{ isActive }">
            <v-card title="Editar Ejercicio">
                <v-card-text>
                    <v-text-field
                        label="Nombre del ejercicio"
                        v-model="newEjercicio.name"
                        maxlength="100"
                        variant="outlined"
                        counter
                    ></v-text-field>
                    <v-text-field
                        label="Descripción"
                        v-model="newEjercicio.detail"
                        maxlength="200"
                        variant="outlined"
                        counter
                    ></v-text-field>
                    <v-autocomplete
                        density="compact"
                        variant="outlined"
                        label="Tipo de ejercicio"
                        v-model="newEjercicio.type"
                        :items="['Ejercicio', 'Descanso']"
                        default="Ejercicio"
                    ></v-autocomplete>

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
                        newEjercicio.index="exercise.index"
                        @click="async () => {
                            isActive.value=(await editExercise(exercise))!==true;
                        }"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import {toRefs} from "vue";
import {useExerciseStore} from "@/stores/exerciseStore";
import {useUserStore} from "@/stores/userStore";
import {ref, defineProps} from "vue";

const newEjercicio = ref({
    name: "",
    detail: "",
    url: "",
    type: "",
    index: 0
});

const exerciseStore = useExerciseStore();
const userStore = useUserStore();
const editDialog = ref(false);
const confirmDelete = ref(false);
const props = defineProps({
    exercise: {
        type: Object,
        required: true,
    },

    myExercises: {
        type: Array,
        required: true,
    },
    myPage: {
        type: Boolean,
        required: false,
    }
});

const {myExercises} = toRefs(props);
const {exercise} = toRefs(props);
const {myPage} = toRefs(props);

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

function typeToSpanish(type){
    if(type === 'rest')
        return 'Descanso'
    else
        return 'Ejercicio'
}

async function deleteExercise(exercise) {
    const index = myExercises.value.findIndex(e => e === exercise);
    if (index !== -1) {
        const result = await exerciseStore.deleteExercise(exercise.index);
        if (result) {
            const user = await userStore.getCurrentUser();
            if (user) {
                user.data.metadata.exercises.splice(index, 1);
                myExercises.value.splice(index, 1);
                for (let i = index; i < user.data.metadata.exercises.length; i++) {
                    if (user.data.metadata.exercises[i].number > 0)
                        user.data.metadata.exercises[i].number--;
                    if (myExercises.value[i].number > 0)
                        myExercises.value[i].number--;
                }
                await userStore.modifyCurrentUser(
                    user.data.firstName,
                    user.data.lastName,
                    user.data.gender,
                    user.data.metadata
                );
            }
        }
    }
}

async function editExercise(exercise) {
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
    if (newEjercicio.value.type === 'Descanso')
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    const result = await exerciseStore.getExercise(exercise.index);
    if (result.success) {
        const name = exercise.name;
        const exerciseToUpdate = myExercises.value.find(e => e.name === exercise.name);
        if (exerciseToUpdate) {
            // Valida que el nuevo nombre no sea igual al nombre de otro ejercicio existente
            const newName = newEjercicio.value.name.trim(); // Elimina espacios en blanco al principio y al final
            if (newName !== "" && (newName === name || !myExercises.value.some(e => e.name === newName))) {
                exerciseToUpdate.name = newName;
                exerciseToUpdate.detail = newEjercicio.value.detail;
                if (newEjercicio.value.url.length > 0)
                    exerciseToUpdate.url = newEjercicio.value.url;
                if (newEjercicio.value.type !== "")
                    exerciseToUpdate.type = newEjercicio.value.type;
                const result2 = await exerciseStore.changeExercise(exerciseToUpdate);
                if (result2.success) {
                    const user = await userStore.getCurrentUser();
                    if (!user.success) {
                        await showErrorAlert('Error al editar el ejercicio')
                        return false
                    }
                    const index = user.data.metadata.exercises.findIndex(e => e.index === exercise.index);
                    user.data.metadata.exercises[index] = exerciseToUpdate;
                    const result3 = await userStore.modifyCurrentUser(user.data.firstName, user.data.lastName, user.data.gender, user.data.metadata);
                    if (!result3.success) {
                        await showErrorAlert('Error al editar el ejercicio')
                        return false
                    }
                } else {
                    await showErrorAlert('Error al editar el ejercicio')
                    return false
                }
            }
        } else {
            await showErrorAlert('Error al editar el ejercicio')
            return false
        }
    } else {
        await showErrorAlert('Error al editar el ejercicio')
        return false
    }
    return true
}

async function openEditDialog() {
    newEjercicio.value = {...exercise.value};
    if (newEjercicio.value.type === 'rest')
        newEjercicio.value.type = 'Descanso'
    else
        newEjercicio.value.type = 'Ejercicio'
    editDialog.value = true;
}

async function openConfirmDeleteDialog() {
    confirmDelete.value = true;
}
</script>

<style scoped>
.titulo {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;
}

.tipo-ej {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 10px;
    padding-left:15px;
    padding-right:15px;
    width: 100%;
}

.overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.overflow2 {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 7; /* number of lines to show */
    -webkit-box-orient: vertical;
}

.image {
    width: 100%;
}

.actions {
    display: flex;
    align-items: flex-end;
    /*quiero que los botones aparezcan en lo mas bajo de la card */
    bottom: 0;
}

.editar {
    color: #000000;
    background-color: #8efd00;
    margin: 0 5px;
    font-weight: bold;
}

.trashbtn {

}

.trashbtn:hover {
    background-color: rgba(255, 0, 0, 0.4);

}

.actions {
    width: 100%;
    position: absolute;
    bottom: 1%;
    text-align: center;
}
</style>

