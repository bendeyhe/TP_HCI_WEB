import {ref} from 'vue'
import {defineStore} from 'pinia'

//init.headers['Authorization'] = `bearer ${Api.token}`

export const useLoginStore = defineStore('login', () => {

    // POST: /api/users/login
    async function login(user, pwd) {
        const data = {'username': user, 'password': pwd};
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        let response = await fetch('http://localhost:8080/api/users/login', init);
        if (!response.ok)
            throw Error(response.statusText);
        return response.json();
    }

    // POST: /api/users
    async function register(user, pwd, email) {
        const data = {'username': user, 'password': pwd, 'email': email};
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        let response = await fetch('http://localhost:8080/api/users', init);
        if (!response.ok)
            throw Error(response.statusText);
        return response.json();
    }

    return { login, register }
})
