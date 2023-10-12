<template>
    <AppBar/>
    <v-card color="grey" class="fondo">
        <v-container fluid>
            <v-row dense>
                <v-row
                    v-for="card in cards"
                    :key="card.title"
                    :cols="card.flex"
                >
                    <v-col>
                        <v-row>
                            <h1 class="titulo">HOLA</h1>
                        </v-row>
                        <v-row>
                            <v-card width="100%">
                                <v-img
                                    :src="cards[0].src"
                                    class="align-end"
                                    height="250px"
                                    cover
                                >
                                    <v-card-title class="text-white" v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>

                                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                                    <v-btn size="small" color="surface-variant" variant="text"
                                           icon="mdi-bookmark"></v-btn>

                                    <v-btn size="small" color="surface-variant" variant="text"
                                           icon="mdi-share-variant"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row><v-icon icon="mdi-account"></v-icon> • Creador: </v-row>
                        <v-row><v-icon icon="mdi-star"></v-icon> • Puntuación: </v-row>
                        <v-row><v-icon icon="mdi-alarm"></v-icon> • Duración: </v-row>
                        <v-row><v-icon icon="mdi-dumbell"></v-icon> • Equipamiento necesario: </v-row>
                        <v-row><v-icon icon="mdi-chart-line"></v-icon> • Dificultad: </v-row>
                        <v-row>
                            <v-btn class="comenzar"> Comenzar  </v-btn>
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
    components: {RoutineByCategories, RouterLink, AppBar},
    data: () => ({
        cards: [
            {title: 'Routine 1', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12},
        ],
    }),
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
    color: #8efd00;
    background-color: #000000;
    margin-right : 10px;
    margin-left : 10px;
}

</style>
