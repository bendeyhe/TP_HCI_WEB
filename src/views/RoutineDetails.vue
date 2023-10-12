<template>
    <AppBar/>
    <v-card class="mx" color="grey">
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
                        <v-row padding-bottom:20px>
                            <v-card width="100%">
                                <v-img
                                    :src="cards[0].src"
                                    class="align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="250px"
                                    cover
                                >
                                    <v-card-title class="text-white" v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

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
                        <h1 class="titulo">prueba</h1>
                    </v-col>
                </v-row>


            </v-row>
        </v-container>
    </v-card>
</template>


<script>
import AppBar from "@/components/AppBar.vue";
import {RouterLink} from "vue-router";

export default {
    components: {RouterLink, AppBar},
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
.carta {
    padding-left: 20px;
}

</style>
