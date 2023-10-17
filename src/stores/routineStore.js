import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoutineStore = defineStore('routine', () => {
    const routines = ref([])

    /*esto no va a andar pero es algo asi la idea, habria que pasarle la categoria que queremos obtener
    const getRoutinesByCategory = computed(() => routines.value.filter((p) => p.category === category))
    */

    function fetchRoutines(){
        setRoutines([
            {id: 1, name: 'Rutina de Espalda', creator: 'Jorge Almiron', description: 'Para tener alas en vez de dorsales', img:'routine1.jpg'},
            {id: 2, name: 'Routina Biceps', creator: 'Nate Deyheralde', description: 'Para poder llevar mas bolsas de supermercado a la vez', img:'routine2.jpg'},
            {id: 3, name: 'Routina de Piernas', creator: 'Pitufo Mutz', description: 'No vas a poder caminar despues de realizarla!', img:'routine3.jpg'},
            {id: 4, name: 'Routina aerobica', creator: 'Robert Ves Losada', description: 'Para no cansarte en el partido', img:'routine4.jpg'},
            {id: 5, name: 'Routina de hombros', creator: 'The Rock Candisano', description: 'Para dejar de estar chico', img:'routine5.jpg'},
        ])
    }

    function setRoutines(routinesToSet){
        routines.value = routinesToSet
    }

    return { routines, fetchRoutines, setRoutines  }
})
