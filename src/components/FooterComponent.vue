<template>
    <v-footer>
        <v-row>
            <v-col class="text-left" cols="12" sm="4">
                <span class="white--text">&copy; 2023</span>
            </v-col>
            <v-col class="text-center" cols="12" sm="4">
                <span class="white--text">CANDISANO - DEYHERALDE - MUTZ - VES LOSADA</span>
            </v-col>
            <v-col class="text-right" cols="12" sm="4">
                <span class="white--text">
                    <img :src="getImageUrl('itba-logo.jpg')" alt="ITBA"/>
                    <!--
                    -->
                </span>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script setup>
function getImageUrl(name){
    return new URL(`../assets/${name}`, import.meta.url).href
}
</script>


<style scoped>
.v-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.47);
    z-index: 1000;
}


img {
    width: 120px;
    height: 50px;
}
</style>
