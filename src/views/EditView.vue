<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted ,ref } from 'vue';
import { RouterLink,useRoute } from 'vue-router'

import Loading from '../components/Loading.vue'

const todoStore = useTodoStore()
const todoId = ref(-1)
const isLoaded = ref(false)
const isUpDated = ref(false)
const route = useRoute()

onMounted ( async () => {
    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)
})

const editTodo = async (SelectedTodo) => {
    try {
        isLoaded.value = false
        const bodyData = {
        name: SelectedTodo.name,
        status: SelectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
        isUpDated.value = true
        isLoaded.value = true
        setTimeout(() => {
            isUpDated.value = false
        }, 3000)
    } catch (error) {
        console.log('errror',error)
    }
}
</script>

<template>
    <div class="w-1/2 mx-auto items-center ">
        <div class="toast toast-top toast-start">
            <div v-if="isUpDated" class="alert alert-success">
                <span>Update successfully.</span>
            </div>
        </div>
        <div class="flex items-center">
            <RouterLink class="btn btn-square" :to="{name: 'todo-list'}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
            </RouterLink>
            <div class="ml-2">Edit page</div>
        </div>
        <div v-if="isLoaded">
            Id {{ todoId }}
            <label class="form-control w-full">
                <div class="label">
                <span class="label-text">Name</span>
            </div>
                <input type="text" placeholder="Type name todo" class="input input-bordered w-full" v-model="todoStore.SelectedTodo.name" />
            </label>
            <label class="form-control w-full">
                <div class="label">
                <span class="label-text">Status</span>
            </div>
            <select class="select select-bordered" v-model="todoStore.SelectedTodo.status" >
                    <option >Select status</option>
                    <option v-for="status in todoStore.statuses" :value="status">
                        {{ status }}
                    </option>
                </select>
            </label>
            <div class="flex">
                <button class="btn btn-primary w-full mt-4" @click="editTodo(todoStore.SelectedTodo)">Edit</button>
            </div>              
        </div>
        <div v-else>
            <Loading></Loading>
        </div>
    </div>
</template>


<style scoped>
 svg{
    fill: white;
 }
</style>