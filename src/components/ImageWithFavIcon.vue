<template>
    <v-card
        max-width="400"
        class="mx-auto"
    >
        <v-container class="pa-1">
            <v-item-group
                v-model="selection"
                multiple
                class="d-flex flex-row"
            >
            <v-item
                v-for="(item, i) in items"
                :key="i"
                v-slot="{ isSelected, toggle }"
            >
                <v-img
                    :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                    cover
                    height="200"
                    class="text-right pa-2"
                    @click="toggle"
                >
                    <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
                </v-img>
            </v-item>
            </v-item-group>
        </v-container>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

const items = [
    {
        src: 'backgrounds/bg.jpg',
    },
    {
        src: 'backgrounds/md.jpg',
    },
    {
        src: 'backgrounds/bg-2.jpg',
    },
    {
        src: 'backgrounds/md2.jpg',
    },
]

const selection = ref([])
</script>

<script>
export default {
    data: () => ({
        items: [
            {
                src: 'backgrounds/bg.jpg',
            },
            {
                src: 'backgrounds/md.jpg',
            },
            {
                src: 'backgrounds/bg-2.jpg',
            },
            {
                src: 'backgrounds/md2.jpg',
            },
        ],
        selection: [],
    }),
}
</script>
