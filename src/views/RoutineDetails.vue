<template>
    <AppBar/>
    <v-card class="routine-card" v-if="routine">
        <v-container fluid>
            <v-row dense>
                <v-row>
                    <v-col>
                        <v-row>
                            <h1 class="titulo"> {{ routine.name }}</h1>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card width="100%">
                                    <div class="cont">
                                        <v-img
                                            :src=routine.img
                                            height="300px"
                                            cover=""/>
                                        <v-btn class="heart"
                                               :icon="routine.fav ? 'mdi-heart' : 'mdi-heart-outline'"
                                               @click="toggle()">
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col>
                                <div class="texto">
                                    <v-row class="filastext">
                                        <v-icon icon="mdi-account" color="black"></v-icon>
                                        <h3> • Creador: {{ routine.creator?.username }}</h3></v-row>
                                    <v-row class="filastext">
                                        <v-icon icon="mdi-star" color="black"></v-icon>
                                        <h3> • Puntuación:
                                            <v-rating
                                                :model-value="routine.score"
                                                color="black"
                                                density="compact"
                                                half-increments
                                                active-color="black"
                                                readonly
                                                size="small"
                                            ></v-rating>
                                        </h3>
                                    </v-row>
                                    <v-row class="filastext">
                                        <v-icon icon="mdi-alarm" color="black"></v-icon>
                                        <h3> • Duración: {{ formatDuration(routine.duration) }} </h3></v-row>
                                    <v-row class="filastext">
                                        <v-icon icon="mdi-dumbbell" color="black"></v-icon>
                                        <h3> • Equipamiento necesario: NO TENEMOS ESTO HECHO</h3>
                                    </v-row>
                                    <v-row class="filastext">
                                        <v-icon icon="mdi-chart-line" color="black"></v-icon>
                                        <h3> • Dificultad: {{ routine.difficulty }}</h3></v-row>
                                </div>
                                <div>
                                    <v-row class="botones" align="center" justify="center">
                                        <v-col cols="12" sm="6" class="text-center">
                                            <v-btn class="compartir" @click="shareRoutine"
                                                   prepend-icon="mdi-share-variant"> Compartir
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="text-center">
                                            <v-btn class="comenzar" prepend-icon="mdi-play-circle-outline"> Comenzar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
    </v-card>
    <RoutineByCategories :nombreRutina="Favoritas" :favourite="true"/>
    <v-dialog v-model="showShareDialog" persistent max-width="400">
        <v-card>
            <v-card-title class="headline">
                Compartir Rutina
            </v-card-title>
            <v-card-text>
                <p>Aquí tienes el enlace para compartir esta rutina:</p>
                <v-text-field :value="getRoutineLink()" readonly></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="showShareDialog = false"
                       style="background-color: lightgray; border-color: #8efd00; color: #000000;">Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import AppBar from "@/components/AppBar.vue";
import {RouterLink, useRoute, useRouter} from "vue-router";
import RoutineByCategories from "@/components/RoutineByCategories.vue";
import {onBeforeMount, ref} from "vue";
import {useRoutineStore} from "@/stores/routineStore";

const route = useRoute()
const router = useRouter()
const isSelected = ref(false)
const routineStore = useRoutineStore()
let routine = ref({})
let showShareDialog = ref(false);


onBeforeMount(async () => {
    await getRoutine()
});

async function getRoutine() {
    const result = await routineStore.getRoutine(route.params.id)
    if (result.success) {
        const newRoutine = {
            id: result.data.id,
            name: result.data.name,
            img: result.data.metadata.image,
            category: result.data.category,
            description: result.data.detail,
            creator: result.data.user,
            difficulty: result.data.difficulty,
            isPublic: result.data.isPublic,
            fav: result.data.metadata.fav,
            score: result.data.score,
            duration: result.data.metadata.duration,
            // date: result.data.date,
        }
        routine.value = {...routine.value, ...newRoutine};
        console.log(routine)
    }
}

async function toggle() {
    routine.fav = !routine.fav
    const result = await routineStore.changeRoutine(routine);
    if (!result.success) {
        routine.fav = !routine.fav
        // todo tirar error
    }
}

function shareRoutine() {
    showShareDialog.value = true;
}

function getRoutineLink() {
    return window.location.href;
}

function formatDuration(durationInSeconds) {
    if (typeof durationInSeconds !== 'number' || isNaN(durationInSeconds))
        return 'Duración desconocida';
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    if (minutes > 0) {
        if (seconds > 0) {
            if (minutes === 1) {
                if (seconds === 1)
                    return `${minutes} minuto y ${seconds} segundo`;
                else
                    return `${minutes} minuto y ${seconds} segundos`;
            } else {
                if (seconds === 1)
                    return `${minutes} minutos y ${seconds} segundo`;
                else
                    return `${minutes} minutos y ${seconds} segundos`;
            }
        } else {
            if (minutes === 1)
                return `${minutes} minuto`;
            else
                return `${minutes} minutos`;
        }
    } else {
        if (seconds === 1)
            return `${seconds} segundo`;
        else
            return `${seconds} segundos`;

    }
}

</script>

<style scoped>

.titulo {
    font-family: Montserrat, sans-serif;
    font-weight: bolder;
    font-size: 200%;
    color: #000000;
    padding: 20px;
    display: inline-block;
}

.fondo {
    padding-bottom: 50px;
}

.comenzar {

    color: #000000;
    background-color: #8efd00;
    margin-right: 10px;
    margin-left: 10px;
}

.compartir {
    color: #8efd00;
    background-color: #000000;
    margin-right: 10px;
    margin-left: 10px;
}

.cont {
    position: relative;
    width: 100%;
}

.image {
    width: 100%;
    height: auto;
}

.routine-card {
    background-color: lightgray;
    margin: 20px auto;
    max-width: 1200px;
    border-radius: 10px;
}

.heart {
    position: absolute;
    top: 10%;
    left: 95%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: #000000;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
}

.texto {
    padding-top: 20px;
    padding-left: 20px;
}

.botones {
    position: absolute;
    left: 70%;
    top: 75%;
}

h3 {
    font-family: Montserrat, sans-serif;

    font-size: 100%;
    color: #000000;
    display: inline-block;
}

.filastext {
    padding-top: 15px;
}

</style>
