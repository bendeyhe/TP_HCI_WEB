<template>
    <v-sheet class="mx-auto" elevation="8">
        <h1 class="titulo">{{ nombreRutina }}</h1>
        <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
            :max-visible="1"
        >
            <v-slide-group-item
                v-for="routine in routineStore.routines" :key="routine.id"
                v-slot="{ isSelected, toggle, selectedClass }"
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
                        <img class="image" :src="getImageUrl( 'routine1.jpg' )" alt="Foto de la Rutina" height="250"/>
                        <!-- todo aca queria poner {{ routine.img  }} pero no funciona... ¿como se hace?-->
                        <v-btn class="heart" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
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
                        <v-row
                            align="center"
                            class="mx-0"
                        >
                            <v-rating
                                :model-value="4.5"
                                color="amber"
                                density="compact"
                                half-increments
                                readonly
                                size="small"
                            ></v-rating>

                            <div class="text-grey ms-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div class="my-4 text-subtitle-1" >
                            <v-icon icon="mdi-account"></v-icon>
                            • {{ routine.creator }}
                        </div>

                        <div class="overflow">{{ routine.description }}</div>
                    </v-card-text>
                <div class="detail">
                        <v-divider></v-divider>
                        <v-card-actions>
                            <RouterLink to="/routine-details">

                                <v-btn>
                                    Ver Detalle
                                </v-btn>
                            </RouterLink>
                        </v-card-actions>
                </div>
                    </v-card>
            </v-slide-group-item>
        </v-slide-group>

    </v-sheet>

</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import {useRoutineStore} from '@/stores/routineStore.js';
import {RouterLink} from 'vue-router';
import ImageWithFavIcon from '@/components/ImageWithFavIcon.vue';

const loading = ref(false)
const routineStore = useRoutineStore()


function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}

onBeforeMount(() => {
    loading.value = true
    routineStore.fetchRoutines()
    routineStore.fetchRoutines()
    loading.value = false
})

const model = ref(null);
</script>

<script>
export default {
    data: () => ({
        model: null,
    }),
    props: {
        nombreRutina: String,
    },
};
</script>

<style scoped>
.titulo {
    padding-top: 20px;
    padding-left: 20px;
}

.cont{
    position:relative;
    width: 100%;
 }

 .image{
    width: 100%;
    height: auto;
 }

 .heart{
     position: absolute;
     top: 15%;
     left: 85%;
     transform: translate(-50%, -50%);
     -ms-transform: translate(-50%, -50%);
     color: #000000;
     padding: 12px 24px;
     border: none;
     cursor: pointer;
 }


 .detail{
     width: 100%;
     position: absolute;
     bottom: 1%;
 }

 .v-btn{
     color: #000000;
 }

 .overflow{
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 3; /* number of lines to show */
     -webkit-box-orient: vertical;
 }
</style>
