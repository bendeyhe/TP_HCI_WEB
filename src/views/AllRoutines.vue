<template>
    <AppBar />
    <div class="width md-auto gg" >
        <PaginationGrid  :typeRout="param"/>
    </div>
    <FooterComponent />
</template>

<script setup>
import { useRoutineStore } from "@/stores/routineStore";
import AppBar from "@/components/AppBar.vue";
import PaginationGrid from "@/components/PaginationGrid.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {ref, onBeforeMount} from "vue";

const routineStore = useRoutineStore();
const routines = ref(null);


const param = "All"

</script>

<style scoped>
.gg{
    margin-bottom: 100px;
}
</style>