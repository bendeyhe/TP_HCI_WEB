<template>
    <v-card
        class="mx-auto my-12"
        width="280"
        height="400"
    >
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

        <div v-if="exercise.name !== ''">
            <v-card-item>
                <v-card-item>
                    <img
                        class="image"
                        :src="exercise.url"
                        alt="Foto del Ejercicio"
                        height="150"
                    />
                </v-card-item>
                <v-card-title> {{ exercise.name }}</v-card-title>
            </v-card-item>
            <v-card-text>
                <v-row allign="center" class="mx-0">

                </v-row>
                <div class="creator my-4 text-subtitle-1">
                </div>
                <div class="overflow"> {{ exercise.detail }}</div>
            </v-card-text>
        </div>
        <div v-else>
            <v-card-text>Seleccione o cree un ejercicio para esta rutina</v-card-text>
        </div>
    </v-card>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    exercise: {
        type: Object,
        required: true,
    },
});

const { exercise } = toRefs(props);
</script>

