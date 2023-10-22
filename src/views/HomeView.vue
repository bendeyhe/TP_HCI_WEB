<template>
    <AppBar v-if="isLogged"/>
    <AppBarWithoutSearch v-else/>
    <v-app id="inspire">

        <v-carousel cycle show-arrows="hover" hide-delimiter-background>
            <v-carousel-item
                src="https://img.asmedia.epimg.net/resizer/3kjYbfgz9L4yg96V8Yb8qKFnI84=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EGRQNQBFYJNNZK2E5LRAJOBULQ.jpg"
                cover
            >
                <div class="nombre-rutina">
                    Nombre Rutina
                </div>
                <div class="detalles-rutina">
                    Creador: creador de la rutina <br>
                    Dificultad:  dificultad de la rutina
                </div>
                <div class="boton-rutina">
                    <v-btn class="boton"> Ver Detalle </v-btn>
                </div>

            </v-carousel-item>

            <v-carousel-item
                src="https://www.muscleandfitness.com/wp-content/uploads/2020/05/Focused-Fit-Man-Running-On-A-Treadmill.jpg?quality=86&strip=all"
                cover
            >
                <div class="nombre-rutina">
                    Nombre Rutina
                </div>
                <div class="detalles-rutina">
                    Creador: creador de la rutina <br>
                    Dificultad:  dificultad de la rutina
                </div>
                <div class="boton-rutina">
                    <v-btn class="boton"> Ver Detalle </v-btn>
                </div>
            </v-carousel-item>

            <v-carousel-item
                src="https://media.istockphoto.com/id/1418215624/photo/panoramic-side-view-of-beautiful-young-asian-woman-running-on-treadmill-and-listening-to.webp?b=1&s=170667a&w=0&k=20&c=GFbpktAEzDGZWvMqFDjKPhNlKLrb9h1N6y6_woZ91y4="
                cover
            >
                <div class="nombre-rutina">
                    Nombre Rutina
                </div>
                <div class="detalles-rutina">
                    Creador: creador de la rutina <br>
                    Dificultad:  dificultad de la rutina
                </div>
                <div class="boton-rutina">
                    <v-btn class="boton"> Ver Detalle </v-btn>
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
import AppBarWithoutSearch from "@/components/AppBarWithoutSearch.vue";

const userStore = useUserStore();

function isLogged() {
    return userStore.getTokenState() !== null && userStore.getTokenState() !== '';
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
