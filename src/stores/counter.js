import{ ref, computed } from 'vue'
import { defineStore } from 'pinia'

/*
hacer un store por cada entidad relevante de la app.
* por ejemplo uno para login, manejo de usuario, info del usuario (userStore)
* podríamos tener otro que tenga el manejo de las rutinas (routineStore)
* etc

convención: todos los store empiezan con "use" y terminan con "Store". En el
medio se le pone el nombre del store.
*/
export const useCounterStore = defineStore('counter', () => {
    //state
    const count = ref(0)
    //getters
    const doubleCount = computed(() => count.value * 2)
    //actions
    function increment() {
        count.value++
    }

    return { count, doubleCount,  increment }
})
/* para crear un store hay que ponerle nombre useNombreStore y pasarle
el nombre del store y una función arrow.
* la función arrow tiene que devolver un objeto con las propiedades que
queremos que tenga el store:
-estado: datos crudos
-getters: permiten acceder a una versión del estado manipulado (no es obligatorio tener getters)
-actions: manipulan el estado

es importantisimo que la función arrow devuelva un objeto que contenga el estado puro, los getters y las actions.
*/


