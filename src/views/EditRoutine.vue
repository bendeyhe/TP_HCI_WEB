<template>
    <h1 v-if="isEditing">Editar Rutina</h1>
    <h1 v-else>Crear Rutina</h1>
    <div class="gris">
        <v-row>
            <v-col>
                <v-btn prepend-icon="mdi-content-save" class="save" @click="openFinishDialog"> Finalizar</v-btn>
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
            </v-col>
        </v-row>
    </div>

    <v-card>
        <v-tabs
            v-model="type"
            color="primary"
            bg-color="secondary"
            align-tabs="center"
            grow="true"
            @click="resetEjSeleccionado()"
        >
            <v-tab :value="1">Entrada en Calor</v-tab>
            <v-tab :value="2">Principal</v-tab>
            <v-tab :value="3">Enfriamiento</v-tab>
        </v-tabs>
        <v-window v-model="type">
            <v-window-item
                v-for="n in 3"
                :key="n"
                :value="n"
            >
                <v-container fluid class="contenedor">
                    <v-row>
                        <v-col cols="8">
                            <div>
                                <v-row v-if="n===2">
                                    <v-col><h3> Número de ciclo: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        :items="cantCiclosPrincipal"
                                                        v-model="cicloSeleccionado"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-btn prepend-icon="mdi-plus" class="agregar-principal" @click="addCycle">
                                            Agregar ciclo principal
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row v-if="n===1">
                                    <v-col><h3> Cantidad de repeticiones del ciclo: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="repCicloEntCalor"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row v-if="n===2">
                                    <v-col><h3> Cantidad de repeticiones del ciclo: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="repCicloPrincipal[cicloSeleccionado]"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row v-if="n===3">
                                    <v-col><h3> Cantidad de repeticiones del ciclo: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="repCicloEnfriamiento"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                            </div>
                            <v-row>
                                <v-col>
                                    <SearchBarExercise @exercise-selected="ejercicioSeleccionado"
                                                       :exercises-to-search="exercisesSearchRest" v-if="n===3"/>
                                    <SearchBarExercise @exercise-selected="ejercicioSeleccionado"
                                                       :exercises-to-search="exercisesSearchEx" v-else/>
                                </v-col>
                                <v-col cols="1"><h3 class="o"> ó </h3></v-col>
                                <v-col>
                                    <v-dialog width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn class="nuevo-ejercicio" prepend-icon="mdi-pencil" v-bind="props"
                                                   text="Open Dialog"> Crear Nuevo Ejercicio
                                            </v-btn>
                                        </template>
                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Crear Nuevo Ejercicio">
                                                <v-card-text>
                                                    <v-text-field
                                                        label="Nombre del ejercicio"
                                                        v-model="newEjercicio.name"
                                                        maxlength="100"
                                                        variant="outlined"
                                                        :rules="[(v) => !!v || 'Campo requerido']"
                                                        required
                                                        counter
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Descripción"
                                                        v-model="newEjercicio.detail"
                                                        maxlength="200"
                                                        variant="outlined"
                                                        counter
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Imagen"
                                                        v-model="newEjercicio.url"
                                                        maxlength="200"
                                                        counter
                                                        variant="outlined"
                                                    ></v-text-field>

                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>

                                                    <v-btn
                                                        text="cancelar"
                                                        class="cancelar"
                                                        @click="() => { isActive.value = false; }"
                                                    ></v-btn>
                                                    <v-btn
                                                        class="confirmar"
                                                        text="Confirmar"
                                                        @click=" async () => { isActive.value = await saveExercise()  }"
                                                    ></v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-col>
                            </v-row>

                            <div v-if="n===1">
                                <v-row>
                                    <v-col><h3> Cantidad de series: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEntCalor.cantSeries"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Duración (repeticiones o tiempo): </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEntCalor.duracion"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-model="dataEntCalor.typeDuracion"
                                                        :items="['repeticiones', 'segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Tiempo de descanso: </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEntCalor.descanso"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-model="dataEntCalor.typeDescanso"
                                                        :items="['segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </div>

                            <div v-if="n===2">
                                <v-row>
                                    <v-col><h3> Cantidad de series: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-if="dataPrincipal[cicloSeleccionado][0]"
                                                        v-model="dataPrincipal[cicloSeleccionado][0].cantSeries"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Duración (repeticiones o tiempo): </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-if="dataPrincipal[cicloSeleccionado][0]"
                                                        v-model="dataPrincipal[cicloSeleccionado][0].duracion"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-if="dataPrincipal[cicloSeleccionado][0]"
                                                        v-model="dataPrincipal[cicloSeleccionado][0].typeDuracion"
                                                        :items="['repeticiones', 'segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Tiempo de descanso: </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-if="dataPrincipal[cicloSeleccionado][0]"
                                                        v-model="dataPrincipal[cicloSeleccionado][0].descanso"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-if="dataPrincipal[cicloSeleccionado][0]"
                                                        v-model="dataPrincipal[cicloSeleccionado][0].typeDescanso"
                                                        :items="['segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </div>

                            <div v-if="n===3">
                                <v-row>
                                    <v-col><h3> Cantidad de series: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEnf.cantSeries"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Duración (repeticiones o tiempo): </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEnf.duracion"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-model="dataEnf.typeDuracion"
                                                        :items="['repeticiones', 'segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Tiempo de descanso: </h3></v-col>
                                    <v-col cols="2">
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        v-model="dataEnf.descanso"
                                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]"></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                        v-model="dataEnf.typeDescanso"
                                                        :items="['segundos', 'minutos']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </div>

                            <v-alert
                                v-if="successAlert2"
                                color="success"
                                icon="$success"
                                :text=successMessage
                            ></v-alert>
                            <v-alert
                                v-if="errorAlert2"
                                color="error"
                                icon="$error"
                                :text=errorMessage
                            ></v-alert>

                            <v-row>
                                <v-btn v-if="n===1" class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio">
                                    Agregar Ejercicio a Entrada en Calor
                                </v-btn>
                                <v-btn v-else-if="n===2" class="boton" prepend-icon="mdi-plus"
                                       @click="agregarEjercicio">
                                    Agregar Ejercicio a Principal
                                </v-btn>
                                <v-btn v-else class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio">
                                    Agregar Ejercicio a Enfriamiento
                                </v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <ExerciseDetail :exercise="ejercicioSeleccionado" :myExercises="myExercises"/>
                        </v-col>
                        <v-row v-if="n===1">   <!-- ExerciseDetailMini para Entrada en Calor -->
                            <h2 v-if="ejEntCalor.length > 0">Entrada en calor:</h2>
                            <div v-for="ej in ejEntCalor" :key="'entrada-calor-' + n">
                                <ExerciseDetailMini :exercise="ej" :ejArray="ejEntCalor"/>
                            </div>
                        </v-row>
                        <v-row v-else-if="n===2">
                            <!-- ExerciseDetailMini para Principal -->
                            <h2 class="principal" v-if="ejPrincipal[cicloSeleccionado]?.length > 0">Principal
                                {{ cicloSeleccionado }}:</h2>
                            <div v-for="ej in ejPrincipal[cicloSeleccionado]" :key="'principal-' + n">
                                <ExerciseDetailMini :exercise="ej" :ejArray="ejPrincipal[cicloSeleccionado]"/>
                            </div>
                        </v-row>
                        <v-row v-else>
                            <!-- ExerciseDetailMini para Enfriamiento -->
                            <h2 v-if="ejEnfriamiento.length > 0">Enfriamiento:</h2>
                            <div v-for="ej in ejEnfriamiento" :key="'enfriamiento-' + n">
                                <ExerciseDetailMini :exercise="ej" :ejArray="ejEnfriamiento"/>
                            </div>
                        </v-row>
                    </v-row>
                </v-container>
            </v-window-item>
        </v-window>
    </v-card>

    <v-dialog v-model="finishRoutine" min-width="800">
        <div>
            <v-card
                class="mx-auto pa-6 pt-6 pb-8"
                elevation="8"
                max-width="448"
                rounded="lg"
            >
                <div class="text-subtitle-1">Nombre de la rutina</div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="routine.name"
                    maxlength="100"
                    counter
                ></v-text-field>

                <div class="text-subtitle-1">Descripción de la rutina</div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="routine.description"
                    maxlength="200"
                    counter
                ></v-text-field>

                <div class="text-subtitle-1">Dificultad de la rutina</div>

                <v-autocomplete density="compact" default="1" variant="outlined" v-model="routine.difficulty"
                                :items="['principiante', 'amateur', 'intermedio', 'avanzado', 'experto']"></v-autocomplete>

                <v-text-field label="Imagen" v-model="routine.img" variant="outlined"></v-text-field>

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
                        variant="text"
                        @click="resetForm()"
                        class="cancelar"
                    >
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="confirmar"
                        variant="text"
                        @click="addRoutine"
                    >
                        <template v-if="loading">
                            <v-progress-circular
                                indeterminate
                                size="20"
                                color="white"
                                @click.stop
                            ></v-progress-circular>
                        </template>
                        <template v-else>
                            Guardar rutina
                        </template>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</template>

