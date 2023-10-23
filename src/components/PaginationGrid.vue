<template>
    <h1 v-if="typeRout === 'fav'">Rutinas Favoritas</h1>
    <h1 v-if="typeRout === 'myRouts'">Mis Rutinas</h1>


    <div v-if="typeRout === 'All'">
        <v-carousel cycle show-arrows="hover" hide-delimiter-background v-if="!loading">
            <v-carousel-item
                v-for="routine in topRoutines?.values()"
                :src="routine.metadata.image"
                cover
            >
                <div class="nombre-rutina">
                    {{ routine.name }}
                </div>
                <div class="detalles-rutina">
                    Creador: {{ routine.user.username }} <br>
                    Dificultad: {{ routine.difficulty }}
                </div>
                <div class="boton-rutina">
                    <v-btn class="boton" @click="verDetalle(routine)"> Ver Detalle</v-btn>
                </div>
            </v-carousel-item>
        </v-carousel>

        <div class="d-flex align-center flex-column pa-6">
            <v-btn-toggle
                v-model="toggle"
                divided
                variant="outlined"
            >

                <RouterLink to="/">
                    <v-tooltip
                        :location="location"
                        :origin="origin"
                        no-click-animation>
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-view-headline" class="boton-lista"></v-btn>
                        </template>
                        <div> Ver rutinas según su dificultad </div>
                    </v-tooltip>
                </RouterLink>

                <RouterLink to="/all-routines">
                    <v-tooltip
                        :location="location"
                        :origin="origin"
                        no-click-animation>
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-view-grid" class="boton-cuadricula"></v-btn>
                        </template>
                        <div> Ver todas las rutinas </div>
                    </v-tooltip>
                </RouterLink>
            </v-btn-toggle>
        </div>
    </div>
    <div v-if="visibleRoutines.length > 0">
        <h1 v-if="typeRout === 'All'" class="titulo">Todas las Rutinas</h1>
        <v-row class="width">
            <v-col cols="4" v-for="(routine, index) in visibleRoutines"
                   :key="routine.index"
                   v-bind:visibleRoutines="visibleRoutines"
                   v-bind:pageNumber="pageNumber"
                   v-bind:routine="routine"
            >
                <v-card
                    :loading="loading"

                    class="mx-auto my-12"
                    width="280"
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

                        <v-btn v-if="typeRout === 'fav' || typeRout === 'All'"
                               class="heart"
                               :icon="
                                routine.fav ? 'mdi-heart' : 'mdi-heart-outline'
                            "
                               @click="toggle(routine)"
                        ></v-btn>
                        <v-btn v-else
                               class="heart"
                               icon="mdi-pencil"
                               @click="editRoutine(routine)"
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

                        <v-card-actions>
                            <RouterLink :to="{ name: 'routine-details', params: { id: routine.id } }">
                                <v-btn>Ver Detalle</v-btn>
                            </RouterLink>
                            <v-spacer></v-spacer>
                            <v-btn v-if="typeRout.value === 'myRouts'"
                                   icon="mdi-trash-can-outline"
                                   @click="deleteRout(routine)"
                                   class="red-hover"
                            ></v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <div class="pagination-container">
            <v-pagination v-if="amountPages > 1"
                          v-model="pageNumber"
                          :length="amountPages"
                          circle
                          @input="inputPage"
                          color="secondary"
                          class="mx-auto pagination mx-auto">
                <template v-slot:prev>
                    <v-btn @click="previousPage" :disabled="pageNumber === 1">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </template>
                <template v-slot:next>
                    <v-btn @click="nextPage" :disabled="pageNumber === amountPages  ">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </template>

            </v-pagination>
        </div>
    </div>
    <div v-else>
        <div v-if="typeRout === 'fav'" class="flex-container">
            <h2>No tienes ninguna rutina en favoritos.
            </h2>
        </div>
        <div v-else-if="typeRout === 'MyRouts'" class="flex-container">
            <h2>Todavía no creaste ninguna rutina.</h2>
        </div>
        <div v-else class="flex-container">
            <h2>No se han encontrado resultados</h2>
        </div>
    </div>
</template>

<script setup>

import {ref, onBeforeMount, toRefs} from 'vue';
import {useRoutineStore} from '@/stores/routineStore.js';
import {useUserStore} from "@/stores/userStore";
import router from "@/router";

const page = ref(1);
const pageNumber = ref(1);
const pageSize = ref(9);
const visibleRoutines = ref([]);
const routineArray = ref([]);
const amountPages = ref(1);
const loading = ref(false);
const routineStore = useRoutineStore();
const userStore = useUserStore();
const topRoutines = ref([]);

const props = defineProps({
    typeRout: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: false
    },
});

const {typeRout, query} = toRefs(props);

