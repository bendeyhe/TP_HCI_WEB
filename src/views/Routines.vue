<template>
    <AppBar/>
    <div class="width mx-auto">
        <PaginationGrid :typeRout="param"/>
    </div>
    <footerComponent/>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import PaginationGrid from "@/components/PaginationGrid.vue";
import footerComponent from "@/components/FooterComponent.vue";
import {toRefs} from "vue";

const param = "Routs";

const props = defineProps({
    query: {
        type: String,
        required: true
    },
});

const {query} = toRefs(props);
</script>
