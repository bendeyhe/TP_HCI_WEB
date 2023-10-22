<template>
    <v-card
        class="mx-auto my-12"
        width="280"
        height="450"
    >
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

        <div v-if="exercise.name !== ''">
                    <img
                        class="image"
                        :src="exercise.url"
                        alt="Foto del Ejercicio"
                        height="175"
                    />
                <v-card-text class="titulo"> {{ exercise.name }}</v-card-text>
            <v-card-text>
                <v-row allign="center" class="mx-0">

                </v-row>
                <div class="overflow"> {{ exercise.detail }}</div>
            </v-card-text>
        </div>
        <div v-else>
            <v-card-text>Seleccione o cree un ejercicio para agregar a la rutina</v-card-text>
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

<style scoped>
.titulo {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;

}

.overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.image {
    width: 100%
}
</style>

