<template>
    <v-sheet class="mx-auto" elevation="8">
        <h2 class="titulo">{{ nombreRutina }}</h2>
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
                    max-width="374"
                >
                    <template v-slot:loader="{ isActive }">
                        <v-progress-linear
                            :active="isActive"
                            height="4"
                            indeterminate
                        ></v-progress-linear>
                    </template>


                    <img :src="getImageUrl( 'routine1.jpg' )" alt="Foto de la Rutina" height="250"/>
                    <!-- todo aca queria poner {{ routine.img  }} pero no funciona... ¿como se hace?-->
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

                        <div class="my-4 text-subtitle-1">
                            <v-icon icon="mdi-account"></v-icon>
                            • {{ routine.creator }}
                        </div>

                        <div>{{ routine.description }}</div>
                    </v-card-text>

                    <v-divider class="mx-4 mb-1"></v-divider>
                    <!--
                        <v-card-title>Tonight's availability</v-card-title>

                        <div class="px-4">
                          <v-chip-group v-model="selection">
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                          </v-chip-group>
                        </div>
                    -->
                    <v-card-actions>
                        <RouterLink to="/routine-details">

                            <v-btn>
                                Ver Detalle
                            </v-btn>
                        </RouterLink>
                    </v-card-actions>
                </v-card>
                <!--       <div class="d-flex fill-height align-center justify-center">
                   <v-scale-transition>
                     <v-icon
                       v-if="isSelected"
                       color="white"
                       size="48"
                       icon="mdi-close-circle-outline"
                     ></v-icon>
                   </v-scale-transition>
                 </div>

                       </v-card>        -->
                <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
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
</style>
