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
        easyRoutines: ref([]),
        mediumRoutines: ref([]),
        dificultRoutines: ref([]),
        myRoutines: ref([]),
        apiEndpoints: {
            getRoutines: {path: `${ROUT_B_URL}?size=100`, requiresAuth: true, method: 'GET'},
            addRoutine: {path: `${ROUT_B_URL}`, requiresAuth: true, method: 'POST'},
            getRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'GET'}),
            changeRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'PUT'}),
            deleteRoutine: (routineId) => ({path: `${ROUT_B_URL}/${routineId}`, requiresAuth: true, method: 'DELETE'}),
            getCyclesByRoutine: (routineId) => ({
                path: `${ROUT_B_URL}/${routineId}/cycles`,
                requiresAuth: true,
                method: 'GET'
            }),
            addCycleToRoutine: (routineId) => ({
                path: `${ROUT_B_URL}/${routineId}/cycles`,
                requiresAuth: true,
                method: 'POST'
            }),
            getCycleByRoutine: (routineId, cycleId) => ({
                path: `${ROUT_B_URL}/${routineId}/cycles/${cycleId}`,
                requiresAuth: true,
                method: 'GET'
            }),
            modifyCycleFromRoutine: (routineId, cycleId) => ({
                path: `${ROUT_B_URL}/${routineId}/cycles/${cycleId}`,
                requiresAuth: true,
                method: 'PUT'
            }),
            removeCycleFromRoutine: (routineId, cycleId) => ({
                path: `${ROUT_B_URL}/${routineId}/cycles/${cycleId}`,
                requiresAuth: true,
                method: 'DELETE'
            }),
        },

    }),

    actions: {
        clearRoutines() {
            this.routines = [];
        },
        clearMyRoutines() {
            this.myRoutines = [];
        },
        clearFavoriteRoutines() {
            this.favoriteRoutines = [];
        },
        clearEasyRoutines() {
            this.easyRoutines = [];
        },
        clearMediumRoutines() {
            this.mediumRoutines = [];
        },
        clearDificultRoutines() {
            this.dificultRoutines = [];
        },
        getfavoriteRoutines() {
            return this.favoriteRoutines.values();
        },
        getEasyRoutines() {
            return this.easyRoutines.values();
        },
        getMediumRoutines() {
            return this.mediumRoutines.values();
        },
        getDificultRoutines() {
            return this.dificultRoutines.values();
        },
        getMyRoutines() {
            return this.myRoutines.values();
        },
        addFavoriteRoutine(routine) {
            for (let i = 0; i < this.favoriteRoutines.length; i++) {
                if (this.favoriteRoutines[i].id === routine.id) {
                    return;
                }
            }
            this.favoriteRoutines.push(routine);
            this.favoriteRoutines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        addEasyRoutine(routine) {
            const user = useUserStore().getUsername();
            if (routine.creator.username === user) {
                return;
                }
            for (let i = 0; i < this.easyRoutines.length; i++) {
                if (this.easyRoutines[i].id === routine.id) {
                    return;
                }
            }
            this.easyRoutines.push(routine);
            this.easyRoutines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        addMediumRoutine(routine) {
            const user = useUserStore().getUsername();
            if (routine.creator.username === user) {
                return;
                }
            for (let i = 0; i < this.mediumRoutines.length; i++) {
                if (this.mediumRoutines[i].id === routine.id) {
                    return;
                }
            }
            this.mediumRoutines.push(routine);
            this.mediumRoutines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        addDificultRoutine(routine) {
            const user = useUserStore().getUsername();
            if (routine.creator.username === user) {
                return;
                }
            for (let i = 0; i < this.dificultRoutines.length; i++) {
                if (this.dificultRoutines[i].id === routine.id) {
                    return;
                }
            }
            this.dificultRoutines.push(routine);
            this.dificultRoutines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        clearRoutineArray(){
            this.routines = [];
        },
        addMyRoutine(routine) {
            for (let i = 0; i < this.myRoutines.length; i++) {
                if (this.myRoutines[i].id === routine.id) {
                    return;
                }
            }
            this.myRoutines.push(routine);
            this.myRoutines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        getAllRoutines() {
            return this.routines.values();
        },
        addRoutineArray(routine) {
            for (let i = 0; i < this.routines.length; i++) {
                if (this.routines[i].id === routine.id) {
                    return;
                }
            }
            this.routines.push(routine);
            this.routines.sort( (a, b) => a.date < b.date ? 1 : -1)
        },
        removeFavoriteRoutine(routine) {
            const index = this.favoriteRoutines.findIndex(r => r.id === routine.id);
            if (index !== -1) {
                this.favoriteRoutines.splice(index, 1);
            }
        },
        removeMyRoutine(routine) {
            const index = this.myRoutines.findIndex(r => r.id === routine.id);
            if (index !== -1) {
                this.myRoutines.splice(index, 1);
            }
        },
        removeRoutines(routine) {
            const index = this.routines.findIndex(r => r.id === routine.id);
            if (index !== -1) {
                this.routines.splice(index, 1);
            }
        },
        async getRoutines() {
            return await makeApiCall(this.apiEndpoints.getRoutines, null, useUserStore().token);
        },
        async addRoutine(routine) {
            const data = {
                'name': routine.name,
                'detail': routine.detail,
                'isPublic': true,
                'difficulty': routine.difficulty,
                'category': {
                    'id': 1
                },
                'metadata': {'image': routine.metadata?.image}
            };
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
            this.myRoutines.splice(this.myRoutines.findIndex(r => r.id === routineId), 1);
            this.routines.splice(this.routines.findIndex(r => r.id === routineId), 1);
            this.favoriteRoutines.splice(this.favoriteRoutines.findIndex(r => r.id === routineId), 1);
            this.easyRoutines.splice(this.easyRoutines.findIndex(r => r.id === routineId), 1);
            this.mediumRoutines.splice(this.mediumRoutines.findIndex(r => r.id === routineId), 1);
            this.dificultRoutines.splice(this.dificultRoutines.findIndex(r => r.id === routineId), 1);
            return await makeApiCall(this.apiEndpoints.deleteRoutine(routineId), null, useUserStore().token);
        },

        async getCyclesByRoutine(routineId) {
            return await makeApiCall(this.apiEndpoints.getCyclesByRoutine(routineId), null, useUserStore().token);
        },
        async addCycleToRoutine(routineId, cycle) {
            const data = {
                'name': cycle.name,
                'detail': cycle.detail,
                'type': cycle.type,
                'order': cycle.order,
                'repetitions': cycle.repetitions
            };
            return await makeApiCall(this.apiEndpoints.addCycleToRoutine(routineId), data, useUserStore().token);
        },
        async getCycleByRoutine(routineId, cycleId) {
            return await makeApiCall(this.apiEndpoints.getCycleByRoutine(routineId, cycleId), null, useUserStore().token);
        },
        async modifyCycleFromRoutine(routineId, cycle) {
            const data = {
                'name': cycle.name,
                'detail': cycle.detail,
                'type': cycle.type,
                'order': cycle.order,
                'repetitions': cycle.repetitions
            };
            return await makeApiCall(this.apiEndpoints.modifyCycleFromRoutine(routineId, cycle.id), data, useUserStore().token);
        },
        async removeCycleFromRoutine(routineId, cycleId) {
            return await makeApiCall(this.apiEndpoints.removeCycleFromRoutine(routineId, cycleId), null, useUserStore().token);
        }
    }
});
