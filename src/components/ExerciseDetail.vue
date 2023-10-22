<template>
    <v-card
        class="mx-auto my-12"
        width="280"
        height="450"
    >
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
                <v-row allign="center" class="mx-0">

                </v-row>
                <div class="overflow"> {{ exercise.detail }}</div>
            </v-card-text>
        </div>
        <div v-else>
            <v-card-text>Seleccione o cree un ejercicio para agregar a la rutina</v-card-text>
        </div>
        <v-card-actions class="actions">
                    <v-btn class="actions-btn" @click="editExercise(exercise)">Editar</v-btn>
                    <v-btn class="actions-btn" @click="deleteExercise(exercise)">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { toRefs } from 'vue';
import { useExerciseStore } from '@/stores/exerciseStore';
import {useUserStore} from '@/stores/userStore';

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
    }
});

const {myExercises} = toRefs(props);
const { exercise } = toRefs(props);

async function deleteExercise(exercise) {
    const result = await exerciseStore.deleteExercise(exercise.index);
    if (result) {
        exercise.value = {}
        const user = await userStore.getCurrentUser();
        debugger
        if (user) {
            user.data.metadata.exercises.splice(exercise.index-1, 1);
            myExercises.value.splice(exercise.index-1, 1);
            const result = await userStore.modifyCurrentUser(user.data.fistName, user.data.lastName, user.data.gender, user.data.metadata);
        }
    }
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
    width: 100%
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

