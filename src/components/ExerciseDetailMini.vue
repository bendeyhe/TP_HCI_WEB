<template>
    <v-card
        :loading="loading"

        class="mx-auto my-12"
        width="280"
        height="475"
    >
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

            <div class="cont">
                <img
                    class="image"
                    src="https://media.istockphoto.com/id/1418215624/photo/panoramic-side-view-of-beautiful-young-asian-woman-running-on-treadmill-and-listening-to.webp?b=1&s=170667a&w=0&k=20&c=GFbpktAEzDGZWvMqFDjKPhNlKLrb9h1N6y6_woZ91y4="
                    alt="Foto del ejercicio"
                    height="150"
                />

                <v-btn
                    class="edit"
                    icon="mdi-pencil"
                    @click="edit(exercise)"
                ></v-btn>

            </div>
            <v-card-text class="titulo"> {{ exercise.name }} </v-card-text>
        <v-card-text>
            <v-row allign="center" class="mx-0">

            </v-row>
            <div class="creator my-4 text-subtitle-1">
            </div>
            <div class="overflow"> {{ exercise.detail }} </div>
        </v-card-text>
        <div class="detail">
            <v-card-actions>
                <div class="container">
                    <v-btn
                        icon="mdi-chevron-left"
                        @click="moveLeft(exercise)"
                    ></v-btn>
                    <v-btn
                        icon="mdi-trash-can-outline"
                        @click="delete(exercise)"
                        class="red-hover"
                    ></v-btn>
                    <v-btn
                        icon="mdi-chevron-right"
                        @click="moveRight(exercise)"
                    ></v-btn>
                </div>
            </v-card-actions>
        </div>
    </v-card>
</template>
<script setup>
//todo hay que hacer la función de delete(exercise)
//todo tambien estaria bueno que se pueda editar el ejercicio y cambiar el orden de los ejercicios, no se bien cómo hacerlo
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
.cont {
    position: relative;
    width: 100%;
}

.image {
    width: 100%;
}

.red-hover:hover {
    background-color: rgba(255, 0, 0, 0.4);
}

.container {
    text-align: center;
    width: 100%;
    bottom: 1%;
    position:absolute;
}

.cont {
    position: relative;
    width: 100%;
}

.image {
    width: 100%;
}

.edit {
    position: absolute;
    top: 25%;
    left: 82%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: #000000;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
}

.titulo {
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 700px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

</style>
