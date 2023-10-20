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
            v-model="routineName"
        ></v-text-field>
    </v-col>
    <v-col>
        <v-btn prepend-icon="mdi-content-save" class="save"> Guardar Rutina </v-btn>
    </v-col>
</v-row>

    <v-card>
        <v-tabs
            v-model="tab"
            color="primary"
            bg-color="secondary"
            align-tabs="center"
            grow
        >
            <v-tab :value="1">Entrada en Calor</v-tab>
            <v-tab :value="2">Principal</v-tab>
            <v-tab :value="3">Enfriamiento</v-tab>
        </v-tabs>
        <v-window v-model="tab">
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
                                    <SearchBarExercise/>
                                </v-col>
                                <v-col cols="1"><h3 class="o"> ó </h3></v-col>
                                <v-col>
                                    <v-dialog width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn class="nuevo-ejercicio" prepend-icon="mdi-pencil" v-bind="props" text="Open Dialog"> Crear Nuevo Ejercicio </v-btn>
                                        </template>
                                            <template v-slot:default="{ isActive }">
                                                <v-card title="Crear Nuevo Ejercicio">
                                                    <v-card-text>
                                                        <v-text-field
                                                            label="Nombre del ejercicio"
                                                            v-model="name"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            label="Descripción"
                                                            v-model="description"
                                                        ></v-text-field>
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
                                                        <v-file-input
                                                            label="Imagen"
                                                            variant="filled"
                                                            prepend-icon="mdi-camera"
                                                        ></v-file-input>
                                                    </v-card-text>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>

                                                        <v-btn
                                                            text="cancelar"
                                                            class="cancelar"
                                                            @click="isActive.value = false"
                                                        ></v-btn>
                                                        <v-btn
                                                            class="confirmar"
                                                            text="Confirmar"
                                                            @click="isActive.value = false"
                                                        ></v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </template>
                                    </v-dialog>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col> <h3> Cantidad de series: </h3> </v-col>
                                <v-col > <v-autocomplete density="compact" default="1" variant="outlined" :items = "['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']"></v-autocomplete>  </v-col>
                            </v-row>
                            <v-row>
                                <v-col> <h3> Duración (repeticiones o tiempo): </h3> </v-col>
                                <v-col cols="2"> <v-autocomplete density="compact" default="1" variant="outlined" :items = "['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']"></v-autocomplete>  </v-col>
                                <v-col> <v-autocomplete density="compact" default="repeticiones" variant="outlined" :items = "['repeticiones', 'segundos', 'minutos']"></v-autocomplete>  </v-col>
                            </v-row>
                            <v-row>
                                <v-col> <h3> Tiempo de descanso (segundos): </h3> </v-col>
                                <v-col cols="2"> <v-autocomplete density="compact" default="1" variant="outlined" :items = "['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']"></v-autocomplete>  </v-col>
                                <v-col> <v-autocomplete density="compact" default="repeticiones" variant="outlined" :items = "['segundos', 'minutos']"></v-autocomplete>  </v-col>
                            </v-row>

                            <v-row>
                                <v-btn v-if="n===1" class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio">Agregar Ejercicio a Entrada en Calor</v-btn>
                                <v-btn v-else-if="n===2" class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio">Agregar Ejercicio a Principal</v-btn>
                                <v-btn v-else class="boton" prepend-icon="mdi-plus" @click="agregarEjercicio"> Agregar Ejercicio a Enfriamiento</v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <ExerciseDetail/>
                        </v-col>
                        <v-row v-if="n===1">   <!-- ExerciseDetailMini para Entrada en Calor -->
                            <h2>Entrada en calor:</h2>
                            <div v-for="n in contadorEntradaCalor" :key="'entrada-calor-' + n">
                                <ExerciseDetailMini />
                            </div>
                        </v-row>
                        <v-row v-else-if="n===2">
                            <!-- ExerciseDetailMini para Principal -->
                            <h2>Principal:</h2>
                            <div v-for="n in contadorPrincipal" :key="'principal-' + n">
                                <ExerciseDetailMini />
                            </div>
                        </v-row>
                        <v-row v-else>
                            <!-- ExerciseDetailMini para Enfriamiento -->
                            <h2>Enfriamiento</h2>
                            <div v-for="n in contadorEnfriamiento" :key="'enfriamiento-' + n">
                                <ExerciseDetailMini />
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
import GoBack from "@/components/GoBack.vue";
import SearchBar from "@/components/SearchBar.vue";
import SearchBarExercise from "@/components/SearchBarExercise.vue";
import ExerciseDetail from "@/components/ExerciseDetail.vue";
import { ref } from 'vue';
import ExerciseDetailMini from "@/components/ExerciseDetailMini.vue";

const routineName = ref('');
</script>

<script>
export default {
    data: () => ({
        tab: null,
        ejerciciosEntradaCalor: [],
        ejerciciosPrincipal: [],
        ejerciciosEnfriamiento: [],
        contadorEntradaCalor: 0,
        contadorPrincipal: 0,
        contadorEnfriamiento: 0,
    }),
    methods: {
        agregarEjercicio() {
            const nuevoEjercicio = {}; //inicializar aquí con los datos del ejercicio
            if (this.tab === 1) {
                this.ejerciciosEntradaCalor.push(nuevoEjercicio);
                this.contadorEntradaCalor++;
            } else if (this.tab === 2) {
                this.ejerciciosPrincipal.push(nuevoEjercicio);
                this.contadorPrincipal++;
            } else if (this.tab === 3) {
                this.ejerciciosEnfriamiento.push(nuevoEjercicio);
                this.contadorEnfriamiento++;
            }
        },
    },
};
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

.nombre-rutina{
    width: 400px;
    padding-left: 20px;
}

.o{
    padding-left: 25px;
    padding-top: 25px;
}

.confirmar{
    background-color: #8efd00;
    color: #000000;
    margin-right: 10px;
    margin-top: 20px;
}

.cancelar{
    background-color: #000000;
    color: #8efd00;
    margin-right: 10px;
    margin-top: 20px;
}

h2{
    padding-left:25px;
    padding-bottom:35px;
}

.save{
    background-color: #8efd00;
    color: #000000;
    margin-top:40px;
}

</style>
