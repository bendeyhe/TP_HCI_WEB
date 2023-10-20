import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useUserStore} from './userStore';
import {makeApiCall} from "@/stores/apiUtils";
import {API_BASE_URL} from "@/stores/apiUtils";

const ROUT_B_URL = `${API_BASE_URL}/routines`;

export const useRoutineStore = defineStore('routine', {
    state: () => ({
        routines: ref([]),
        favoriteRoutines: ref([]),
        apiEndpoints: {
            getRoutines: {path: `${ROUT_B_URL}`, requiresAuth: true, method: 'GET'},
            addRoutine: {path: `${ROUT_B_URL}`, requiresAuth: true, method: 'POST'},
            getRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'GET'}),
            changeRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'PUT'}),
            deleteRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'DELETE'})
        },
        
    }),

    actions: {
        getfavoriteRoutines() {
            return this.favoriteRoutines;
        },
        addFavoriteRoutine(routine) {
            this.favoriteRoutines.push(routine);
        },
        removeFavoriteRoutine(routine) {
            const index = this.favoriteRoutines.findIndex(favRoutine => favRoutine.id === routine.id);
            if (index !== -1) {
                this.favoriteRoutines.splice(index, 1);
            }
        },
        async getRoutines() {
            return await makeApiCall(this.apiEndpoints.getRoutines, null, useUserStore().token);
        },

        async addRoutine(routine) {
            const data = {'name': routine.name, 'detail': routine.detail};
            return await makeApiCall(this.apiEndpoints.addRoutine, data, useUserStore().token);
        },

        async getRoutine(routineId) {
            return await makeApiCall(this.apiEndpoints.getRoutine(routineId), null, useUserStore().token);
        },

        async changeRoutine(routine) {
            const data = {
                'name': routine.name, 'detail': routine.description,
                'isPublic': routine.isPublic, 'difficulty': routine.difficulty,
                'metadata': {'image': routine.img, 'fav': routine.fav}
            };
            return await makeApiCall(this.apiEndpoints.changeRoutine(routine.id), data, useUserStore().token);
        },

        async deleteRoutine(routineId) {
            return await makeApiCall(this.apiEndpoints.deleteRoutine(routineId), null, useUserStore().token);
        }

    }
});


/*esto no va a andar pero es algo asi la idea, habria que pasarle la categoria que queremos obtener
const getRoutinesByCategory = computed(() => routines.value.filter((p) => p.category === category))
*/
/*const routines = ref([])
fetchRoutines(){
        return [
            {id: 1, name: 'Rutina de Espalda', creator: 'Jorge Almiron', description: 'Para tener alas en vez de dorsales', img:'routine1.jpg'},
            {id: 2, name: 'Routina Biceps', creator: 'Nate Deyheralde', description: 'Para poder llevar mas bolsas de supermercado a la vez', img:'routine2.jpg'},
            {id: 3, name: 'Routina de Piernas', creator: 'Pitufo Mutz', description: 'No vas a poder caminar despues de realizarla!', img:'routine3.jpg'},
            {id: 4, name: 'Routina aerobica', creator: 'Robert Ves Losada', description: 'Para no cansarte en el partido', img:'routine4.jpg'},
            {id: 5, name: 'Routina de hombros', creator: 'The Rock Candisano', description: 'Para dejar de estar chico', img:'routine5.jpg'},
        ]
    },


function setRoutines(routinesToSet){
    routines.value = routinesToSet
}

return { routines, fetchRoutines, setRoutines  }
})*/
