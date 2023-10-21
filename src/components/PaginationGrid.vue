<template>
    <div >
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
                        <!-- todo aca queria poner {{ routine.img  }} pero no funciona... ¿como se hace?-->
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
                        <!--<v-card-subtitle>
                          <span class="me-1">Local Favorite</span>
                          <v-icon
                            color="error"
                            icon="mdi-fire-circle"
                            size="small"
                          ></v-icon>
                        </v-card-subtitle>
                        -->
                    </v-card-item>
                    <v-card-text>
                        <v-row allign="center" class="mx-0">
                            <v-rating
                                :model-value="routine.score"
                                color="amber"
                                density="compact"
                                half-increments
                                readonly
                                size="small"
                            ></v-rating>
                            <div class="text-grey ms-4">
                                {{ routine.score }}
                            </div>
                        </v-row>
                        <div class="creator my-4 text-subtitle-1">
                            <v-icon icon="mdi-account"></v-icon>
                            <div class="creator-text">
                                • {{ routine.creator.username }}
                            </div>
                        </div>
                        <div class="overflow">{{ routine.description }}</div>
                    </v-card-text>
                    <div class="detail">
                        <v-divider></v-divider>
                        <v-card-actions>
                            <RouterLink :to="{ name: 'routine-details', params: { id: routine.id } }">
                                <v-btn>Ver Detalle</v-btn>
                            </RouterLink>
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
  </template>
  
  
  <script setup>

import { ref, watch, computed, onBeforeMount} from 'vue';
import { useRoutineStore } from '@/stores/routineStore.js';

const page = ref(1);
const pageNumber = ref(1);
const pageSize = ref(9);
const visibleRoutines = ref([]);
const routineArray = ref([]);
const amountPages = ref(1);
const loading = ref(false);
const routineStore = useRoutineStore();



async function getFavs() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    debugger;
    if (result.success && result.data.content) {
        for (let i = 0; i < result.data.totalCount; i++) {
            if  (result.data.content[i] && result.data.content[i].metadata.fav) {
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
        console.log(routineStore.getfavoriteRoutines());
    }
    loading.value = false;
}

 async function updateVisibleRoutines() {
    await getFavs();
    visibleRoutines.value = Array.from(routineStore.getfavoriteRoutines()).slice(
    (pageNumber.value-1) * pageSize.value,
    pageNumber.value * pageSize.value 
  );
    routineArray.value = Array.from(routineStore.getfavoriteRoutines());
    amountPages.value = Math.ceil(routineArray.value.length / pageSize.value); 
    debugger;
  if(visibleRoutines.length === 0 && this.pageNumber > 0){
        updatePage(this.pageNumber - 1)
      }
}

async function toggle(routine) {
    if (routine.fav) routineStore.removeFavoriteRoutine(routine);
    else routineStore.addFavoriteRoutine(routine);
    routine.fav = !routine.fav;
    const result = await routineStore.changeRoutine(routine);
    if (!result.success) {
        routine.fav = !routine.fav;
        // todo tirar error
    }
    updateVisibleRoutines();
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
  debugger;
  pageNumber.value = number ;
  updateVisibleRoutines();
}

onBeforeMount(() => {
  console.log("creado");

  updateVisibleRoutines();
});

/*watch(page, () => {
  updateVisibleRoutines();
});*/
</script>

<style scoped>
.titulo {
    padding-top: 20px;
    padding-left: 20px;
}

.cont {
    position: relative;
    width: 100%;
}

.image {
    width: 100%;
}

.heart {
    position: absolute;
    top: 17%;
    left: 85%;
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

.pagination-container{
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

.v-col{
    flex: 1;
    margin: 40px;
}

/*array de favs
getFavs
*/
</style>
