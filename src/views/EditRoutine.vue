<template>
    <AppBar/>
    <h1 v-if="isEditing">Editar Rutina</h1>
    <h1 v-else>Crear Rutina</h1>
    <v-row>
        <v-col>
            <v-btn prepend-icon="mdi-content-save" class="save" @click="openFinishDialog"> Finalizar </v-btn>
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
                <v-container fluid class="contenedor">
                    <v-row>
                        <v-col cols="8">
                            <div  v-if="n===2">
                                <v-row>
                                    <v-col><h3> Número de ciclo principal: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        :items="['1']"></v-autocomplete>
                                    </v-col>
                                    <v-col><v-btn prepend-icon="mdi-plus" class="agregar-principal"> Agregar ciclo principal</v-btn></v-col>
                                </v-row>
                                <v-row>
                                    <v-col><h3> Cantidad de repeticiones del ciclo: </h3></v-col>
                                    <v-col>
                                        <v-autocomplete density="compact" default="1" variant="outlined"
                                                        :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']"></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                            </div>
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
                                                    <v-text-field
                                                        label="Imagen"
                                                        v-model="newEjercicio.url"
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
                            <h2 v-if="ejEntCalor.length > 0">Entrada en calor:</h2>
                            <div v-for="ej in ejEntCalor" :key="'entrada-calor-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
                            </div>
                        </v-row>
                        <v-row v-else-if="n===2">
                            <!-- ExerciseDetailMini para Principal -->
                            <h2 class="principal" v-if="ejPrincipal.length > 0">Principal:</h2>
                            <div v-for="ej in ejPrincipal" :key="'principal-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
                            </div>
                        </v-row>
                        <v-row v-else>
                            <!-- ExerciseDetailMini para Enfriamiento -->
                            <h2 v-if="ejEnfriamiento.length > 0">Enfriamiento:</h2>
                            <div v-for="ej in ejEnfriamiento" :key="'enfriamiento-' + n">
                                <ExerciseDetailMini :exercise="ej"/>
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

                <div class="text-subtitle-1">Visibilidad de la rutina</div>
                <v-radio-group
                    v-model="inline"
                    inline
                >
                    <v-radio
                        label="Rutina privada"
                        value="radio-1"
                    ></v-radio>
                    <v-radio
                        label="Rutina pública"
                        value="radio-2"
                    ></v-radio>
                </v-radio-group>

                <div class="text-subtitle-1">Dificultad de la rutina</div>


                <v-autocomplete density="compact" default="1" variant="outlined"
                                :items="['rookie', 'beginner', 'intermediate', 'advanced', 'expert']"></v-autocomplete>


                <v-card-actions>
                    <v-btn
                        variant="text"
                        @click="resetForm"
                        class="cancelar"
                    >
                         Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="confirmar"
                        variant="text"
                        @click="saveRoutine"
                    >
                        <template v-if="loading">
                            <v-progress-circular
                                indeterminate
                                size="20"
                                color="white"
                            ></v-progress-circular>
                        </template>
                        <template v-else>
                            Finalizar
                        </template>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>


</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import SearchBarExercise from "@/components/SearchBarExercise.vue";
import ExerciseDetail from "@/components/ExerciseDetail.vue";
import {ref, provide, onBeforeMount} from 'vue';
import ExerciseDetailMini from "@/components/ExerciseDetailMini.vue";
import {useExerciseStore} from '@/stores/exerciseStore'
import {RouterLink, useRoute} from "vue-router";
import {useRoutineStore} from "@/stores/routineStore";
import {useCycleStore} from "@/stores/cycleStore";
import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()
const exerciseStore = useExerciseStore()
const routineStore = useRoutineStore()
const cycleStore = useCycleStore()
const routine = ref({});
const type = ref(1);
const ejEntCalor = ref([]);
const ejPrincipal = ref([]);
const ejEnfriamiento = ref([]);
const route = useRoute();
const cicloEntCalor = ref({});
const ciclosPrincipal = ref([]);
const cicloEnfriamiento = ref([]);
const finishRoutine = ref(false);
const newEjercicio = ref({
    name: '',
    detail: '',
    url: 'https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg',
    type: '',
    number: 1,
    index: 0
});
const ejercicioSeleccionado = ref({
    name: '',
    detail: '',
    url: 'https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg',
    type: '',
    number: 1,
    index: 0
});
const isEditing = ref(false);

provide('selectedExercise', ejercicioSeleccionado);

onBeforeMount(async () => {
    if (route.params.id) {
        isEditing.value = true
        let result = await routineStore.getRoutine(route.params.id)
        if (result.success) {
            routine.value = result.data
            result = await routineStore.getCyclesByRoutine(route.params.id)
            if (result.success) {
                for (let i = 0; i < result.data.totalCount; i++) {
                    if (result.data.content[i].type === 'warmup')
                        cicloEntCalor.value = result.data.content[i]
                    else if (result.data.content[i].type === 'exercise')
                        ciclosPrincipal.value.push(result.data.content[i])
                    else if (result.data.content[i].type === 'cooldown')
                        cicloEnfriamiento.value = result.data.content[i]
                }
            }
            if (cicloEntCalor.value.id) {
                result = await cycleStore.getExercisesByCycle(cicloEntCalor.value.id)
                if (result.success) {
                    ejEntCalor.value = result.data.content
                }
            }
            if (ciclosPrincipal.value.length > 0) {
                for (let i = 0; i < ciclosPrincipal.value.length; i++) {
                    result = await cycleStore.getExercisesByCycle(ciclosPrincipal.value[i].id)
                    if (result.success) {
                        ejPrincipal.value.push(result.data.content)
                    }
                }
            }
            if (cicloEnfriamiento.value.id) {
                result = await cycleStore.getExercisesByCycle(cicloEnfriamiento.value.id)
                if (result.success) {
                    ejEnfriamiento.value = result.data.content
                }
                debugger
            }
            debugger
        }
    } else {
        isEditing.value = false
    }
});

function agregarEjercicio() {
    if (ejercicioSeleccionado.value.name === '' || ejercicioSeleccionado.value.detail === '' || ejercicioSeleccionado.value.url === '') {
        alert('Debe seleccionar un ejercicio o crear uno nuevo')
    } else {
        if (type.value === 1) {
            ejEntCalor.value.push(ejercicioSeleccionado);
        } else if (type.value === 2) {
            ejPrincipal.value.push(ejercicioSeleccionado);
        } else if (type.value === 3) {
            ejEnfriamiento.value.push(ejercicioSeleccionado);
        }
    }
}

async function saveExercise() {
    if (type.value === 3)
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    let result = await exerciseStore.addExercise(newEjercicio.value);
    if (result.success) {
        newEjercicio.value.index = result.data.id
        result = await exerciseStore.addExerciseImage(result.data.id, newEjercicio.value)
        const user = await userStore.getCurrentUser()
        if (user.success) {
            if (!user.data.metadata)
                user.data.metadata = {}
            if (!user.data.metadata.exercises)
                user.data.metadata.exercises = []
            user.data.metadata.exercises.push(newEjercicio.value)
            await userStore.modifyCurrentUser(user.data.firstName, user.data.lastName, user.data.gender, user.data.metadata)
        }
        if (result.success) {
            ejercicioSeleccionado.value = newEjercicio.value;
            newEjercicio.value = {
                name: '',
                detail: '',
                url: 'https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg',
                type: '',
                number: 1,
                index: 0
            }
        }
    }
}

function openFinishDialog() {
    finishRoutine.value = true;
}

</script>

<script>
export default {
    data () {
        return {
            column: null,
            inline: null,
        }
    },
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

</style>