<script setup>
import SearchBarExercise from "@/components/SearchBarExercise.vue";
import ExerciseDetail from "@/components/ExerciseDetail.vue";
import {ref, provide, onBeforeMount} from 'vue';
import ExerciseDetailMini from "@/components/ExerciseDetailMini.vue";
import {useExerciseStore} from '@/stores/exerciseStore'
import {RouterLink, useRoute} from "vue-router";
import {useRoutineStore} from "@/stores/routineStore";
import {useCycleStore} from "@/stores/cycleStore";
import {useUserStore} from "@/stores/userStore";
import router from "@/router";
import {useCategoryStore} from "@/stores/categoryStore";

const successAlert = ref(false)
const errorAlert = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const successAlert2 = ref(false)
const errorAlert2 = ref(false)


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

async function showSuccessAlert2(message = 'Usuario registrado con éxito') {
    successMessage.value = message
    successAlert2.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            successAlert2.value = false;
            resolve();
        }, 3000);
    });
}

async function showErrorAlert2(message = 'Error el registrar usuario') {
    errorMessage.value = message
    errorAlert2.value = true

    await new Promise(resolve => {
        setTimeout(() => {
            errorAlert2.value = false;
            resolve();
        }, 5000);
    });
}

const myExercises = ref([])
const userStore = useUserStore()
const exerciseStore = useExerciseStore()
const routineStore = useRoutineStore()
const categoryStore = useCategoryStore()
const cycleStore = useCycleStore()
const routine = ref({});
const type = ref(1);
const ejEntCalor = ref([]);
const ejPrincipal = ref([]);
const ejEnfriamiento = ref([]);
const route = useRoute();
const cicloEntCalor = ref({});
const ciclosPrincipal = ref([]);
const cantCiclosPrincipal = ref([]);
const cicloEnfriamiento = ref({});
const finishRoutine = ref(false);
const cicloSeleccionado = ref(1);
const ejDescanso = ref({
    name: 'Descanso',
    detail: 'Descanso',
    url: '',
    type: 'rest',
    number: 0,
    index: 0
});
const newEjercicio = ref({
    name: '',
    detail: '',
    url: '',
    type: '',
    number: 0,
    index: 0
});
const ejercicioSeleccionado = ref({
    name: '',
    detail: '',
    url: '',
    type: '',
    number: 0,
    index: 0
});
const isEditing = ref(false);
const dataEntCalor = ref({
    cantSeries: 1,
    duracion: 10,
    typeDuracion: 'segundos',
    descanso: 10,
    typeDescanso: 'segundos'
})
const dataPrincipal = ref([])
const dataEnf = ref({
    cantSeries: 1,
    duracion: 10,
    typeDuracion: 'segundos',
    descanso: 10,
    typeDescanso: 'segundos'
})
const repCicloEntCalor = ref(1)
const repCicloPrincipal = ref([])
const repCicloEnfriamiento = ref(1)
const loading = ref(false)
const exercisesSearchRest = ref([])
const exercisesSearchEx = ref([])