async function getFavs() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success && result.data.content) {
        for (let i = 0; i < result.data.totalCount; i++) {
            if (result.data.content[i] && result.data.content[i].metadata.fav) {
                const routine = result.data.content[i];
                routineStore.addFavoriteRoutine({
                    id: routine.id,
                    name: routine.name,
                    img: routine.metadata.image,
                    category: routine.category,
                    description: routine.detail,
                    creator: routine.user,
                    difficulty: routine.difficulty,
                    isPublic: routine.isPublic,
                    fav: routine.metadata.fav,
                    date: routine.date,
                    score: routine.metadata.score,
                });
            }
        }
    }
    loading.value = false;
}

async function getMyRoutines() {
    debugger;
    loading.value = true;
    let result = await userStore.getCurrentUser();
    if (result.success) {
        const user = result.data;
        result = await userStore.getCurUserRoutines();
        if (result.success && result.data.content) {
            for (let i = 0; i < result.data.content.length; i++) {
                const routine = result.data.content[i];
                routineStore.addMyRoutine({
                    id: routine.id,
                    name: routine.name,
                    img: routine.metadata.image,
                    //category: routine.category,
                    description: routine.detail,
                    creator: user,
                    difficulty: routine.difficulty,
                    isPublic: routine.isPublic,
                    fav: routine.metadata.fav,
                    date: routine.date,
                    score: routine.metadata.score,
                });
            }
        }
    }
    loading.value = false;
}

async function getRoutines() {
    try {


        loading.value = true;
        const result = await routineStore.getRoutines();
        if (query.value === undefined || query.value === null)
            query.value = "";
        routineStore.clearRoutineArray();
        if (result.success && result.data.content) {
            for (let i = 0; i < result.data.content.length; i++) {
                const routine = result.data.content[i];
                if (routine && routine.name) {
                    const routineNameLower = routine.name.toLowerCase();
                    const queryLower = query.value.toLowerCase();
                    if (routineNameLower.includes(queryLower)) {
                        routineStore.addRoutineArray({
                            id: routine.id,
                            name: routine.name,
                            img: routine.metadata.image,
                            category: routine.category,
                            description: routine.detail,
                            creator: routine.user,
                            difficulty: routine.difficulty,
                            isPublic: routine.isPublic,
                            fav: routine.metadata.fav,
                            date: routine.date,
                            score: routine.metadata.score,
                        });
                    }
                }
            }
        }
        loading.value = false;
    } catch (e) {
        debugger;
    }
}

async function getAllRoutines() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success && result.data.content) {
        for (let i = 0; i < result.data.totalCount; i++) {
            const routine = result.data.content[i];
            if (routine && routine.name) {
                routineStore.addRoutineArray({
                    id: routine.id,
                    name: routine.name,
                    img: routine.metadata.image,
                    category: routine.category,
                    description: routine.detail,
                    creator: routine.user,
                    difficulty: routine.difficulty,
                    isPublic: routine.isPublic,
                    fav: routine.metadata.fav,
                    date: routine.date,
                    score: routine.metadata.score,
                });
            }
        }
    }
    loading.value = false;
}

async function updateVisibleRoutines() {
    if (typeRout.value === "fav") {
        await getFavs();
        visibleRoutines.value = Array.from(routineStore.getfavoriteRoutines()).slice(
            (pageNumber.value - 1) * pageSize.value,
            pageNumber.value * pageSize.value
        );
        routineArray.value = Array.from(routineStore.getfavoriteRoutines());
        amountPages.value = Math.ceil(routineArray.value.length / pageSize.value);
        if (visibleRoutines.value.length === 0 && pageNumber.value > 0)
            updatePage(pageNumber.value - 1)
    } else if (typeRout.value === "myRouts") {
        await getMyRoutines();
        visibleRoutines.value = Array.from(routineStore.getMyRoutines()).slice(
            (pageNumber.value - 1) * pageSize.value,
            pageNumber.value * pageSize.value
        );
        routineArray.value = Array.from(routineStore.getMyRoutines());
        amountPages.value = Math.ceil(routineArray.value.length / pageSize.value);
        if (visibleRoutines.value.length === 0 && pageNumber.value > 0)
            updatePage(pageNumber.value - 1)
    } else if (typeRout.value === "All") {
        await getAllRoutines();
        visibleRoutines.value = Array.from(routineStore.getAllRoutines()).slice(
            (pageNumber.value - 1) * pageSize.value,
            pageNumber.value * pageSize.value
        );
        routineArray.value = Array.from(routineStore.getAllRoutines());
        amountPages.value = Math.ceil(routineArray.value.length / pageSize.value);
        if (visibleRoutines.value.length === 0 && pageNumber.value > 0)
            updatePage(pageNumber.value - 1)

    } else {
        await getRoutines();
        visibleRoutines.value = Array.from(routineStore.getAllRoutines()).slice(
            (pageNumber.value - 1) * pageSize.value,
            pageNumber.value * pageSize.value
        );
        routineArray.value = Array.from(routineStore.getAllRoutines());
        amountPages.value = Math.ceil(routineArray.value.length / pageSize.value);
        if (visibleRoutines.value.length === 0 && pageNumber.value > 0)
            updatePage(pageNumber.value - 1)
    }
}

