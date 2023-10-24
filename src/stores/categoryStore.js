import {defineStore} from "pinia";
import {ref} from "vue";
import {API_BASE_URL} from "@/stores/apiUtils";
import {useUserStore} from './userStore';
import {makeApiCall} from "@/stores/apiUtils";

const CAT_B_URL = `${API_BASE_URL}/categories`;

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: ref([]),
        apiEndpoints: {
            getCategories: {path: `${CAT_B_URL}`, requiresAuth: true, method: 'GET'},
            addCategory: {path: `${CAT_B_URL}`, requiresAuth: true, method: 'POST'},
            getCategory: (categoryId) => ({
                path: `${CAT_B_URL}/${categoryId}`,
                requiresAuth: true,
                method: 'GET'
            }),
            changeCategory: (categoryId) => ({
                path: `${CAT_B_URL}/${categoryId}`,
                requiresAuth: true,
                method: 'PUT'
            }),
            deleteCategory: (categoryId) => ({
                path: `${CAT_B_URL}/${categoryId}`,
                requiresAuth: true,
                method: 'DELETE'
            })
        }
    }),
    actions: {
        getAllCategories() {
            return this.categories.values();
        },
        addCategoryArray(category) {
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === category.id) {
                    return;
                }
            }
            this.categories.push(category);
        },
        async getCategories() {
            return await makeApiCall(this.apiEndpoints.getCategories, null, useUserStore().token);
        },
        async addCategory(category) {
            const data = {'name': category.name, 'detail': category.detail};
            return await makeApiCall(this.apiEndpoints.addCategory, data, useUserStore().token);
        },
        async getCategory(categoryId) {
            return await makeApiCall(this.apiEndpoints.getCategory(categoryId), null, useUserStore().token);
        },
        async changeCategory(category) {
            const data = {'name': category.name, 'detail': category.detail};
            return await makeApiCall(this.apiEndpoints.changeCategory(category.id), data, useUserStore().token);
        },
        async deleteCategory(categoryId) {
            return await makeApiCall(this.apiEndpoints.deleteCategory(categoryId), null, useUserStore().token);
        }
    }
})
