import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([])

    /*esto no va a andar pero es algo asi la idea, habria que pasarle la categoria que queremos obtener
    const getRoutinesByCategory = computed(() => routines.value.filter((p) => p.category === category))
    */

    function fetchRoutines(){
        setRoutines([
            {id: 1, name: 'Routine 1'},
            {id: 2, name: 'Routine 2'},
            {id: 3, name: 'Routine 3'},
        ])
    }

    function setRoutines(routinesToSet){
        routines.value = routinesToSet
    }

    return { routines, fetchRoutines, setRoutines  }
})
