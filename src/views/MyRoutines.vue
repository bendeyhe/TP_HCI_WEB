<template>
    <div class="width mx-auto gg">
        <PaginationGrid :typeRout="param"/>
    </div>
</template>

<script setup>
import PaginationGrid from "@/components/PaginationGrid.vue";

const param = "myRouts";
</script>

<style scoped>
    .gg {
        margin-bottom: 100px;
    }
</style>
