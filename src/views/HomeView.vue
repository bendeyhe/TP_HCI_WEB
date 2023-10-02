<template>
  <v-app id="inspire">

  <AppBar/>

    <v-carousel cycle show-arrows="hover">
      <v-carousel-item
        src="https://img.asmedia.epimg.net/resizer/3kjYbfgz9L4yg96V8Yb8qKFnI84=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EGRQNQBFYJNNZK2E5LRAJOBULQ.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://www.muscleandfitness.com/wp-content/uploads/2020/05/Focused-Fit-Man-Running-On-A-Treadmill.jpg?quality=86&strip=all"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://media.istockphoto.com/id/1418215624/photo/panoramic-side-view-of-beautiful-young-asian-woman-running-on-treadmill-and-listening-to.webp?b=1&s=170667a&w=0&k=20&c=GFbpktAEzDGZWvMqFDjKPhNlKLrb9h1N6y6_woZ91y4="
        cover
      ></v-carousel-item>
    </v-carousel>


    <v-main class="bg-grey-lighten-2">

      <RoutineByCategories/>
      <RoutineByCategories/>
      <RoutineByCategories/>
      <RoutineByCategories/>

    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppBar from "@/components/AppBar.vue";
import RoutineByCategories from "@/components/RoutineByCategories.vue";
const drawer = ref(null)

</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>

<style scoped>

.SearchBar{
  margin-left: auto;
  margin-right: auto;
}

.v-btn{
  color: #8efd00;
  margin-right : 10px;
  margin-left : 10px;
}
</style>
