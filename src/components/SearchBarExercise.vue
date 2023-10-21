<template>
    <v-text-field
        :loading="loading"
        density="compact"
        variant="outlined"
        label="Buscar ejercicio..."
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="openModal"
        @keydown.enter="openModal"
        v-model="searchQuery"
    ></v-text-field>

    <v-dialog v-model="showModal" persistent max-width="600">
        <v-card>
            <v-card-title>Resultados de búsqueda</v-card-title>
            <v-card-text>
                <v-row v-if="exercises.length > 0">
                    <v-col
                        v-for="(exercise, index) in exercises"
                        :key="index"
                        cols="12"
                    >
                        <v-card
                            class="exercise-card"
                            @click="selectExercise(exercise)"
                        >
                            <v-col cols="4">
                                <img
                                    class="image"
                                    :src="exercise.img"
                                    alt="Foto del Ejercicio"
                                    height="150"
                                />
                            </v-col>
                            <v-col cols="8">
                                <v-card-title class="text-h6">
                                    {{ exercise.name }}
                                </v-card-title>
                                <v-card-text>
                                    {{ exercise.detail }}
                                </v-card-text>
                            </v-col>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12">
                        <p>No se han encontrado resultados</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="cancelar"
                    class="cancelar"
                    @click="closeModal"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import {ref, inject} from 'vue'
import {useExerciseStore} from '@/stores/exerciseStore'
import { toRefs } from 'vue';

const loaded = ref(false)
const loading = ref(false)
const searchQuery = ref('')
const showModal = ref(false);
const exercises = ref([])
const exerciseStore = useExerciseStore()
const selectedExercise = inject('selectedExercise');

const props = defineProps({
    isRest : {
        type: Boolean,
        required: true
    },
});

const { isRest } = toRefs(props);

async function openModal() {
    loading.value = true;
    const result = await exerciseStore.getExercises()
    if (result.success) {
        const allExercises = result.data.content
        exercises.value = allExercises.filter(exercise => {
            if (isRest.value) {
                return exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && exercise.type === 'rest'
            } else {
                return exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && exercise.type !== 'rest'
            }
        })
        for (const exercise of exercises.value) {
            const result2 = await exerciseStore.getExerciseImage(exercise, 1);
            if (result2.success)
                exercise.img = result2.data.url;
        }
    }
    showModal.value = true;
    loading.value = false;
}

function closeModal() {
    showModal.value = false;
}

function selectExercise(exercise) {
    selectedExercise.value = exercise;
    closeModal();
}

</script>

<style scoped>
.v-text-field {
    color: #000000;
    padding-top: 15px;
    padding-bottom: 20px;
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

</style>