provide('selectedExercise', ejercicioSeleccionado);

onBeforeMount(async () => {
    const result = await exerciseStore.getExercises()
    if (result.success) {
        for (let i = 0; i < result.data.totalCount; i++) {
            if (result.data.content[i].type === 'exercise')
                exercisesSearchEx.value.push(result.data.content[i])
            else
                exercisesSearchRest.value.push(result.data.content[i])
        }
        for (let i = 0; i < exercisesSearchRest.value.length; i++) {
            const result2 = await exerciseStore.getExerciseImages(exercisesSearchRest.value[i].id);
            if (result2.success && result2.data.content.length > 0 && result2.data.content[0].url)
                exercisesSearchRest.value[i].url = result2.data.content[0].url;
            else
                exercisesSearchRest.value[i].url = 'https://th.bing.com/th/id/OIG.hUKUpOfOW_DIJ924Uky.?pid=ImgGn&w=1024&h=1024&rs=1'
        }
        for (let i = 0; i < exercisesSearchEx.value.length; i++) {
            const result2 = await exerciseStore.getExerciseImages(exercisesSearchEx.value[i].id);
            if (result2.success && result2.data.content.length > 0 && result2.data.content[0].url)
                exercisesSearchEx.value[i].url = result2.data.content[0].url;
            else
                exercisesSearchEx.value[i].url = 'https://th.bing.com/th/id/OIG.hUKUpOfOW_DIJ924Uky.?pid=ImgGn&w=1024&h=1024&rs=1'
        }
    }
    if (route.params.id) {
        isEditing.value = true
        let result = await routineStore.getRoutine(route.params.id)
        if (result.success) {
            routine.value = {
                id: result.data.id,
                name: result.data.name,
                description: result.data.detail,
                isPublic: result.data.isPublic,
                difficulty: diffToSpanish(routine.value.difficulty),
                img: result.data.metadata?.image,
                fav: result.data.metadata?.fav
            }
            result = await routineStore.getCyclesByRoutine(route.params.id)
            if (result.success) {
                cicloSeleccionado.value = -1
                repCicloPrincipal.value.push(1)
                if (!dataPrincipal.value[0])
                    dataPrincipal.value[0] = []
                dataPrincipal.value[0].push({
                    cantSeries: 1,
                    duracion: 10,
                    typeDuracion: "segundos",
                    descanso: 10,
                    typeDescanso: "segundos"
                })
                for (let i = 0; i < result.data.totalCount; i++) {
                    const result2 = await cycleStore.getExercisesByCycle(result.data.content[i].id)
                    if (result2.success) {
                        if (result.data.content[i].type === 'warmup') {
                            cicloEntCalor.value = result.data.content[i]
                            for (let j = 0; j < result2.data.totalCount; j++) {
                                const aux = await exerciseStore.getExerciseImages(result2.data.content[j].exercise.id)
                                const auximage = aux.data.content[0]?.url
                                const ex = {
                                    id: result2.data.content[j].exercise.id,
                                    name: result2.data.content[j].exercise.name,
                                    detail: result2.data.content[j].exercise.detail,
                                    url: auximage,
                                    type: result2.data.content[j].exercise.type,
                                    number: 1,
                                    index: 0
                                }
                                ejEntCalor.value.push(ex)
                            }
                        } else if (result.data.content[i].type === 'exercise') {
                            if (cicloSeleccionado.value === -1)
                                cicloSeleccionado.value = i
                            ciclosPrincipal.value.push(result.data.content[i])
                            cantCiclosPrincipal.value.push(i)
                            repCicloPrincipal.value.push(1)
                            for (let j = 0; j < result2.data.totalCount; j++) {
                                if (!ejPrincipal.value[i])
                                    ejPrincipal.value[i] = []
                                const ex = {
                                    id: result2.data.content[j].exercise.id,
                                    name: result2.data.content[j].exercise.name,
                                    detail: result2.data.content[j].exercise.detail,
                                    url: result2.data.content[j].exercise.metadata?.image,
                                    type: result2.data.content[j].exercise.type,
                                    number: 1,
                                    index: 0
                                }
                                ejPrincipal.value[i].push(ex)
                            }
                            if (!dataPrincipal.value[i])
                                dataPrincipal.value[i] = []
                            dataPrincipal.value[i].push({
                                cantSeries: 1,
                                duracion: 10,
                                typeDuracion: "segundos",
                                descanso: 10,
                                typeDescanso: "segundos"
                            })
                        } else if (result.data.content[i].type === 'cooldown') {
                            cicloEnfriamiento.value = result.data.content[i]
                            for (let j = 0; j < result2.data.totalCount; j++) {
                                const ex = {
                                    id: result2.data.content[j].exercise.id,
                                    name: result2.data.content[j].exercise.name,
                                    detail: result2.data.content[j].exercise.detail,
                                    url: result2.data.content[j].exercise.metadata?.image,
                                    type: result2.data.content[j].exercise.type,
                                    number: 1,
                                    index: 0
                                }
                                ejEnfriamiento.value.push(ex)
                            }
                        }
                    }
                }
            }
            if (ciclosPrincipal.value.length === 0) {
                cantCiclosPrincipal.value.push(1)
                cicloSeleccionado.value = 1
                if (!dataPrincipal.value[1])
                    dataPrincipal.value[1] = []
                dataPrincipal.value[1].push({
                    cantSeries: 1,
                    duracion: 10,
                    typeDuracion: 'segundos',
                    descanso: 10,
                    typeDescanso: 'segundos'
                })
                repCicloPrincipal.value[1] = 1
            }
        }
    } else {
        isEditing.value = false
        cantCiclosPrincipal.value.push(1)
        ciclosPrincipal.value.push({
            name: 'Principal 1',
            detail: 'Principal 1',
            type: 'exercise',
            repetitions: 1
        })
        cicloSeleccionado.value = 1
        if (!dataPrincipal.value[1])
            dataPrincipal.value[1] = []
        dataPrincipal.value[1].push({
            cantSeries: 1,
            duracion: 10,
            typeDuracion: 'segundos',
            descanso: 10,
            typeDescanso: 'segundos'
        })
        repCicloPrincipal.value[1] = 1
    }
});

