<template>
    <AppBar/>
    <div class="width mx-auto">
        <PaginationGrid :is-fav="false"/>
    </div>
    <footerComponent/>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import PaginationGrid from "@/components/PaginationGrid.vue";
import footerComponent from "@/components/FooterComponent.vue";
</script>
