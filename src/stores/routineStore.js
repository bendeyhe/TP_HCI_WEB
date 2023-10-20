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
            return this.favoriteRoutines.values();
        },
        addFavoriteRoutine(routine) {
            for(let i = 0; i < this.favoriteRoutines.length; i++){
                if(this.favoriteRoutines[i].id === routine.id){
                    return;
                }
            }
            this.favoriteRoutines.push(routine);
            
        },
        getAllRoutines() {
            return this.routines.values();
        },
        addRoutineArray(routine) {
            for(let i = 0; i < this.routines.length; i++){
                if(this.routines[i].id === routine.id){
                    return;
                }
            }
            this.routines.push(routine);
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
                'score': routine.score,
                'metadata': {'image': routine.img, 'fav': routine.fav}
            };
            return await makeApiCall(this.apiEndpoints.changeRoutine(routine.id), data, useUserStore().token);
        },

        async deleteRoutine(routineId) {
            return await makeApiCall(this.apiEndpoints.deleteRoutine(routineId), null, useUserStore().token);
        }

    }
});