function resetEjSeleccionado() {
    ejercicioSeleccionado.value = {
        name: '',
        detail: '',
        url: '',
        type: '',
        number: 0,
        index: 0
    }
}

function diffToEnglish(dif) {
    switch (dif) {
        case 'principiante':
            return 'rookie';
        case 'amateur':
            return 'beginner';
        case 'intermedio':
            return 'intermediate';
        case 'avanzado':
            return 'advanced';
        case 'experto':
            return 'expert';
        default:
            return 'rookie';
    }
}

function diffToSpanish(dif) {
    switch (dif) {
        case 'rookie':
            return 'principiante';
        case 'beginner':
            return 'amateur';
        case 'intermediate':
            return 'intermedio';
        case 'advanced':
            return 'avanzado';
        case 'expert':
            return 'experto';
        default:
            return 'principiante';
    }
}

async function addRoutine() {
    loading.value = true
    if (!route.params.id) {
        const resultCat = await categoryStore.getCategories()
        if (resultCat.success) {
            if (resultCat.data.totalCount === 0) {
                const cat = {
                    name: 'cat 1',
                    detail: 'cat 1'
                }
                const result2 = await categoryStore.addCategory(cat)
                if (!result2.success) {
                    await showErrorAlert('Error al agregar categoria')
                    return;
                }
            }
        } else {
            await showErrorAlert('Error al obtener categorias')
            return;
        }
        const rout = {
            name: routine.value.name,
            detail: routine.value.description,
            isPublic: routine.value.isPublic ? true : false,
            difficulty: diffToEnglish(routine.value.difficulty),
            metadata: {
                image: routine.value.img
            }
        }
        if (!rout.name) {
            await showErrorAlert('Debe ingresar un nombre para la rutina')
            loading.value = false
            return;
        }
        if (!rout.difficulty) {
            await showErrorAlert('Debe seleccionar una dificultad para la rutina')
            loading.value = false
            return;
        }
        if (!rout.metadata.image) {
            await showErrorAlert('Debe cargar una imagen para la rutina')
            loading.value = false
            return;
        }
        const result = await routineStore.addRoutine(rout)
        if (result.success) {
            const idRoutine = result.data.id
            // primero tengo que agregar los ciclos a la rutina
            // luego agregar los ejercicios a los ciclos

            let cantCiclos = 1
            // agregar ciclo de entrada en calor
            if (ejEntCalor.value.length > 0) {
                const ciclo = {
                    name: 'Entrada en calor',
                    detail: 'Entrada en calor',
                    type: 'warmup',
                    order: cantCiclos,
                    repetitions: repCicloEntCalor.value
                }
                cantCiclos++
                const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
                if (result.success) {
                    const idCiclo = result.data.id
                    // agregar ejercicios a los ciclos
                    // agregar ejercicios de entrada en calor
                    if (ejEntCalor.value.length > 0) {
                        for (let i = 0; i < ejEntCalor.value.length; i++) {
                            let repeticiones = (dataEntCalor.value.typeDuracion === 'repeticiones' ? dataEntCalor.value.duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataEntCalor.value.typeDuracion === 'segundos' ? dataEntCalor.value.duracion : dataEntCalor.value.duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEntCalor.value[i].id, i + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo en calor')
                                return;
                            }
                        }
                    }
                }
            }

            // agregar ciclos principales
            for (let i = 0; i < ciclosPrincipal.value.length; i++) {
                const ciclo = {
                    name: 'Principal ' + (i + 1),
                    detail: 'Principal ' + (i + 1),
                    type: 'exercise',
                    order: cantCiclos,
                    repetitions: repCicloPrincipal.value[i + 1]
                }
                cantCiclos++
                //quiero agregar el ciclo si tiene por lo menos un ejercicio adentro
                let foundExercise = false
                for (let j = 0; j < ejPrincipal.value[i + 1]?.length; j++) {
                    if (ejPrincipal.value[i + 1][j].id != null) {
                        foundExercise = true
                    }
                }
                if (foundExercise) {
                    const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
                    if (result.success) {
                        const idCiclo = result.data.id
                        // agregar ejercicios principales
                        for (let j = 0; j < ejPrincipal.value[i + 1]?.length; j++) {
                            let repeticiones = (dataPrincipal.value[i + 1][j + 1].typeDuracion === 'repeticiones' ? dataPrincipal.value[i + 1][j + 1].duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataPrincipal.value[i + 1][j + 1].typeDuracion === 'segundos' ? dataPrincipal.value[i + 1][j + 1].duracion : dataPrincipal.value[i + 1][j + 1].duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejPrincipal.value[i + 1][j].id, j + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo')
                                return;
                            }
                        }
                    }
                }
            }

            // agregar ciclo de enfriamiento
            if (ejEnfriamiento.value.length > 0) {
                const ciclo = {
                    name: 'Enfriamiento',
                    detail: 'Enfriamiento',
                    type: 'cooldown',
                    order: cantCiclos,
                    repetitions: repCicloEnfriamiento.value
                }
                cantCiclos++
                const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
                if (result.success) {
                    const idCiclo = result.data.id
                    // agregar ejercicios de enfriamiento
                    if (ejEnfriamiento.value.length > 0) {
                        for (let i = 0; i < ejEnfriamiento.value.length; i++) {
                            let repeticiones = (dataEnf.value.typeDuracion === 'repeticiones' ? dataEnf.value.duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataEnf.value.typeDuracion === 'segundos' ? dataEnf.value.duracion : dataEnf.value.duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEnfriamiento.value[i].id, i + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo enfriamiento')
                                return;
                            }
                        }
                    }
                }
            }
            loading.value = false
            finishRoutine.value = false
            await router.push({name: 'my-routines'})
        }
    } else {
        // primero edito la rutina
        const rout = {
            id: routine.value.id,
            name: routine.value.name,
            description: routine.value.description,
            isPublic: true,
            difficulty: diffToEnglish(routine.value.difficulty),
            img: routine.value.img,
            score: 0,
            fav: routine.value.fav,
        }
        if (!rout.name) {
            await showErrorAlert('Debe ingresar un nombre para la rutina')
            loading.value = false
            return;
        }
        if (!rout.difficulty) {
            await showErrorAlert('Debe seleccionar una dificultad para la rutina')
            loading.value = false
            return;
        }
        if (!rout.img) {
            await showErrorAlert('Debe cargar una imagen para la rutina')
            loading.value = false
            return;
        }
        const result = await routineStore.changeRoutine(rout)
        if (!result.success) {
            await showErrorAlert('Error al editar rutina')
            loading.value = false
            return;
        }

        const idRoutine = result.data.id
        // ahora borro los ciclos de la rutina
        const result2 = await routineStore.getCyclesByRoutine(route.params.id)
        const aux = []
        if (result2.success) {
            for (let i = 0; i < result2.data.totalCount; i++) {
                aux[i] = await cycleStore.getExercisesByCycle(result2.data.content[i].id)
                const result3 = await routineStore.removeCycleFromRoutine(route.params.id, result2.data.content[i].id)
                if (!result3.success) {
                    await showErrorAlert('Error al borrar ciclo de rutina')
                    loading.value = false
                    return;
                }
            }
        }
        let cantCiclos = 1
        // agregar ciclo de entrada en calor
        if (ejEntCalor.value.length > 0) {
            const ciclo = {
                name: 'Entrada en calor',
                detail: 'Entrada en calor',
                type: 'warmup',
                order: cantCiclos,
                repetitions: repCicloEntCalor.value
            }
            cantCiclos++
            const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
            if (result.success) {
                const idCiclo = result.data.id
                // agregar ejercicios a los ciclos
                // agregar ejercicios de entrada en calor
                if (ejEntCalor.value.length > 0) {
                    for (let i = 0; i < ejEntCalor.value.length; i++) {
                        if (i < aux[0].data.content.length) {
                            let repeticiones = (aux[0].data.content[i].repetitions)
                            let duracion = (aux[0].data.content[i].duration)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEntCalor.value[i].id, i + 1, duracion, repeticiones)
                        } else {
                            let repeticiones = (dataEntCalor.value.typeDuracion === 'repeticiones' ? dataEntCalor.value.duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataEntCalor.value.typeDuracion === 'segundos' ? dataEntCalor.value.duracion : dataEntCalor.value.duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEntCalor.value[i].id, i + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo en calor')
                                return;
                            }
                        }
                    }
                }
            }
        }

        // agregar ciclos principales
        for (let i = 0; i < ciclosPrincipal.value.length; i++) {
            const ciclo = {
                name: 'Principal ' + (i + 1),
                detail: 'Principal ' + (i + 1),
                type: 'exercise',
                order: cantCiclos,
                repetitions: repCicloPrincipal.value[i + 1]
            }
            cantCiclos++
            //quiero agregar el ciclo si tiene por lo menos un ejercicio adentro
            let foundExercise = false
            for (let j = 0; j < ejPrincipal.value[i + 1]?.length; j++) {
                if (ejPrincipal.value[i + 1][j].id != null) {
                    foundExercise = true
                }
            }
            if (foundExercise) {
                const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
                if (result.success) {
                    const idCiclo = result.data.id
                    // agregar ejercicios principales
                    for (let j = 0; j < ejPrincipal.value[i + 1]?.length; j++) {
                        if (i < aux.length - 2) {
                            if (j < aux[i].data.content.length) {
                                let repeticiones = (aux[i + 1].data.content[j].repetitions)
                                let duracion = (aux[i + 1].data.content[j].duration)
                                if (typeof duracion === 'string')
                                    duracion = parseInt(duracion)
                                if (typeof repeticiones === 'string')
                                    repeticiones = parseInt(repeticiones)
                                const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejPrincipal.value[i + 1][j].id, j + 1, duracion, repeticiones)
                                if (!result2.success) {
                                    await showErrorAlert('Error al agregar ejercicio a ciclo')
                                    return;
                                }
                            } else {
                                let repeticiones = (dataPrincipal.value[i + 1][j - aux[i].data.content.length].typeDuracion === 'repeticiones' ? dataPrincipal.value[i + 1][j - aux[i].data.content.length].duracion : 0)
                                let duracion = (repeticiones === 0 ? (dataPrincipal.value[i + 1][j - aux[i].data.content.length].typeDuracion === 'segundos' ? dataPrincipal.value[i + 1][j - aux[i].data.content.length].duracion : dataPrincipal.value[i + 1][j - aux[i].data.content.length + 1].duracion * 60) : 0)
                                if (typeof duracion === 'string')
                                    duracion = parseInt(duracion)
                                if (typeof repeticiones === 'string')
                                    repeticiones = parseInt(repeticiones)
                                const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejPrincipal.value[i + 1][j].id, j + 1, duracion, repeticiones)
                                if (!result2.success) {
                                    await showErrorAlert('Error al agregar ejercicio a ciclo')
                                    return;
                                }
                            }

                        } else {
                            let repeticiones = (dataPrincipal.value[i + 1][j].typeDuracion === 'repeticiones' ? dataPrincipal.value[i + 1][j].duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataPrincipal.value[i + 1][j].typeDuracion === 'segundos' ? dataPrincipal.value[i + 1][j].duracion : dataPrincipal.value[i + 1][j].duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejPrincipal.value[i + 1][j].id, j + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo')
                                return;
                            }
                        }
                    }
                }
            }
        }

        // agregar ciclo de enfriamiento
        if (ejEnfriamiento.value.length > 0) {
            const ciclo = {
                name: 'Enfriamiento',
                detail: 'Enfriamiento',
                type: 'cooldown',
                order: cantCiclos,
                repetitions: repCicloEnfriamiento.value
            }
            cantCiclos++
            const result = await routineStore.addCycleToRoutine(idRoutine, ciclo)
            if (result.success) {
                const idCiclo = result.data.id
                // agregar ejercicios de enfriamiento
                if (ejEnfriamiento.value.length > 0) {
                    for (let i = 0; i < ejEnfriamiento.value.length; i++) {
                        if (i < aux[aux.length - 1].data.content.length) {
                            let repeticiones = (aux[aux.length - 1].data.content[i].repetitions)
                            let duracion = (aux[aux.length - 1].data.content[i].duration)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEnfriamiento.value[i].id, i + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo enfriamiento')
                                return;
                            }
                        } else {
                            let repeticiones = (dataEnf.value.typeDuracion === 'repeticiones' ? dataEnf.value.duracion : 0)
                            let duracion = (repeticiones === 0 ? (dataEnf.value.typeDuracion === 'segundos' ? dataEnf.value.duracion : dataEnf.value.duracion * 60) : 0)
                            if (typeof duracion === 'string')
                                duracion = parseInt(duracion)
                            if (typeof repeticiones === 'string')
                                repeticiones = parseInt(repeticiones)
                            const result2 = await cycleStore.addExerciseToCycle(idCiclo, ejEnfriamiento.value[i].id, i + 1, duracion, repeticiones)
                            if (!result2.success) {
                                await showErrorAlert('Error al agregar ejercicio a ciclo enfriamiento')
                                return;
                            }
                        }
                    }
                }
            }
        }
        loading.value = false
        finishRoutine.value = false
        await router.push({name: 'my-routines'})
    }
    loading.value = false
}

