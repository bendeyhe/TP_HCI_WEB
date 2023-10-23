<template>
    <v-card class="mx-auto my-12" width="280" height="450">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

        <div v-if="exercise.name !== ''">
            <img
                class="image"
                :src="exercise.url"
                alt="Foto del Ejercicio"
                height="175"
            />
            <v-card-text class="titulo"> {{ exercise.name }}</v-card-text>
            <v-card-text>
                <v-row allign="center" class="mx-0"> </v-row>
                <div class="overflow">{{ exercise.detail }}</div>
            </v-card-text>
        </div>
        <div v-else>
            <v-card-text
                >Seleccione o cree un ejercicio para agregar a la
                rutina</v-card-text
            >
        </div>
        <v-card-actions v-if="myPage == true" class="actions">
            <v-dialog width="500" class="mx-auto">
                <template v-slot:activator="{ props }">
                    <v-btn class="actions-btn" @click="showDialog = true" v-bind="props"
                >Editar</v-btn>
            </template>
                <template v-slot:default="{ isActive }">
                    <v-card title="Editar Ejercicio">
                        <v-card-text>
                            <v-text-field
                                label="Nombre del ejercicio"
                                v-model="newEjercicio.name"
                                maxlength="100"
                                counter
                            ></v-text-field>
                            <v-text-field
                                label="Descripción"
                                v-model="newEjercicio.detail"
                                maxlength="200"
                                counter
                            ></v-text-field>
                            <v-autocomplete
                                density="compact"
                                variant="outlined"
                                label="Tipo"
                                v-model="type"
                                :items="['Ejercicio', 'Descanso']"
                                default="Ejercicio"
                            ></v-autocomplete>

                            <v-text-field
                                label="Imagen"
                                v-model="newEjercicio.url"
                            ></v-text-field>

                            <!-- agregar alerta string maximo 274-->
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
                                @click="
                                    () => {
                                        isActive.value = false;
                                        editExercise(exercise);
                                    }
                                "
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        
            
                    <v-btn class="actions-btn" @click="deleteExercise(exercise)"
                        >Eliminar</v-btn
                    >
                
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { toRefs } from "vue";
import { useExerciseStore } from "@/stores/exerciseStore";
import { useUserStore } from "@/stores/userStore";
import { ref, defineProps } from "vue";

const newEjercicio = ref({
    name: "",
    detail: "",
    url: "",
    type: "",
    index: 0
});

const exerciseStore = useExerciseStore();
const userStore = useUserStore();
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

const { myExercises } = toRefs(props);
const { exercise } = toRefs(props);
const { myPage } = toRefs(props);

async function deleteExercise(exercise) {
    debugger;
    const result = await exerciseStore.deleteExercise(exercise.index);
    if (result) {
        const user = await userStore.getCurrentUser();
        if (user) {
            user.data.metadata.exercises.splice(exercise.number, 1);
            myExercises.value.splice(exercise.number, 1);
            for (let i=exercise.number; i<user.data.metadata.exercises.length; i++){
                if (user.data.metadata.exercises[i].number > 0)
                    user.data.metadata.exercises[i].number--;
                if (myExercises.value[i].number > 0)
                    myExercises.value[i].number--;
            }
            await userStore.modifyCurrentUser(
                user.data.fistName,
                user.data.lastName,
                user.data.gender,
                user.data.metadata
            );
        }
    }
}

async function editExercise(exercise) {
    debugger
    const result = await exerciseStore.getExercise(exercise.index);
    if (result) {
        if(newEjercicio.value.name != "")
            result.data.name = newEjercicio.value.name;
        if(newEjercicio.value.detail != "")
            result.data.detail = newEjercicio.value.detail;
        if(newEjercicio.value.url.length > 0)
            result.data.url = newEjercicio.value.url;
        if(newEjercicio.value.type != "")
            result.data.type = newEjercicio.value.type;
        const result2 = await exerciseStore.changeExercise(result.data);
        if (result2){
            myExercises.value[exercise.number] = result.data;
            const user = await userStore.getCurrentUser();
            user.data.metadata.exercises[exercise.number] = result.data;
            const aux= await userStore.modifyCurrentUser(user.data.firstName, user.data.lastName, user.data.gender, user.data.metadata);
            debugger

        }
    }
    //const result = await exerciseStore.changeExercise(exercise);

}
</script>

<style scoped>
.titulo {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;
}

.overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
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

.actions-btn {
    color: #000000;
    background-color: #8efd00;
    margin: 0 5px;
    font-weight: bold;
}
</style>

