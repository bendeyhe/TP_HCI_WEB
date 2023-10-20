<template>
    <v-sheet class="mx-auto" elevation="8">
        <RouterLink :to="{ name: 'favourite-routines' }" v-if="nombreRutina==='Favoritas'" class="favor">
                                <h1 class="titulo">Favoritas</h1>
        </RouterLink>
        <h1 v-else class="titulo">{{ nombreRutina }}</h1>
        <v-slide-group
            v-model="model"
            multiple
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
            :max-visible="1"
        >
            <v-slide-group-item
                v-for="routine in favourite ? routineStore.getfavoriteRoutines() : routineStore.getAllRoutines()"
                :key="routine.id"
            >
                <!--  <v-card
                  color="grey-lighten-1"
                  :class="['ma-4', selectedClass]"
                  height="200"
                  width="100"
                  @click="toggle"
                  >
  -->
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
                        <v-card-actions>
                            <RouterLink :to="{ name: 'routine-details', params: { id: routine.id } }">
                                <v-btn variant="tonal">Ver Detalle</v-btn>
                            </RouterLink>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoutineStore } from "@/stores/routineStore.js";
import { RouterLink } from "vue-router";
import ImageWithFavIcon from "@/components/ImageWithFavIcon.vue";

const loading = ref(false);
const routineStore = useRoutineStore();
const model = ref([]);



onBeforeMount(() => {
    getRoutines();
    getFavs();
});

async function getFavs() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success) {
        for (let i = 0; i < result.data.totalCount; i++) {
            if (result.data.content[i].metadata.fav) {
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

async function getRoutines() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success) {
        for (let i = 0; i < result.data.totalCount; i++) {
            const routine = result.data.content[i];
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
    loading.value = false;
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
}
</script>

<script>
export default {
    data: () => ({
        model: [],
    }),
    props: {
        nombreRutina: String,
        favourite: Boolean,
    },
};
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
    text-align: center;
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

.favor {
    text-decoration: none;
    color: #000000;
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


/*array de favs
getFavs
*/
</style>