async function agregarEjercicio() {
    if (ejercicioSeleccionado.value.name === '') {
        await showErrorAlert2('Debe seleccionar un ejercicio o crear uno nuevo')
    } else {
        if (type.value === 1) {
            if (dataEntCalor.value.cantSeries === 0) {
                await showErrorAlert2('La cantidad de series no puede ser 0')
                return;
            }
            if (dataEntCalor.value.duracion === 0) {
                await showErrorAlert2('La duración no puede ser 0')
                return;
            }
            if (dataEntCalor.value.descanso === 0) {
                await showErrorAlert2('El tiempo de descanso no puede ser 0')
                return;
            }
            if (dataEntCalor.value.typeDuracion === '') {
                await showErrorAlert2('Debe seleccionar un tipo de duración')
                return;
            }
            if (dataEntCalor.value.typeDescanso === '') {
                await showErrorAlert2('Debe seleccionar un tipo de descanso')
                return;
            }
            for (let i = 0; i < ejEntCalor.value.length; i++) {
                if (ejEntCalor.value[i].name === ejercicioSeleccionado.value.name) {
                    await showErrorAlert2('El ejercicio ya está en la lista, elija otro')
                    return;
                }
            }
            ejEntCalor.value.push(ejercicioSeleccionado.value);
        } else if (type.value === 2) {
            let cantEjs = ejPrincipal.value[cicloSeleccionado.value]?.length
            if (cantEjs == null)
                cantEjs = 0
            if (dataPrincipal.value[cicloSeleccionado.value] == null)
                dataPrincipal.value[cicloSeleccionado.value] = []
            if (dataPrincipal.value[cicloSeleccionado.value][cantEjs.value]?.cantSeries === 0) {
                await showErrorAlert2('La cantidad de series no puede ser 0')
                return;
            }
            if (dataPrincipal.value[cicloSeleccionado.value][cantEjs.value]?.duracion === 0) {
                await showErrorAlert2('La duración no puede ser 0')
                return;
            }
            if (dataPrincipal.value[cicloSeleccionado.value][cantEjs.value]?.descanso === 0) {
                await showErrorAlert2('El tiempo de descanso no puede ser 0')
                return;
            }
            if (dataPrincipal.value[cicloSeleccionado.value][cantEjs.value]?.typeDuracion === '') {
                await showErrorAlert2('Debe seleccionar un tipo de duración')
                return;
            }
            if (dataPrincipal.value[cicloSeleccionado.value][cantEjs.value]?.typeDescanso === '') {
                await showErrorAlert2('Debe seleccionar un tipo de descanso')
                return;
            }

            for (let i = 0; i < ejPrincipal.value[cicloSeleccionado.value]?.length; i++) {
                if (ejPrincipal.value[cicloSeleccionado.value][i].name === ejercicioSeleccionado.value.name) {
                    await showErrorAlert2('El ejercicio ya está en la lista, elija otro')
                    return;
                }
            }

            if (ejPrincipal.value[cicloSeleccionado.value] == null)
                ejPrincipal.value[cicloSeleccionado.value] = []
            ejPrincipal.value[cicloSeleccionado.value].push(ejercicioSeleccionado.value);
            dataPrincipal.value[cicloSeleccionado.value].push({
                cantSeries: dataPrincipal.value[cicloSeleccionado.value][0]?.cantSeries,
                duracion: dataPrincipal.value[cicloSeleccionado.value][0]?.duracion,
                typeDuracion: dataPrincipal.value[cicloSeleccionado.value][0]?.typeDuracion,
                descanso: dataPrincipal.value[cicloSeleccionado.value][0]?.descanso,
                typeDescanso: dataPrincipal.value[cicloSeleccionado.value][0]?.typeDescanso
            })
        } else if (type.value === 3) {
            if (dataEnf.value.cantSeries === 0) {
                await showErrorAlert2('La cantidad de series no puede ser 0')
                return;
            }
            if (dataEnf.value.duracion === 0) {
                await showErrorAlert2('La duración no puede ser 0')
                return;
            }
            if (dataEnf.value.descanso === 0) {
                await showErrorAlert2('El tiempo de descanso no puede ser 0')
                return;
            }
            if (dataEnf.value.typeDuracion === '') {
                await showErrorAlert2('Debe seleccionar un tipo de duración')
                return;
            }
            if (dataEnf.value.typeDescanso === '') {
                await showErrorAlert2('Debe seleccionar un tipo de descanso')
                return;
            }

            for (let i = 0; i < ejEnfriamiento.value.length; i++) {
                if (ejEnfriamiento.value[i].name === ejercicioSeleccionado.value.name) {
                    await showErrorAlert2('El ejercicio ya está en la lista, elija otro')
                    return;
                }
            }
            ejEnfriamiento.value.push(ejercicioSeleccionado.value);
        }
    }
}

