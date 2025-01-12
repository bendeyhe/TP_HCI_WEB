<template>
  <h1> Detalle de la Rutina</h1>
  <v-card class="routine-card" v-if="routine">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card
              :loading="loading"
              width="280"
              class="card"
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
                  :src="routine.img"
                  alt="Foto de la Rutina"
                  height="150"
              />
              <v-btn
                  class="heart"
                  :icon="routine.fav ? 'mdi-heart' : 'mdi-heart-outline'"
                  @click="toggle(routine)"
              ></v-btn>
            </div>
            <v-card-item>
              <v-card-title>{{ routine.name }}</v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="creator mb-4 text-subtitle-1">
                <v-icon icon="mdi-account"></v-icon>

                <div class="creator-text">
                  • {{ routine?.creator?.username }}
                </div>

              </div>
              <div class="overflow">{{ routine?.description }}</div>
            </v-card-text>
            <div class="detail">
            </div>
          </v-card>
        </v-col>

        <v-col>
          <v-row>
            <h4>Seleccione el ciclo para ver el detalle en la tabla:</h4>
          </v-row>
          <v-row>
            <v-autocomplete placeholder="Seleccione el ciclo" variant="outlined"
                            v-model="selectedCiclo" @update="updateCiclo"
                            :items="Object.values(cycles).map(cycle => cycle.name)"></v-autocomplete>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row>
            <div class="tabla">
              <v-table height="400px" class="mr-4">
                <thead>
                <tr>
                  <th class="font-weight-bold">
                    {{ selectedCiclo }}
                  </th>
                </tr>
                </thead>
                <thead>
                <tr>
                  <th class="text-left">
                    Repeticiones del ciclo
                  </th>
                  <th class="text-left">
                    Ejercicio
                  </th>
                  <th class="text-left">
                    Repeticiones/ Tiempo
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td rowspan="0">{{ cicloToShow?.repetitions }}</td>
                </tr>
                <tr
                    v-for="item in cicloToShow?.exercises"
                    :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.cant + ' ' + item.type }}</td>
                </tr>
                </tbody>
              </v-table>
            </div>
          </v-row>
          <v-row class="fila3">
            <v-col>
              <v-btn v-if="selfRoutine" class="eliminar ml-auto" @click="openDeleteRoutineDialog"
                     prepend-icon="mdi-trash-can-outline"> Eliminar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn class="editar ml-auto" @click="shareRoutine"
                     prepend-icon="mdi-share-variant"> Compartir
              </v-btn>
            </v-col>
            <v-col v-if="selfRoutine">
              <v-btn class="editar" prepend-icon="mdi-pencil" @click="editarRoutina()"> Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <RoutineByCategories nombreRutina="Dificultad Fácil" :favourite="false" dif="facil"/>
  <RoutineByCategories nombreRutina="Dificultad Media" :favourite="false" dif="medio"/>
  <RoutineByCategories nombreRutina="Dificultad Difícil" :favourite="false" dif="dificil"/>
  <RoutineByCategories nombreRutina="Favoritas" :favourite="true" dif="todas"/>

  <v-dialog v-model="showShareDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">
        Compartir Rutina
      </v-card-title>
      <v-card-text>
        <p>Aquí tienes el enlace para compartir esta rutina:</p>
        <v-text-field :value="getRoutineLink()" readonly></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showShareDialog = false"
               style="background-color: lightgray; border-color: #8efd00; color: #000000;">Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog width="475" class="mx-auto" v-model="confirmDelete">
    <template v-slot:activator="{ props }">

    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>¿Está seguro/a que desea eliminar la rutina?</v-card-title>
        <v-card-text>Esta operación no se puede deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="cancelar"
              class="cancelar"
              prepend-icon="mdi-close"
              @click="
                                        () => {
                                            isActive.value = false;
                                        }
                                    "
          ></v-btn>
          <v-btn
              class="confirmar"
              text="Confirmar"
              prepend-icon="mdi-check"
              @click="
                                        () => {
                                            isActive.value = false;
                                            deleteRoutine(routine);
                                        }
                                    "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>

<script setup>
import {RouterLink, useRoute, useRouter} from "vue-router";
import RoutineByCategories from "@/components/RoutineByCategories.vue";
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRoutineStore} from "@/stores/routineStore";
import {useExerciseStore} from "@/stores/exerciseStore";
import {useCycleStore} from "@/stores/cycleStore";
import {useUserStore} from "@/stores/userStore";

const route = useRoute()
const router = useRouter()
const isSelected = ref(false)
const routineStore = useRoutineStore()
const userStore = useUserStore()
const exerciseStore = useExerciseStore()
const cycleStore = useCycleStore()
let routine = ref({})
let showShareDialog = ref(false);
const cycles = ref([])
const selectedCiclo = ref('')
const confirmDelete = ref(false)
const selfRoutine = ref(false)

onBeforeMount(async () => {
  await getRoutine()
});

