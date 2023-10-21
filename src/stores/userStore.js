import {defineStore} from 'pinia'
import {makeApiCall} from "@/stores/apiUtils";
import {API_BASE_URL} from "@/stores/apiUtils";

const SECURITY_TOKEN_KEY = "security-token";

const USER_B_URL = `${API_BASE_URL}/users`;

export const useUserStore = defineStore('login', {
    state: () => ({
        token: "",
        user: null,
        mail: null,
        apiEndpoints: {
            getUsers: {path: `${USER_B_URL}`, requiresAuth: true, method: 'GET'},
            register: {path: USER_B_URL, requiresAuth: false, method: 'POST'},
            getUser: (userId) => ({path: `${USER_B_URL}/${userId}`, requiresAuth: true, method: 'GET'}),
            login: {path: `${USER_B_URL}/login`, requiresAuth: false, method: 'POST'},
            sendVerification: {path: `${USER_B_URL}/resend_verification`, requiresAuth: false, method: 'POST'},
            verify_email: {path: `${USER_B_URL}/verify_email`, requiresAuth: false, method: 'POST'},
            logout: {path: `${USER_B_URL}/logout`, requiresAuth: true, method: 'POST'},
            getCurrentUser: {path: `${USER_B_URL}/current`, requiresAuth: true, method: 'GET'},
            modifyCurrentUser: {path: `${USER_B_URL}/current`, requiresAuth: true, method: 'PUT'},
            deleteCurrentUser: {path: `${USER_B_URL}/current`, requiresAuth: true, method: 'DELETE'},
            getRoutineByUser: (userId) => ({path: `${USER_B_URL}/${userId}/routines`, requiresAuth: true, method: 'GET'}),
            getCurUserRoutines: {path: `${USER_B_URL}/current/routines`, requiresAuth: true, method: 'GET'},
        }
    }),
    getters: {
        getTokenState() {
            return this.token;
        },
        getUserState() {
            return this.user;
        },
        getMailState() {
            return this.mail;
        },
        isLoggedIn() {
            return this.token != null;
        },
    },
    actions: {
        initialize() {
            const token = localStorage.getItem(SECURITY_TOKEN_KEY);
            if (token) {
                this.setToken(token);
            }
        },
        setUser(user) {
            this.user = user;
        },
        setMail(mail) {
            this.mail = mail;
        },
        setToken(token) {
            this.token = token;
        },
        updateToken(token, rememberMe) {
            if (rememberMe)
                localStorage.setItem(SECURITY_TOKEN_KEY, token);
            this.setToken(token);
        },
        removeToken() {
            localStorage.removeItem(SECURITY_TOKEN_KEY);
            this.setToken(null);
        },

        // GET: /users
        async getUsers() {
            return await makeApiCall(this.apiEndpoints.getUsers, null, this.token);
        },

        // GET: /users/{userId}
        async getUser(userId) {
            return await makeApiCall(this.apiEndpoints.getUser(userId), null, this.token);
        },

        // GET: /users/current
        async getCurrentUser() {
            return await makeApiCall(this.apiEndpoints.getCurrentUser, null, this.token);
        },

        // GET: /users/{userId}/routines
        async getRoutineByUser(userId) {
            return await makeApiCall(this.apiEndpoints.getRoutineByUser(userId), null, this.token);
        },

        // GET: /users/current/routines
        async getCurUserRoutines() {
            return await makeApiCall(this.apiEndpoints.getCurUserRoutines, null, this.token);
        },


        // POST: /users
        async register(user, pwd, email, firstName, lastName, gender) {
            const data = {
                'username': user, 'password': pwd,
                'email': email, 'firstName': firstName,
                'lastName': lastName
            };
            if(gender != null && gender !== "")
                data['gender'] = gender;
            return await makeApiCall(this.apiEndpoints.register, data);
        },

        // POST: /users/login
        async login(user, pwd) {
            const data = {'username': user, 'password': pwd};
            return await makeApiCall(this.apiEndpoints.login, data);
        },

        // POST: /users/resend_verification
        async sendVerification(email) {
            const data = {'email': email};
            return await makeApiCall(this.apiEndpoints.sendVerification, data);
        },

        // POST: /users/verify_email
        async verify_email(email, code) {
            const data = {'email': email, 'code': code};
            return await makeApiCall(this.apiEndpoints.verify_email, data);
        },

        // POST: /users/logout
        async logout() {
            const result = await makeApiCall(this.apiEndpoints.logout, null, this.token);
            if (result.success)
                this.token = "";
            return result;
        },

        // PUT: /users/current
        async modifyCurrentUser(firstName, lastName, gender) {
            const data = {};
            if (firstName != null)
                data['firstName'] = firstName;
            if (lastName != null)
                data['lastName'] = lastName;
            if (gender != null && gender !== "")
                data['gender'] = gender;
            if(Object.keys(data).length === 0)
                return null;
            return await makeApiCall(this.apiEndpoints.modifyCurrentUser, data, this.token);
        },

        // DELETE: /users/current
        async deleteCurrentUser() {
            return await makeApiCall(this.apiEndpoints.deleteCurrentUser, null, this.token);
        },
    },
});
