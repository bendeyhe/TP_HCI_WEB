<template>
    <AppBar/>
    <div class="width mx-auto gg">
        <PaginationGrid :typeRout="param" :query="query"/>
    </div>
    <footerComponent/>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import PaginationGrid from "@/components/PaginationGrid.vue";
import footerComponent from "@/components/FooterComponent.vue";
import {toRefs, onBeforeMount} from "vue";
import {defineProps} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const param = "Routs";

onBeforeMount(() => {
});

const props = defineProps({
    query: {
        type: String,
        required: true
    },
});

const {query} = toRefs(props);
</script>

<style scoped>
.gg {
    margin-bottom: 100px;
}
</style>
