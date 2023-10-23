<template>
    <AppBar/>
    <h1> Detalle de la Rutina</h1>
    <v-card class="routine-card" v-if="routine">
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-card
                        :loading="loading"
                        width="280"
                        class="card"
                        height="400"
                    >
                        <template v-slot:loader="{ isActive }">
                            <v-progress-linear
                                :active="isActive"
                                height="4"
                                indeterminate
                            ></v-progress-linear>
                        </template>
                        <div class="cont">
                            <img
                                class="image"
                                :src="routine.img"
                                alt="Foto de la Rutina"
                                height="150"
                            />
                            <v-btn
                                class="heart"
                                :icon="
                                routine.fav ? 'mdi-heart' : 'mdi-heart-outline'
                            "
                                @click="toggle(routine)"
                            ></v-btn>
                        </div>
                        <v-card-item>
                            <v-card-title>{{ routine.name }}</v-card-title>
                        </v-card-item>
                        <v-card-text>
                            <div class="creator my-4 text-subtitle-1">
                                <v-icon icon="mdi-account"></v-icon>
                                <div class="creator-text">
                                    • {{ routine.creator.username }}
                                </div>
                            </div>
                            <div class="overflow">{{ routine.description }}</div>
                        </v-card-text>
                        <div class="detail">
                        </div>
                    </v-card>
                </v-col>


                <v-col cols="2">
                    <v-autocomplete  placeholder="Seleccione el ciclo" variant="outlined"
                                     v-model="selectedCiclo"
                                    :items="['Entrada en Calor', 'Principal', 'Enfriamiento']"></v-autocomplete>
                </v-col>

                <v-col cols="6">
                    <v-row>
                        <div class="tabla">
                            <v-table height="400px">
                                <thead>
                                <tr>
                                    <th class="text-left"> <!-- v-for="ciclo in ciclos" -->
                                        Ciclo ciclo.name
                                    </th>

                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th class="text-left"> <!-- v-for="ciclo in ciclos" -->
                                        Ejercicio
                                    </th>
                                    <th class="text-left">
                                        Repeticiones/ Tiempo
                                    </th>
                                    <th class="text-left">
                                        Repeticiones del ciclo
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="item in exercises"
                                    :key="item.name"
                                >
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.calories }}</td>
                                </tr>
                                </tbody>
                            </v-table>
                        </div>


                    </v-row>

                    <v-row class="fila3">
                        <v-col>
                            <v-btn class="compartir" @click="shareRoutine"
                                   prepend-icon="mdi-share-variant"> Compartir
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn class="editar" prepend-icon="mdi-pencil"> Editar rutina
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-col>

            </v-row>
        </v-container>
    </v-card>

    <RoutineByCategories nombreRutina="Dificultad fácil" :favourite="false"/>
    <RoutineByCategories nombreRutina="Dificultad media" :favourite="false"/>
    <RoutineByCategories nombreRutina="Dificultad difícil" :favourite="false"/>
    <RoutineByCategories nombreRutina="Favoritas" :favourite="true"/>
    <RoutineByCategories nombreRutina="Otras" :favourite="false"/>

    <FooterComponent/>

    <v-dialog v-model="showShareDialog" max-width="400">
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
import FooterComponent from "@/components/FooterComponent.vue";

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


<script>
export default {
    data() {
        return {
            exercises: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                },
                {
                    name: 'Donut',
                    calories: 452,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                },
            ],
        }
    },
}

</script>

<style scoped>

.titulo {
    font-family: Montserrat, sans-serif;
    font-weight: bolder;
    font-size: 200%;
    color: #000000;
    padding-top: 10px;
    padding-left: 20px;
    display: inline-block;
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

.routine-card {
    background-color: lightgray;
    margin: 20px auto;
    border-radius: 10px;
    width: 95%;
    height: 530px;
    padding-top:20px;
}

.heart {
    position: absolute;
    top: 20%;
    left: 88%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: #000000;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
}

.cont {
    position: relative;
    width: 100%;
}

.image {
    width: 100%;
}

.creator {
    display: flex;
    align-items: center;
}

.creator-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

h3 {
    font-family: Montserrat, sans-serif;
    font-size: 100%;
    color: #000000;
    display: inline-block;
}

.tabla {
    padding-left: 20px;
    padding-top:15px;
}

.v-table {
    width: auto;
}

.editar {

    color: #000000;
    background-color: #8efd00;
    margin-right: 10px;
    margin-left: 10px;
}

.overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;
}

h1 {
    text-align: center;
    padding-top: 25px;
}

.fila3 {
    padding-top: 15px;
}

</style>
