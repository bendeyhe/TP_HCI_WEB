<template>
    <v-sheet class="mx-auto" elevation="8">
        <h2>{{ nombreRutina }}</h2>
        <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
            :max-visible="1"
        >
            <v-slide-group-item
                v-for="n in 15"
                :key="n"
                v-slot="{ isSelected, toggle, selectedClass }"
            >
                <ImageWithFavIcon />
            </v-slide-group-item>
        </v-slide-group>

        <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
                <div class="d-flex fill-height align-center justify-center">
                    <h3 class="text-h6">Selected {{ model }}</h3>
                </div>
            </v-sheet>
        </v-expand-transition>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import ImageWithFavIcon from '@/components/ImageWithFavIcon.vue';

const model = ref(null);
</script>

<script>
export default {
    data: () => ({
        model: null,
    }),
    props: {
        nombreRutina: String,
    },
};
</script>
