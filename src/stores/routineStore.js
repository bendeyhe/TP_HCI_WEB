import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([])

    /*esto no va a andar pero es algo asi la idea, habria que pasarle la categoria que queremos obtener
    const getRoutinesByCategory = computed(() => routines.value.filter((p) => p.category === category))
    */

    function fetchRoutines(){
        setRoutines([
            {id: 1, name: 'Routine 1', creator: 'Jorge Almiron', description: 'Una rutina re dificil', img:'routine1.jpg'},
            {id: 2, name: 'Routine 2', creator: 'Jorge Almiron', description: 'Una rutina re intensa', img:'routine2.jpg'},
            {id: 3, name: 'Routine 3', creator: 'Jorge Almiron', description: 'Una rutina para fortalecer los músculos', img:'routine3.jpg'},
            {id: 4, name: 'Routine 4', creator: 'Jorge Almiron', description: 'asdasdadsaaaddadsasddas', img:'routine4.jpg'},
            {id: 5, name: 'Routine 5', creator: 'Jorge Almiron', description: 'asdaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaa', img:'routine5.jpg'},
        ])
    }

    function setRoutines(routinesToSet){
        routines.value = routinesToSet
    }

    return { routines, fetchRoutines, setRoutines  }
})