async function saveExercise() {
    debugger
    if (type.value === 3)
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    if (newEjercicio.value.name === '') {
        await showErrorAlert('Debe ingresar un nombre para el ejercicio')
        return true;
    }
    for (let i = 0; i < exercisesSearchRest.value.length; i++) {
        if (exercisesSearchRest.value[i].name === newEjercicio.value.name) {
            await showErrorAlert('Ya existe un ejercicio con ese nombre')
            return true;
        }
    }
    for (let i = 0; i < exercisesSearchEx.value.length; i++) {
        if (exercisesSearchEx.value[i].name === newEjercicio.value.name) {
            await showErrorAlert('Ya existe un ejercicio con ese nombre')
            return true;
        }
    }

    debugger
    let result = await exerciseStore.addExercise(newEjercicio.value);
    if (result.success) {
        newEjercicio.value.index = result.data.id
        if (newEjercicio.value.type === 'exercise')
            exercisesSearchEx.value.push(newEjercicio.value)
        else
            exercisesSearchRest.value.push(newEjercicio.value)
        const user = await userStore.getCurrentUser()
        if (user.success) {
            if (!user.data.metadata)
                user.data.metadata = {}
            if (!user.data.metadata.exercises)
                user.data.metadata.exercises = []
            user.data.metadata.exercises.push(newEjercicio.value)
            await userStore.modifyCurrentUser(user.data.firstName, user.data.lastName, user.data.gender, user.data.metadata)
            myExercises.value = user.data.metadata.exercises
        } else {
            await showErrorAlert('Error al obtener usuario')
            return true;
        }
        result = await exerciseStore.addExerciseImage(result.data.id, newEjercicio.value)
        if (result.success) {
            ejercicioSeleccionado.value = {
                id: result.data.id,
                name: newEjercicio.value.name,
                detail: newEjercicio.value.detail,
                url: result.data.url,
                type: newEjercicio.value.type,
                number: myExercises.value.length,
                index: 0
            }
            newEjercicio.value = {
                name: '',
                detail: '',
                url: '',
                type: '',
                number: myExercises.value.length,
                index: 0
            }
        } else {
            await showErrorAlert('Error al agregar imagen')
            return true;
        }
    } else {
        await showErrorAlert('Error al agregar ejercicio')
        return true;
    }
    return false;
}