async function toggle(routine) {
    if (routine.fav) routineStore.removeFavoriteRoutine(routine);
    else routineStore.addFavoriteRoutine(routine);
    routine.fav = !routine.fav;
    const result = await routineStore.changeRoutine(routine);
    if (!result.success)
        routine.fav = !routine.fav;
    await updateVisibleRoutines();
}

async function editRoutine(routine) {
    await router.push({name: 'edit-routine', params: {id: routine.id}});
}

async function deleteRout(routine) {
    const result = await routineStore.deleteRoutine(routine.id);
    if (result.success) {
        routineStore.removeMyRoutine(routine);
        routineStore.removeRoutines(routine)
        await updateVisibleRoutines()
    }
}

function updatePage(PageNumber) {
    pageNumber.value = PageNumber;
    updateVisibleRoutines();
}

async function nextPage() {
    pageNumber.value = pageNumber.value + 1;
    await updateVisibleRoutines();
}

async function previousPage() {
    pageNumber.value = pageNumber.value - 1;
    await updateVisibleRoutines();

}

function inputPage(number) {
    pageNumber.value = number;
    updateVisibleRoutines();
}

onBeforeMount(async () => {
    if(typeRout.value === "All"){
        const result = await routineStore.getRoutines();
        if (result.success) {
            for (let i = 0; i < 10; i++) {
                const routine = result.data.content[i];
                if (routine && routine.metadata?.image) {
                    topRoutines.value.push(routine);
                }
            }
        }
    }
    if (typeRout.value !== "fav" && typeRout.value !== "myRouts" && typeRout.value !== "All")
        typeRout.value = "Routs";
    await updateVisibleRoutines();
});


import { computed, watch } from 'vue'

const locationSide = ref('top')
const locationAlign = ref('center')
const originSide = ref('auto')
const originAlign = ref('')

const location = computed(() => {
    return `${locationSide.value} ${locationAlign.value}`
})
const origin = computed(() => {
    return originDisabled.value ? originSide.value : `${originSide.value} ${originAlign.value}`
})
const code = computed(() => {
    return `<v-tooltip location="${location.value}" origin="${origin.value}" />`
})
const originDisabled = computed(() => {
    return ['auto', 'overlap'].includes(originSide.value)
})

watch(locationSide, val => {
    if (['top', 'bottom'].includes(val)) {
        locationAlign.value = {
            top: 'start',
            bottom: 'end',
        }[locationAlign.value] || locationAlign.value
    } else {
        locationAlign.value = {
            start: 'top',
            end: 'bottom',
        }[locationAlign.value] || locationAlign.value
    }
})
watch(originDisabled, val => {
    if (!val && !originAlign.value) {
        originAlign.value = 'center'
    }
})
</script>

<style scoped>
h1 {
    text-align: center;
    padding-top: 25px;
}

.cont {
    position: relative;
    width: 100%;
}

.titulo {
    text-align:left;
    padding-top: 20px;
    padding-left: 20px;
}

.image {
    width: 100%;
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

.detail {
    width: 100%;
    position: absolute;
    bottom: 1%;
    left: 25%;
}

.v-btn {
    color: #000000;
}

.overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
}

.creator {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.creator-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

.pagination-container {
    display: flex;
    justify-content: center;
}

.pagination {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    text-align: center;
}

.v-row {
    display: flex;
    flex-wrap: wrap;
}

.v-col {
    flex: 1;
    margin: 40px;
}

.red-hover:hover {
    background-color: rgba(255, 0, 0, 0.4);
}

.nombre-rutina {
    position: absolute;
    top: 20px; /* Ajusta la posición vertical según tus necesidades */
    left: 20px; /* Ajusta la posición horizontal según tus necesidades */
    color: white; /* Color del texto */
    font-size: 45px; /* Tamaño de la fuente del texto */
    font-weight: bolder;
    font-family: Montserrat, sans-serif;
    padding: 10px; /* Espaciado interior del texto */
    background-color: black;
    border-radius: 5px;
}

.detalles-rutina {
    position: absolute;
    bottom: 20px; /* Ajusta la posición vertical según tus necesidades */
    left: 20px; /* Ajusta la posición horizontal según tus necesidades */
    color: white; /* Color del texto */
    font-size: 20px; /* Tamaño de la fuente del texto */
    font-family: Montserrat, sans-serif;
    padding: 10px; /* Espaciado interior del texto */
    background-color: black;
    border-radius: 5px;
}


.detalle-rutina {
    color: white; /* Color del texto */
    font-size: 20px; /* Tamaño de la fuente del texto */
    font-family: Montserrat, sans-serif;
    background-color: black;
}

.boton-rutina {
    position: absolute;
    bottom: 30px; /* Ajusta la posición vertical según tus necesidades */
    right: 25px; /* Ajusta la posición horizontal según tus necesidades */

}

.boton {
    background-color: #8efd00;
    color: #000000;
}

</style>
