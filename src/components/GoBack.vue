<template>
    <span class="go-back">
        <v-btn @click="goBack" class="btn">Go Back</v-btn>
    </span>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goBack(){
    return router.go(-1)
}
</script>

<style scoped>
.go-back {
    display: flex;
    cursor: pointer;
}
.v-btn{
    color: #8efd00;
    background-color: #000000;
    margin-right : 10px;
    margin-left : 10px;
}
</style>