async function openFinishDialog() {
    if (ejEntCalor.value.length === 0) {
        await showErrorAlert('La rutina debe tener al menos un ejercicio en la entrada en calor')
        return;
    } else if (ejEnfriamiento.value.length === 0) {
        await showErrorAlert('La rutina debe tener al menos un ejercicio en el enfriamiento')
        return;
    } else {
        let found = false
        for (let i = 1; i < ejPrincipal.value.length && !found; i++) {
            if (ejPrincipal.value[i] && ejPrincipal.value[i].length > 0)
                found = true
        }
        if (!found) {
            await showErrorAlert('La rutina debe tener al menos un ejercicio en la parte principal')
            return;
        }
    }
    finishRoutine.value = true
}

function addCycle() {
    cicloSeleccionado.value = ciclosPrincipal.value.length + 1
    repCicloPrincipal.value.push(1)
    ciclosPrincipal.value.push({
        type: 'exercise',
        number: ciclosPrincipal.value.length + 1,
        index: ciclosPrincipal.value.length + 1
    })
    if (!dataPrincipal.value[cicloSeleccionado.value])
        dataPrincipal.value[cicloSeleccionado.value] = []
    dataPrincipal.value[cicloSeleccionado.value].push({
        cantSeries: 1,
        duracion: 10,
        typeDuracion: 'segundos',
        descanso: 10,
        typeDescanso: 'segundos'
    })
    cantCiclosPrincipal.value.push(ciclosPrincipal.value.length)
}

function resetForm() {
    finishRoutine.value = false
}

</script>


<style scoped>
h1 {
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
}

.nuevo-ejercicio {
    background-color: #000000;
    color: #8efd00;
    margin-right: 10px;
    margin-top: 20px;
}

.boton {
    background-color: #8efd00;
    color: #000000;
    margin-right: 10px;
    margin-top: 20px;
    position: absolute;
    left: 20%;
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

.save {
    background-color: #8efd00;
    color: #000000;
    margin: 25px;
}

.contenedor {
    background-color: rgba(0, 0, 0, 0.1);
}

.principal {
    padding-top: 40px;
}

.agregar-principal {
    background-color: #000000;
    color: #8efd00;
}

.gris {
    background-color: gray;
    border-radius: 20px 20px 0 0;
}

</style>
