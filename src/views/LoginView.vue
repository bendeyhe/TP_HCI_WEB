<template>
    <div>
        <h1> Login </h1>
        <div>
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username">
            <label for="password">Password</label>
            <input type="text" v-model="password" id="password">
            <button @click="login">Login</button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import storage from '../storage/storage.js' //esto hay que cambiarlo cuando tengamos Pinia

const username = ref(null)
const password = ref(null)
const route = useRoute()
const router = useRouter()
function login(){
    //autenticar usuario con Pinia
    storage.user = username
    const redirectUrl = route.query.redirect || '/'
    router.push(redirectUrl)
}
</script>
