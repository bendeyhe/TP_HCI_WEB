<template>
    <AppBar />
    <div class="mx-auto">
        <h1 class="text-center">Mis ejercicios</h1>
        <div class="mx-auto">
        <v-dialog width="500" class="mx-auto">
            <template v-slot:activator="{ props }">
                <v-btn
                    class="nuevo-ejercicio"
                    v-bind="props"
                    text="Open Dialog"
                    @click="showDialog = true"
                    style="margin: 0 auto; display: block;"
                >
                <v-icon left>mdi-plus</v-icon>
                    Crear Nuevo Ejercicio
                </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
                <v-card title="Crear Nuevo Ejercicio">
                    <v-card-text>
                        <v-text-field
                            label="Nombre del ejercicio"
                            v-model="newEjercicio.name"
                            maxlength="100"
                            counter
                        ></v-text-field>
                        <v-text-field
                            label="Descripción"
                            v-model="newEjercicio.detail"
                            maxlength="200"
                            counter
                        ></v-text-field>

                        <!--
                                                    <v-text-field
                                                        label="Duración"
                                                        v-model="duration"
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Dificultad"
                                                        v-model="difficulty"
                                                    ></v-text-field>
                                                    <v-text-field
                                                        label="Equipamiento"
                                                        v-model="equipment"
                                                    ></v-text-field>
                                                    -->
                        <v-text-field
                            label="Imagen"
                            v-model="newEjercicio.url"
                        ></v-text-field>

                        <!-- agregar alerta string maximo 274-->
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            text="cancelar"
                            class="cancelar"
                            @click="
                                () => {
                                    isActive.value = false;
                                }
                            "
                        ></v-btn>
                        <v-btn
                            class="confirmar"
                            text="Confirmar"
                            @click="
                                () => {
                                    isActive.value = false;
                                    saveExercise();
                                }
                            "
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>


    <v-row class="width">
        <v-col cols="4" v-for="exercise in myExercises">
            <v-card>
                <v-img
                    :src="exercise.url"
                    height="200px"
                    class="grey lighten-2"
                ></v-img>
                <v-card-title>
                    <h2>{{ exercise.name }}</h2>
                </v-card-title>
                <v-card-text>
                    <p>{{ exercise.detail }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="editExercise(exercise)">Editar</v-btn>
                    <v-btn color="primary" @click="deleteExercise(exercise)">Eliminar</v-btn>
                </v-card-actions>
            </v-card>


        </v-col>
    </v-row>
        <!-- <div class="text-center">
            <v-btn color="primary" class="mx-auto" @click="showDialog = true">Agregar ejercicio</v-btn>
        </div>
        <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Agregar ejercicio</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Nombre" v-model="name"></v-text-field>
                    <v-text-field label="Descripción" v-model="description"></v-text-field>
                    <v-text-field label="Link" v-model="link"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="showDialog = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="addExercise">Agregar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
            :headers="headers"
            :items="exercises"
            :search="search"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>My Exercises</v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-snackbar v-model="snackbar" :timeout="6000" :top="true" multi-line>
                            {{ snackbarText }}
                            <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                        </v-snackbar>
                    </v-toolbar>
                </template>
                </v-data-table>

            -->
    </div>
    
    <FooterComponent />
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { onBeforeMount } from "vue";

const userStore = useUserStore();
const myExercises = ref([]);

const newEjercicio = ref({
    name: "",
    detail: "",
    url: "",
});

onBeforeMount(async () => {
    debugger;
    const user = await userStore.getCurrentUser();
    if (user.success) {
        if (user.data.metadata.exercises) {
            myExercises.value = user.data.metadata.exercises;
        }
        
    }
});

async function saveExercise(){
    if (type.value === 3)
        newEjercicio.value.type = 'rest'
    else
        newEjercicio.value.type = 'exercise'
    let result = await exerciseStore.addExercise(newEjercicio.value);
    if (result.success) {
        result = await exerciseStore.addExerciseImage(result.data.id, newEjercicio.value)
        if (result.success) {
            ejercicioSeleccionado.value = newEjercicio.value;
            newEjercicio.value = {
                name: '',
                detail: '',
                url: '',
                type: '',
                number: 1
            }
        }
    }
};



</script>

<style scoped>
h1 {
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
}

.nuevo-ejercicio {
    background-color: #8efd00;
    color: #000000;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 5    0px;
}

.boton {
    background-color: #8efd00;
    color: #000000;
    margin-right: 10px;
    margin-top: 20px;
    position: absolute;
    left: 20%;
}

.nombre-rutina {
    width: 400px;
    padding-left: 20px;
}

.o {
    padding-left: 25px;
    padding-top: 25px;
}

.confirmar {
    background-color: #8efd00;
    color: #000000;
    margin-right: 10px;
    margin-top: 20px;
}

.cancelar {
    background-color: #000000;
    color: #8efd00;
    margin-right: 10px;
    margin-top: 20px;
}

h2 {
    padding-left: 25px;
    padding-bottom: 35px;
}

.save {
    background-color: #8efd00;
    color: #000000;
    margin-top: 40px;
}
</style>

