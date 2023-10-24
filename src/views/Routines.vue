<template>
    <div class="width mx-auto gg">
        <PaginationGrid :typeRout="param" :query="query"/>
    </div>
</template>

<script setup>
import PaginationGrid from "@/components/PaginationGrid.vue";
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
