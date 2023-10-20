import { defineStore } from 'pinia';
import {ref} from 'vue';
import {useUserStore} from './userStore';
import {makeApiCall} from "@/stores/apiUtils";
import {API_BASE_URL} from "@/stores/apiUtils";

const EX_B_URL = `${API_BASE_URL}/exercises`;

const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: ref([]),
        apiEndpoints: {
            getExercises: {path: `${EX_B_URL}`, requiresAuth: true, method: 'GET'},
            addExercise: {path: `${EX_B_URL}`, requiresAuth: true, method: 'POST'},
            getExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'GET'}),
            changeExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'PUT'}),
            deleteExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'DELETE'})
        },
    }),
    actions: {
        getAllExercises() {
            return this.exercises.values();
        },
        addExerciseArray(exercise) {
            for(let i = 0; i < this.exercises.length; i++){
                if(this.exercises[i].id === exercise.id){
                    return;
                }
            }
            this.exercises.push(exercise);
        },
        async getExercises() {
            return await makeApiCall(this.apiEndpoints.getExercises, null, useUserStore().token);
        },

        async addExercise(exercise) {
            const data = {'name': exercise.name, 'detail': exercise.detail};
            return await makeApiCall(this.apiEndpoints.addExercise, data, useUserStore().token);
        },
        async getExercise(exerciseId) {
            return await makeApiCall(this.apiEndpoints.getExercise(exerciseId), null, useUserStore().token);
        },

        async changeExercise(exercise) {
            const data = {'name': exercise.name, 'detail': exercise.detail};
            return await makeApiCall(this.apiEndpoints.changeExercise(exercise.id), data, useUserStore().token);
        },

        async deleteExercise(exerciseId) {
            return await makeApiCall(this.apiEndpoints.deleteExercise(exerciseId), null, useUserStore().token);
        }
    }
});
