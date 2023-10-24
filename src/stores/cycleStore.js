import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useUserStore} from './userStore';
import {makeApiCall} from "@/stores/apiUtils";
import {API_BASE_URL} from "@/stores/apiUtils";

const CY_B_URL = `${API_BASE_URL}/cycles`;

export const useCycleStore = defineStore('cycles', {
    state: () => ({
        cycles: ref([]),
        apiEndpoints: {
            getExsByCycle: (cycleId) => ({path: `${CY_B_URL}/${cycleId}/exercises`, requiresAuth: true, method: 'GET'}),
            getExByCycle: (cycleId, exerciseId) => ({path: `${CY_B_URL}/${cycleId}/exercises/${exerciseId}`, requiresAuth: true, method: 'GET'}),
            addExToCycle: (cycleId, exerciseId) => ({path: `${CY_B_URL}/${cycleId}/exercises/${exerciseId}`, requiresAuth: true, method: 'POST'}),
            modifyExForCycle: (cycleId, exerciseId) => ({path: `${CY_B_URL}/${cycleId}/exercises/${exerciseId}`, requiresAuth: true, method: 'PUT'}),
            removeExForCycle: (cycleId, exerciseId) => ({path: `${CY_B_URL}/${cycleId}/exercises/${exerciseId}`, requiresAuth: true, method: 'DELETE'}),
        },
    }),
    actions: {
        getCycles() {
            return this.cycles.values();
        },
        async getExercisesByCycle(cycleId) {
            return await makeApiCall(this.apiEndpoints.getExsByCycle(cycleId), null, useUserStore().token);
        },
        async getExerciseByCycle(cycleId, exerciseId) {
            return await makeApiCall(this.apiEndpoints.getExByCycle(cycleId, exerciseId), null, useUserStore().token);
        },
        async addExerciseToCycle(cycleId, exerciseId, order, duration, repetitions){
            debugger
            const data = {'order': order, 'duration': duration, 'repetitions': repetitions};
            return await makeApiCall(this.apiEndpoints.addExToCycle(cycleId, exerciseId), data, useUserStore().token);
        },
        async modifyExerciseForCycle(cycleId, exerciseId, order, duration, repetitions) {
            const data = {'order': order, 'duration': duration, 'repetitions': repetitions};
            return await makeApiCall(this.apiEndpoints.modifyExForCycle(cycleId, exerciseId), data, useUserStore().token);
        },
        async removeExerciseForCycle(cycleId, exerciseId) {
            return await makeApiCall(this.apiEndpoints.removeExForCycle(cycleId, exerciseId), null, useUserStore().token);
        }
    }
});
