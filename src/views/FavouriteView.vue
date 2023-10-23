<template>
    <AppBar/>
    <div class="width mx-auto gg" >
        <PaginationGrid :typeRout="param"/>
    </div>
    <footerComponent/>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import PaginationGrid from "@/components/PaginationGrid.vue";
import footerComponent from "@/components/FooterComponent.vue";

const param = "fav";
</script>

<style scoped>
.gg{
    margin-bottom: 100px;
}
</style>
