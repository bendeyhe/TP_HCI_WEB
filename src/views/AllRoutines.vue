<template>
    <div class="width md-auto gg" >
        <PaginationGrid  :typeRout="param"/>
    </div>
</template>

<script setup>
import { useRoutineStore } from "@/stores/routineStore";
import PaginationGrid from "@/components/PaginationGrid.vue";
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
