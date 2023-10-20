<template>
  <AppBar/>
    <h1>Crear Rutina</h1>

    <h3 class="nombre-rutina"> Nombre de la rutina: </h3>

    <v-text-field
        class="nombre-rutina"
        density="compact"
        placeholder="Elija un nombre descriptivo"
        variant="outlined"
        v-model="routineName"
    ></v-text-field>



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
                                    <v-btn class="nuevo-ejercicio" prepend-icon="mdi-pencil"> Crear Nuevo Ejercicio </v-btn>
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
                                <v-btn v-if="n===1" class="boton" prepend-icon="mdi-plus">Agregar Ejercicio a Entrada en Calor</v-btn>
                                <v-btn v-else-if="n===2" class="boton" prepend-icon="mdi-plus">Agregar Ejercicio a Principal</v-btn>
                                <v-btn v-else class="boton" prepend-icon="mdi-plus"> Agregar Ejercicio a Enfriamiento</v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <ExerciseDetail/>
                        </v-col>

                        <v-row> <ExerciseDetailMini/> </v-row>
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
    }),
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

}

.nombre-rutina{
    width: 400px;
    padding-left: 20px;
}

.o{
    padding-left: 25px;
    padding-top: 25px;
}

.boton {
    position: absolute;
    left: 20%;
}
</style>
