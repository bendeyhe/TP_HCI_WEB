<template>
    <!--
    <v-sheet class="mx-auto" elevation="8">
        <h2>{{ nombreRutina }}</h2>
        <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
            :max-visible="1"
        >
            <v-slide-group-item
                v-for="n in 15"
                :key="n"
                v-slot="{ isSelected, toggle, selectedClass }"
            >
                <ImageWithFavIcon />
            </v-slide-group-item>
        </v-slide-group>

        <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
                <div class="d-flex fill-height align-center justify-center">
                    <h3 class="text-h6">Selected {{ model }}</h3>
                </div>
            </v-sheet>
        </v-expand-transition>
    </v-sheet>
    -->


    <div>
        <h2>{{ nombreRutina }}</h2>
        <img v-if="loading" :src="getImageUrl('loader.gif')" alt="Loading..."/>
        <ul v-else>
            <li v-for="routine in routineStore.routines" :key="routine.id">
                {{ routine.name }}
            </li>
            <!-- todo Ver más detalles
             armar bien la tarjeta de la rutina y
              hacer que se pueda desplazar hacia la derecha-->
        </ul>
    </div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoutineStore } from '@/stores/routineStore.js';
import ImageWithFavIcon from '@/components/ImageWithFavIcon.vue';

const loading = ref(false)
const routineStore = useRoutineStore()


function getImageUrl(name){
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
ul {
    list-style: none;
}

li{
    display: inline-block;
    margin-right: 10px;
}
</style>
