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

    <v-dialog v-model="showModal" max-width="600">
        <v-card>
            <v-card-title>Resultados de búsqueda</v-card-title>
            <v-card-text>
                <v-row v-if="exercises.length > 0">
                    <v-col
                        v-for="(exercise, index) in exercises"
                        :key="index"
                    >
                        <v-card
                            class="exercise-card"
                            @click="selectExercise(exercise)"
                        >
                            <v-row>
                                <v-col cols="6">
                                    <img
                                        class="image"
                                        :src="exercise.img"
                                        alt="Foto del Ejercicio"
                                        height="150"
                                    />
                                </v-col>
                                <v-col cols="6">
                                        <v-card-text class="titulo">
                                            {{ exercise.name }}
                                        </v-card-text>


                                    <div v-if="exercise.detail.length > 100">
                                        <v-card-actions>
                                            <v-btn
                                                color="secondary"
                                                variant="text"
                                                :append-icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                                @click="$event.stopPropagation(); show[index] = !show[index]"
                                            >
                                                Ver Detalle
                                            </v-btn>

                                            <v-spacer></v-spacer>

                                        </v-card-actions>

                                        <v-expand-transition>
                                            <div v-show="show[index]">
                                                <v-divider></v-divider>

                                                <v-card-text class="detalle">
                                                    {{ exercise.detail }}
                                                </v-card-text>
                                            </div>
                                        </v-expand-transition>
                                    </div>
                                    <div v-else>
                                        <v-card-text class="detalle">
                                            {{ exercise.detail }}
                                        </v-card-text>
                                    </div>

                                </v-col>
                            </v-row>
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

// Crear una matriz show para controlar cada tarjeta
const show = ref([])

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

        // Inicializa la matriz show con valores falsos para cada tarjeta
        show.value = new Array(exercises.value.length).fill(false)


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

<script>
export default {
    data: () => ({
        show: false,
    }),
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

.image {
    padding: 10px;

}

.titulo {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;

}

.detalle {
    padding-top: 5px;
}

</style>

