<template>
  <v-app id="inspire">
    <!--<v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
-->
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

      <v-container>
        <v-row>
          <template v-for="n in 4" :key="n">
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong>Category {{ n }}</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-container>
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
