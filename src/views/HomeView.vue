<template>
    <AppBar v-if="isLogged"/>
    <AppBarWithoutSearch v-else/>
    <v-app id="inspire">

        <v-carousel cycle show-arrows="hover" hide-delimiter-background v-if="!loading">
            <v-carousel-item
                v-for="routine in topRoutines.values()"
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
        <v-main>
            <!--todo quizas aca esta bueno hacer un v-for?-->
            <RoutineByCategories :nombreRutina="category1" :favourite="false"/>
            <RoutineByCategories :nombreRutina="category2" :favourite="false"/>
            <RoutineByCategories :nombreRutina="category3" :favourite="false"/>
            <RoutineByCategories :nombreRutina="category4" :favourite="true"/>
            <RoutineByCategories :nombreRutina="category5" :favourite="false"/>
        </v-main>
    </v-app>
    <footer-component/>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import RoutineByCategories from "@/components/RoutineByCategories.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import routineByCategories from "../components/RoutineByCategories.vue";
import {useUserStore} from "@/stores/userStore";
import {useRoutineStore} from "@/stores/routineStore";
import AppBarWithoutSearch from "@/components/AppBarWithoutSearch.vue";
import {onBeforeMount, ref} from "vue";
import router from "@/router";

const userStore = useUserStore();
const routineStore = useRoutineStore();
const topRoutines = ref([]);
const loading = ref(false);

function isLogged() {
    return userStore.getTokenState() !== null && userStore.getTokenState() !== '';
}

onBeforeMount(async () => {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success) {
        for (let i = 0; i < 10; i++) {
            const routine = result.data.content[i];
            if (routine && routine.metadata?.image) {
                topRoutines.value.push(routine);
            }
        }
    }
    loading.value = false;
});

function verDetalle(routine) {
    router.push({name: 'routine-details', params: {id: routine.id}});
}
</script>


<script>
export default {
    data: () => ({
        category1: "Dificultad fácil",
        category2: "Dificultad media",
        category3: "Dificultad difícil",
        category4: "Favoritas",
        category5: "Otras",
        drawer: null,
    }),
}
</script>

<style scoped>

.SearchBar {
    margin-left: auto;
    margin-right: auto;
}

.v-btn {
    color: #8efd00;
    margin-right: 10px;
    margin-left: 10px;
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
    right: 20px; /* Ajusta la posición horizontal según tus necesidades */

}

.boton {
    background-color: #8efd00;
    color: #000000;
}

</style>