async function deleteRoutine(routine) {
  const result = await routineStore.deleteRoutine(routine.id);
  if (result.success) {
    router.go(-1);
  }
}

watch(() => route.params.id, async () => {
  await getRoutine()
  window.scrollTo({top: 0, behavior: 'smooth'}) // Utiliza 'smooth' para un desplazamiento suave
})

async function editarRoutina() {
  await router.push({name: 'edit-routine', params: {id: route.params.id}});
}

const cicloToShow = computed(() => {
  return cycles.value.find(cycle => cycle.name === selectedCiclo.value);
})

async function getRoutine() {
  const username = userStore.getUsername()
  cycles.value = []
  if(route.params.id === undefined)
    return
  const result0 = await routineStore.getRoutine(route.params.id)
  if (result0.success) {
    if (username === result0.data.user?.username)
      selfRoutine.value = true
    else
      selfRoutine.value = false
    const newRoutine = {
      id: result0.data.id,
      name: result0.data.name,
      img: result0.data.metadata.image,
      category: result0.data.category,
      description: result0.data.detail,
      creator: result0.data.user,
      difficulty: result0.data.difficulty,
      isPublic: result0.data.isPublic,
      fav: result0.data.metadata.fav,
      score: result0.data.score,
      duration: result0.data.metadata.duration
    }
    routine.value = {...routine.value, ...newRoutine};
    const result = await routineStore.getCyclesByRoutine(route.params.id)
    if (result.success) {
      for (let i = 0; i < result.data.totalCount; i++) {
        const newCycle = {
          name: result.data.content[i].name,
          repetitions: result.data.content[i].repetitions,
          exercises: []
        }
        cycles.value.push(newCycle)
        if (i === 0) selectedCiclo.value = newCycle.name
        let result2 = await cycleStore.getExercisesByCycle(result.data.content[i].id)
        if (result2.success) {
          for (let j = 0; j < result2.data.totalCount; j++) {
            const newExercise = {
              name: result2.data.content[j].exercise.name,
              detail: result2.data.content[j].exercise.detail,
              type: (result2.data.content[j].duration > 0) ? 'segundos' : 'repeticiones',
              cant: (result2.data.content[j].duration > 0) ? result2.data.content[j].duration : result2.data.content[j].repetitions,
            }
            cycles.value[i].exercises.push(newExercise)
          }
        }
      }
    }
  }
}

async function toggle() {
  routine.fav = !routine.fav
  const result = await routineStore.changeRoutine(routine);
  if (!result.success) {
    routine.fav = !routine.fav
  }
}

function shareRoutine() {
  showShareDialog.value = true;
}

function getRoutineLink() {
  return window.location.href;
}

function formatDuration(durationInSeconds) {
  if (typeof durationInSeconds !== 'number' || isNaN(durationInSeconds))
    return 'Duración desconocida';
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  if (minutes > 0) {
    if (seconds > 0) {
      if (minutes === 1) {
        if (seconds === 1)
          return `${minutes} minuto y ${seconds} segundo`;
        else
          return `${minutes} minuto y ${seconds} segundos`;
      } else {
        if (seconds === 1)
          return `${minutes} minutos y ${seconds} segundo`;
        else
          return `${minutes} minutos y ${seconds} segundos`;
      }
    } else {
      if (minutes === 1)
        return `${minutes} minuto`;
      else
        return `${minutes} minutos`;
    }
  } else {
    if (seconds === 1)
      return `${seconds} segundo`;
    else
      return `${seconds} segundos`;

  }
}

async function openDeleteRoutineDialog() {
  confirmDelete.value = true;
}

</script>

<style scoped>

.titulo {
  font-family: Montserrat, sans-serif;
  font-weight: bolder;
  font-size: 200%;
  color: #000000;
  padding-top: 10px;
  padding-left: 20px;
  display: inline-block;
}

.eliminar {
  color: #8efd00;
  background-color: #000000;
}

.cont {
  position: relative;
  width: 100%;
}

.routine-card {
  background-color: lightgray;
  margin: 20px auto;
  border-radius: 10px;
  width: 95%;
  height: 530px;
  padding-top: 20px;
}

.heart {
  position: absolute;
  top: 20%;
  left: 88%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  color: #000000;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
}

.cont {
  position: relative;
  width: 100%;
}

.image {
  width: 100%;
}

.creator {
  display: flex;
  align-items: center;
}

.creator-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

h3 {
  font-family: Montserrat, sans-serif;
  font-size: 100%;
  color: #000000;
  display: inline-block;
}

.tabla {
  padding-left: 20px;
  padding-top: 15px;
  width: 100%;
}

.v-table {
  width: auto;
}

.editar {
  color: #000000;
  background-color: #8efd00;
}

.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

h1 {
  text-align: center;
  padding-top: 25px;
}

.fila3 {
  padding-top: 15px;
}

.v-card-title {
  overflow: visible;
  white-space: normal;
  max-height: none;
}


</style>
