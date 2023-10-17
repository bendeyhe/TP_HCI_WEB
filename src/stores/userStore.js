import {defineStore} from 'pinia'
import {makeApiCall} from "@/stores/apiUtils";
import storage from "@/storage/storage";

export const useUserStore = defineStore('login', () => {

    let token = "";
    let user = null;

    const apiEndpoints = {
        getUsers: {path: '/users', requiresAuth: true, method: 'GET'},
        register: {path: '/users', requiresAuth: false, method: 'POST'},
        getUser: (userId) => ({path: `/users/${userId}`, requiresAuth: true, method: 'GET'}),
        login: {path: '/users/login', requiresAuth: false, method: 'POST'},
        sendVerification: {path: '/users/resend_verification', requiresAuth: false, method: 'POST'},
        verify_email: {path: '/users/verify_email', requiresAuth: false, method: 'POST'},
        logout: {path: '/users/logout', requiresAuth: true, method: 'POST'},
        getCurrentUser: {path: '/users/current', requiresAuth: true, method: 'GET'},
        modifyCurrentUser: {path: '/users/current', requiresAuth: true, method: 'PUT'},
        deleteCurrentUser: {path: '/users/current', requiresAuth: true, method: 'DELETE'}
    }

    // GET: /users
    async function getUsers() {
        return await makeApiCall(apiEndpoints.getUsers, null, token);
    }

    // GET: /users/{userId}
    async function getUser(userId) {
        return await makeApiCall(apiEndpoints.getUser(userId), null, token);
    }

    // GET: /users/current
    async function getCurrentUser() {
        return await makeApiCall(apiEndpoints.getCurrentUser, null, token);
    }


    // POST: /users
    async function register(user, pwd, email) {
        const data = {'username': user, 'password': pwd, 'email': email};
        return await makeApiCall(apiEndpoints.register, data);
    }

    // POST: /users/login
    async function login(user, pwd) {
        const data = {'username': user, 'password': pwd};
        return await makeApiCall(apiEndpoints.login, data);
    }

    // POST: /users/resend_verification
    async function sendVerification(email) {
        const data = {'email': email};
        return await makeApiCall(apiEndpoints.sendVerification, data);
    }

    // POST: /users/verify_email
    async function verify_email(email, code) {
        const data = {'email': email, 'code': code};
        return await makeApiCall(apiEndpoints.verify_email, data);
    }

    // POST: /users/logout
    async function logout() {
        const result = await makeApiCall(apiEndpoints.logout, null, token);
        if (result.success)
            token = "";
        return result;
    }

    // PUT: /users/current
    async function modifyCurrentUser(firstName, lastName, gender, birthdate, phone, avatarUrl) {
        const data = {
            'firstName': firstName, 'lastName': lastName,
            'gender': gender, 'birthdate': birthdate, 'phone': phone, 'avatarUrl': avatarUrl
        };
        return await makeApiCall(apiEndpoints.modifyCurrentUser, data, token);
    }

    // DELETE: /users/current
    async function deleteCurrentUser() {
        return await makeApiCall(apiEndpoints.deleteCurrentUser, null, token);
    }

    // GETTER FOR TOKEN
    function getToken() {
        return token;
    }

    // SETTER FOR TOKEN
    function setToken(userToken) {
        token = userToken;
    }

    return {
        getToken,
        setToken,
        getUsers,
        getUser,
        getCurrentUser,
        register,
        login,
        sendVerification,
        verify_email,
        logout,
        modifyCurrentUser,
        deleteCurrentUser
    }
})
