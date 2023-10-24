<template>
  <div >
    <v-app id="inspire">

      <v-carousel cycle show-arrows="hover" hide-delimiter-background v-if="!loading" height="400px">
        <v-carousel-item
            v-for="routine in topRoutines.values()"
            :src="routine.metadata.image"
            cover
        >
          <div class="nombre-rutina">
            {{ routine.name }}
          </div>
          <div class="detalles-rutina">
            Creador: {{ routine.user.username }} <br>
            Dificultad: {{  traducirDificultadAespanol(routine.difficulty)  }}
          </div>
          <div class="boton-rutina">
            <v-btn class="boton" @click="verDetalle(routine)"> Ver Detalle</v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
      <v-main>

        <div class="d-flex align-center flex-column pa-6">
          <v-btn-toggle
              v-model="toggle"
              divided
              variant="outlined"
          >

            <RouterLink to="/">
              <v-tooltip
                  :location="location"
                  :origin="origin"
                  no-click-animation>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-view-headline" class="boton-lista"></v-btn>
                </template>
                <div> Ver rutinas según su dificultad</div>
              </v-tooltip>
            </RouterLink>

            <RouterLink to="/all-routines">
              <v-tooltip
                  :location="location"
                  :origin="origin"
                  no-click-animation>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-view-grid" class="boton-cuadricula"></v-btn>
                </template>
                <div> Ver todas las rutinas</div>
              </v-tooltip>
            </RouterLink>
          </v-btn-toggle>
        </div>

        <RoutineByCategories :nombreRutina="category1" :favourite="false" dif="facil"/>
        <RoutineByCategories :nombreRutina="category2" :favourite="false" dif="medio"/>
        <RoutineByCategories :nombreRutina="category3" :favourite="false" dif="dificil"/>
        <RoutineByCategories :nombreRutina="category4" :favourite="true" dif="todas"/>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import RoutineByCategories from "@/components/RoutineByCategories.vue";
import routineByCategories from "../components/RoutineByCategories.vue";
import {useUserStore} from "@/stores/userStore";
import {useRoutineStore} from "@/stores/routineStore";
import {onBeforeMount, ref} from "vue";
import router from "@/router";

const userStore = useUserStore();
const routineStore = useRoutineStore();
const topRoutines = ref([]);
const loading = ref(false);

function isLogged() {
  return userStore.getTokenState() !== null && userStore.getTokenState() !== '';
}

function traducirDificultadAespanol(dificultadEnIngles) {
  const traducciones = {
    'rookie': 'principiante',
    'beginner': 'amateur',
    'intermediate': 'intermedio',
    'advanced': 'avanzado',
    'expert': 'experto'
  };
  return traducciones[dificultadEnIngles] || dificultadEnIngles;
}

onBeforeMount(async () => {
  loading.value = true;
  const result = await routineStore.getRoutines();
  if (result.success) {
    for (let i = 0; i < 10; i++) {
      const routine = result.data.content[i];
      if (routine && routine.metadata?.image) {
        topRoutines.value.push(routine);
      }
    }
  }
  loading.value = false;
});

function verDetalle(routine) {
  router.push({name: 'routine-details', params: {id: routine.id}});
}

import {computed, watch} from 'vue'

const locationSide = ref('top')
const locationAlign = ref('center')
const originSide = ref('auto')
const originAlign = ref('')

const location = computed(() => {
  return `${locationSide.value} ${locationAlign.value}`
})
const origin = computed(() => {
  return originDisabled.value ? originSide.value : `${originSide.value} ${originAlign.value}`
})
const code = computed(() => {
  return `<v-tooltip location="${location.value}" origin="${origin.value}" />`
})
const originDisabled = computed(() => {
  return ['auto', 'overlap'].includes(originSide.value)
})

watch(locationSide, val => {
  if (['top', 'bottom'].includes(val)) {
    locationAlign.value = {
      top: 'start',
      bottom: 'end',
    }[locationAlign.value] || locationAlign.value
  } else {
    locationAlign.value = {
      start: 'top',
      end: 'bottom',
    }[locationAlign.value] || locationAlign.value
  }
})
watch(originDisabled, val => {
  if (!val && !originAlign.value) {
    originAlign.value = 'center'
  }
})
</script>


<script>
export default {
  data: () => ({
    category1: "Dificultad Fácil",
    category2: "Dificultad Media",
    category3: "Dificultad Difícil",
    category4: "Favoritas",
    drawer: null,
    toggle: null,
  }),
}
</script>

<style scoped>

.SearchBar {
  margin-left: auto;
  margin-right: auto;
}


.nombre-rutina {
  position: absolute;
  top: 20px; /* Ajusta la posición vertical según tus necesidades */
  left: 20px; /* Ajusta la posición horizontal según tus necesidades */
  color: white; /* Color del texto */
  font-size: 45px; /* Tamaño de la fuente del texto */
  font-weight: bolder;
  font-family: Montserrat, sans-serif;
  padding: 10px; /* Espaciado interior del texto */
  background-color: black;
  border-radius: 5px;
}

.detalles-rutina {
  position: absolute;
  bottom: 20px; /* Ajusta la posición vertical según tus necesidades */
  left: 20px; /* Ajusta la posición horizontal según tus necesidades */
  color: white; /* Color del texto */
  font-size: 20px; /* Tamaño de la fuente del texto */
  font-family: Montserrat, sans-serif;
  padding: 10px; /* Espaciado interior del texto */
  background-color: black;
  border-radius: 5px;
}


.detalle-rutina {
  color: white; /* Color del texto */
  font-size: 20px; /* Tamaño de la fuente del texto */
  font-family: Montserrat, sans-serif;
  background-color: black;
}

.boton-rutina {
  position: absolute;
  bottom: 30px; /* Ajusta la posición vertical según tus necesidades */
  right: 25px; /* Ajusta la posición horizontal según tus necesidades */

}


.boton {
  background-color: #8efd00;
  color: #000000;
}

.boton-lista {
  color: black;
}

.boton-cuadricula {
  color: black;
}
</style>
