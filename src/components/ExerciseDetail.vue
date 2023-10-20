<template>
    <v-card
        :loading="loading"

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
        <div class="cont">

        </div>

        <v-card-item>
            <v-card-item>
                <!-- traer dinamicamente de exercise.img-->
                <img
                    class="image"
                    src="routine1.jpg"
                    alt="Foto del Ejercicio"
                    height="150"
                />
            </v-card-item>
            <v-card-title> exercise.name </v-card-title>
            <!--<v-card-subtitle>
              <span class="me-1">Local Favorite</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
            -->
        </v-card-item>
        <v-card-text>
            <v-row allign="center" class="mx-0">

            </v-row>
            <div class="creator my-4 text-subtitle-1">
            </div>
            <div class="overflow"> exercise.description </div>
        </v-card-text>
        <div class="detail">

        </div>
    </v-card>
</template>
<script setup>

</script>
