<template>
    <AppBar/>
    <div  class="total-height">
      <div class="bottom-heigh d-flex  width">
        <div  class=" general-area width mx-auto ">
          <div class="pt-10 text flex-column" >
            <div class="width" >
              <h1 class="pb-10 favdiv" >Favourite Routines</h1>
            </div>
          <div v-if="routineStore.getfavoriteRoutines() === null || routineStore.getfavoriteRoutines() === 0" class="flex-container">
            <h2>Looks like you haven't liked any routines. I'm sure you'll find one you enjoy! ʕ•ᴥ•ʔ</h2>
          </div>
          <div v-else class="width mx-auto">
            <PaginationGrid  :routineArray="routineStore.getfavoriteRoutines()"/>
          </div>
          </div>
        </div>
      </div>
    </div>
    <footerComponent/>
</template>

<script setup>
import {ref} from 'vue'
import AppBar from "@/components/AppBar.vue";
import { useRoutineStore } from '@/stores/routineStore';
import PaginationGrid from "@/components/PaginationGrid.vue";
import { onBeforeMount } from 'vue';
import footerComponent from "@/components/FooterComponent.vue";


const drawer = ref(null)
const routineStore = useRoutineStore();
const loading = ref(false);

onBeforeMount(() => {

    getFavs();
});

async function getFavs() {
    loading.value = true;
    const result = await routineStore.getRoutines();

    if (result.success) {
        for (let i = 0; i < result.data.totalCount; i++) {
            if (result.data.content[i].metadata.fav) {
                const routine = result.data.content[i];
                routineStore.addFavoriteRoutine({
                    id: routine.id,
                    name: routine.name,
                    img: routine.metadata.image,
                    category: routine.category,
                    description: routine.detail,
                    creator: routine.user,
                    difficulty: routine.difficulty,
                    isPublic: routine.isPublic,
                    fav: routine.metadata.fav,
                    date: routine.date,
                    score: routine.metadata.score,
                });
            }
        }
    }
    loading.value = false;
}



async function getRoutines() {
    loading.value = true;
    const result = await routineStore.getRoutines();
    if (result.success) {
        for (let i = 0; i < result.data.totalCount; i++) {
            const routine = result.data.content[i];
            routineStore.addRoutineArray({
                id: routine.id,
                name: routine.name,
                img: routine.metadata.image,
                category: routine.category,
                description: routine.detail,
                creator: routine.user,
                difficulty: routine.difficulty,
                isPublic: routine.isPublic,
                fav: routine.metadata.fav,
                date: routine.date,
                score: routine.metadata.score,
            });
        }
    }
    loading.value = false;
}

</script>

<style scoped>

.favdiv {
  font-size: 50px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
