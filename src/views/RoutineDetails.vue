<template>
    <AppBar/>
    <v-card color="grey" class="fondo">
        <v-container fluid>
            <v-row dense>
                <v-row>
                    <v-col>
                        <v-row>
                            <h1 class="titulo">RUTINA (ACA PONER NOMBRE DINAMICAMENTE)</h1>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-card width="100%">
                                <div class="cont">
                                    <v-img
                                        src="@/assets/routine1.jpg"

                                        height="300px"
                                        cover/>
                                    <v-btn class="heart" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
                                </div>

                            </v-card>
                            </v-col>
                            <v-col>
                                <div class="texto">
                                    <v-row class ="filastext"><v-icon icon="mdi-account" color="black"></v-icon><h3> • Creador: traer dinamicamente o pasar por parametro</h3></v-row>

                                    <v-row class ="filastext"><v-icon icon="mdi-star" color="black"></v-icon> <h3> • Puntuación: traer dinamicamente o pasar por parametro</h3></v-row>
                                    <v-row class ="filastext"><v-icon icon="mdi-alarm" color="black"></v-icon><h3> • Duración: traer dinamicamente o pasar por parametro</h3></v-row>
                                    <v-row class ="filastext"><v-icon icon="mdi-football" color="black"></v-icon><h3> • Equipamiento necesario: traer dinamicamente o pasar por parametro</h3></v-row>
                                    <v-row class ="filastext"><v-icon icon="mdi-chart-line" color="black"></v-icon><h3> • Dificultad: traer dinamicamente o pasar por parametro</h3></v-row>
                                </div>
                                <div class="botones">
                                    <v-row>
                                        <v-col>

                                            <v-btn class="compartir" prepend-icon="mdi-share-variant"> Compartir  </v-btn>
                                        </v-col>

                                        <v-col>

                                            <v-btn class="comenzar" prepend-icon="mdi-play-circle-outline"> Comenzar  </v-btn>
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

<RoutineByCategories nombreRutina="category1"/>
</template>


<script>
import AppBar from "@/components/AppBar.vue";
import {RouterLink} from "vue-router";
import RoutineByCategories from "@/components/RoutineByCategories.vue";


export default {
    components: {RoutineByCategories, RouterLink, AppBar}
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

.comenzar{

    color: #000000;
    background-color: #8efd00;
    margin-right : 10px;
    margin-left : 10px;
}

.compartir{
    color: #8efd00;
    background-color: #000000;
    margin-right : 10px;
    margin-left : 10px;
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
    top: 10%;
    left: 95%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: #000000;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
}

.texto{
    padding-top: 20px;
    padding-left: 20px;
}

.botones{
    position: absolute;
    left:70%;
    top:75%;
}

h3{
    font-family: Montserrat, sans-serif;

    font-size: 100%;
    color: #000000;
    display: inline-block;
}
.filastext{
    padding-top:15px;
}

</style>
