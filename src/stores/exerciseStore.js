import { defineStore } from 'pinia';
import {ref} from 'vue';
import {useUserStore} from './userStore';
import {makeApiCall} from "@/stores/apiUtils";
import {API_BASE_URL} from "@/stores/apiUtils";

const EX_B_URL = `${API_BASE_URL}/exercises`;

export const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: ref([]),
        exercisesSearch: ref([]),
        apiEndpoints: {
            getExercises: {path: `${EX_B_URL}?size=1000`, requiresAuth: true, method: 'GET'},
            addExercise: {path: `${EX_B_URL}`, requiresAuth: true, method: 'POST'},
            getExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'GET'}),
            changeExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'PUT'}),
            deleteExercise: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}`, requiresAuth: true, method: 'DELETE'}),
            getExerciseImages: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}/images`, requiresAuth: true, method: 'GET'}),
            addExerciseImage: (exerciseId) => ({path: `${EX_B_URL}/${exerciseId}/images`, requiresAuth: true, method: 'POST'}),
            getExerciseImage: (exerciseId, imageId) => ({path: `${EX_B_URL}/${exerciseId}/images/${imageId}`, requiresAuth: true, method: 'GET'}),
            modifyExerciseImage: (exerciseId, imageId) => ({path: `${EX_B_URL}/${exerciseId}/images/${imageId}`, requiresAuth: true, method: 'PUT'}),
            deleteExerciseImage: (exerciseId, imageId) => ({path: `${EX_B_URL}/${exerciseId}/images/${imageId}`, requiresAuth: true, method: 'DELETE'}),
        },
    }),
    actions: {
        getAllExercises() {
            return this.exercises.values();
        },
        getExercisesSearch() {
            return this.exercisesSearch.values();
        },
        addExerciseArray(exercise) {
            for(let i = 0; i < this.exercises.length; i++){
                if(this.exercises[i].id === exercise.id){
                    return;
                }
            }
            this.exercises.push(exercise);
        },
        addExerciseSearch(exercise) {
            for(let i = 0; i < this.exercisesSearch.length; i++){
                if(this.exercisesSearch[i].id === exercise.id){
                    return;
                }
            }
            this.exercisesSearch.push(exercise);
        },
        async getExercises() {
            return await makeApiCall(this.apiEndpoints.getExercises, null, useUserStore().token);
        },
        async addExercise(exercise) {
            const data = {'name': exercise.name, 'detail': exercise.detail, 'type': exercise.type};
            return await makeApiCall(this.apiEndpoints.addExercise, data, useUserStore().token);
        },
        async getExercise(exerciseId) {
            return await makeApiCall(this.apiEndpoints.getExercise(exerciseId), null, useUserStore().token);
        },
        async changeExercise(exercise) {
            const data = {'name': exercise.name, 'detail': exercise.detail, 'type': exercise.type};
            return await makeApiCall(this.apiEndpoints.changeExercise(exercise.index), data, useUserStore().token);
        },
        async deleteExercise(exerciseId) {
            return await makeApiCall(this.apiEndpoints.deleteExercise(exerciseId), null, useUserStore().token);
        },

        async getExerciseImages(exerciseId) {
            return await makeApiCall(this.apiEndpoints.getExerciseImages(exerciseId), null, useUserStore().token);
        },
        async addExerciseImage(exerciseId, exercise) {
            const data = {'number': 1, 'url': exercise.url};
            return await makeApiCall(this.apiEndpoints.addExerciseImage(exerciseId), data, useUserStore().token);
        },
        async getExerciseImage(exercise, imageId) {
            return await makeApiCall(this.apiEndpoints.getExerciseImage(exercise.id, imageId), null, useUserStore().token);
        },
        async modifyExerciseImage(exerciseId, image) {
            const data = {'number': image.number, 'url': image.url};
            return await makeApiCall(this.apiEndpoints.modifyExerciseImage(exerciseId, image.id), data, useUserStore().token);
        },
        async deleteExerciseImage(exerciseId, imageId) {
            return await makeApiCall(this.apiEndpoints.deleteExerciseImage(exerciseId, imageId), null, useUserStore().token);
        }
    }
});
