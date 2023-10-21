<template>
    <AppBar/>
    <h1>Crear Rutina</h1>
    <v-row>
        <v-col cols="9">
            <h3 class="nombre-rutina"> Nombre de la rutina: </h3>
            <v-text-field
                class="nombre-rutina"
                density="compact"
                placeholder="Elija un nombre descriptivo"
                variant="outlined"
                v-model="routine.name"
            ></v-text-field>
        </v-col>
        <v-col>
            <v-btn prepend-icon="mdi-content-save" class="save" @click="saveRutina"> Guardar Rutina</v-btn>
        </v-col>
    </v-row>

    <v-card>
        <v-tabs
            v-model="type"
            color="primary"
            bg-color="secondary"
            align-tabs="center"
            grow="true"
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
                <v-container fluid>
                    <v-row>
                        <v-col cols="8">
                            <v-row>
                                <v-col>
                                    <SearchBarExercise @exercise-selected="ejercicioSeleccionado" :is-rest="true"
                                                       v-if="n===3"/>
                                    <SearchBarExercise @exercise-selected="ejercicioSeleccionado" :is-rest="false"
                                                       v-else/>
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
                                                        counter
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Descripción"
                                                        v-model="newEjercicio.detail"
                                                        maxlength="200"
                                                        counter
                                                    ></v-text-field>
                                                    
                                                    <!--
                                                    <v-text-field
                                                        label="Duración"
                                                        v-model="duration"
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Dificultad"
                                                        v-model="difficulty"
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Equipamiento"
                                                        v-model="equipment"
                                                    ></v-text-field>
                                                    -->
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
                                                        @click="() => { isActive.value = false; }"
                                                    ></v-btn>
                                                    <v-btn
                                                        class="confirmar"
                                                        text="Confirmar"
                                                        @click="() => { isActive.value = false; saveExercise(); }"
                                                    ></v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col><h3> Cantidad de series: </h3></v-col>
                                <v-col>
                                    <v-autocomplete density="compact" default="1" variant="outlined"
                                                    :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']"></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col><h3> Duración (repeticiones o tiempo): </h3></v-col>
                                <v-col cols="2">
                                    <v-autocomplete density="compact" default="1" variant="outlined"
                                                    :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']"></v-autocomplete>
                                </v-col>
                                <v-col>
                                    <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                    :items="['repeticiones', 'segundos', 'minutos']"></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col><h3> Tiempo de descanso: </h3></v-col>
                                <v-col cols="2">
                                    <v-autocomplete density="compact" default="1" variant="outlined"
                                                    :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']"></v-autocomplete>
                                </v-col>
                                <v-col>
                                    <v-autocomplete density="compact" default="repeticiones" variant="outlined"
                                                    :items="['segundos', 'minutos']"></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn v-if="n===1" class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio">
                                    Agregar Ejercicio a Entrada en Calor
                                </v-btn>
                                <v-btn v-else-if="n===2" class="boton" prepend-icon="mdi-plus"
                                       @click="agregarEjercicio">Agregar Ejercicio a Principal
                                </v-btn>
                                <v-btn v-else class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio"> Agregar
                                    Ejercicio a Enfriamiento
                                </v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <ExerciseDetail :exercise="ejercicioSeleccionado"/>
                        </v-col>
                        <v-row v-if="n===1">   <!-- ExerciseDetailMini para Entrada en Calor -->
                            <h2>Entrada en calor:</h2>
                            <div v-for="ej in ejEntCalor" :key="'entrada-calor-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
                            </div>
                        </v-row>
                        <v-row v-else-if="n===2">
                            <!-- ExerciseDetailMini para Principal -->
                            <h2>Principal:</h2>
                            <div v-for="ej in ejPrincipal" :key="'principal-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
                            </div>
                        </v-row>
                        <v-row v-else>
                            <!-- ExerciseDetailMini para Enfriamiento -->
                            <h2>Enfriamiento:</h2>
                            <div v-for="ej in ejEnfriamiento" :key="'enfriamiento-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
                            </div>
                        </v-row>
                    </v-row>
                </v-container>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import SearchBarExercise from "@/components/SearchBarExercise.vue";
import ExerciseDetail from "@/components/ExerciseDetail.vue";
import {ref, provide, onBeforeMount} from 'vue';
import ExerciseDetailMini from "@/components/ExerciseDetailMini.vue";
import {useExerciseStore} from '@/stores/exerciseStore'
import {useRoute} from "vue-router";
import {useRoutineStore} from "@/stores/routineStore";


const exerciseStore = useExerciseStore()
const routineStore = useRoutineStore()
const routine = ref({});
const type = ref(1);
const ejEntCalor = ref([]);
const ejPrincipal = ref([]);
const ejEnfriamiento = ref([]);
const contEntCalor = ref(0);
const contPrincipal = ref(0);
const contEnfriamiento = ref(0);
const route = useRoute();
const newEjercicio = ref({
    name: '',
    detail: '',
    url: '',
    type: '',
    number: 1
});
const ejercicioSeleccionado = ref({
    name: '',
    detail: '',
    url: '',
    type: '',
    number: 1
});

provide('selectedExercise', ejercicioSeleccionado);

onBeforeMount(async () => {
    if (route.params.id) {
        let result = await routineStore.getRoutine(route.params.id)
        if(result.success){
            routine.value = result.data
            result = await exerciseStore.getExercisesByRoutine(route.params.id)
            for (let i = 0; i < routine.value.exercises.length; i++) {
                if (routine.value.exercises[i].type === 'exercise') {
                    if (routine.value.exercises[i].number === 1) {
                        ejEntCalor.value.push(routine.value.exercises[i])
                        contEntCalor.value++
                    } else if (routine.value.exercises[i].number === 2) {
                        ejPrincipal.value.push(routine.value.exercises[i])
                        contPrincipal.value++
                    } else if (routine.value.exercises[i].number === 3) {
                        ejEnfriamiento.value.push(routine.value.exercises[i])
                        contEnfriamiento.value++
                    }
                }
            }
        }
    }
});

function agregarEjercicio() {
    if (ejercicioSeleccionado.value.name === '' || ejercicioSeleccionado.value.detail === '' || ejercicioSeleccionado.value.url === '') {
        alert('Debe seleccionar un ejercicio o crear uno nuevo')
    } else {
        if (type.value === 1) {
            ejEntCalor.value.push(ejercicioSeleccionado);
            contEntCalor.value++;
        } else if (type.value === 2) {
            ejPrincipal.value.push(ejercicioSeleccionado);
            contPrincipal.value++;
        } else if (type.value === 3) {
            ejEnfriamiento.value.push(ejercicioSeleccionado);
            contEnfriamiento.value++;
        }
    }
}

async function saveExercise() {
    debugger
    if (type.value === 3)
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    let result = await exerciseStore.addExercise(newEjercicio.value);
    if (result.success) {
        result = await exerciseStore.addExerciseImage(result.data.id, newEjercicio.value)
        if (result.success) {
            ejercicioSeleccionado.value = newEjercicio.value;
            newEjercicio.value = {
                name: '',
                detail: '',
                url: '',
                type: '',
                number: 1
            }
        }
    }
}

async function saveRutina(){
    // todo guardar rutina
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

.save {
    background-color: #8efd00;
    color: #000000;
    margin-top: 40px;
}
</style>
