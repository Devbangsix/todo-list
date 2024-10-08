<script setup>
import { onMounted,ref ,computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useTodoStore } from '../stores/todo'

import Loading  from '../components/Loading.vue'

const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)
const selectedStatus = ref('Empty')

const filterTodoList = computed(() => {
    return todoStore.list.filter(todo => todo.status === selectedStatus.value)
})

onMounted(async () => {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false
})

const addTodo = async (todoText) => {
    try{
        isLoading.value = true
        await todoStore.addTodo(todoText)
        await todoStore.loadTodos()
        isLoading.value = false
    }catch(error) {
        console.log('error',error)
    }
}

const editStatus = async (todoId, todoData) => {
    try{
        isLoading.value = true
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData,todoId)
        isLoading.value = false
    }catch(error) {
        console.log('error',error)
    }
}

const changeStatus = async (event, todoId) => {
    isLoading.value = true
    try {
        if (event.target.checked) {
        await todoStore.editTodo({ status: 'Done'}, todoId)
    } else {
        await todoStore.editTodo({ status: 'Doing'}, todoId)
    }
    await todoStore.loadTodos()
    } catch (error) {
        console.log('error' , error)
    }
    isLoading.value = false 
}

const deleteTodo = async (todoId) =>  {
    try{
        isLoading.value = true
        await todoStore.removeTodo(todoId)
        await todoStore.loadTodos()
        isLoading.value = false
    }catch (error) {
        console.log('error', error)
    }
}

const changeSelectedStatus = async (newStatus) => {
    selectedStatus.value = newStatus
}

</script>


<template>
    <div>
        <div class="flex">
            <input class="input input-bordered w-full" type="text" v-model="todoText" placeholder="item name here...">
            <button class="btn btn-primary ml-2" @click="addTodo(todoText)">ADD</button>
        </div>
        <Loading v-if="isLoading"></Loading>
        <div class="tabs tabs-boxed mt-4">
            <a v-for="status in todoStore.statuses" 
            :class="status === selectedStatus ? 'tab tab-active' : 'tab'"
            @click="changeSelectedStatus(status)" >
            {{ status }}</a>
        </div>
            <div class="flex items-conter justify-between mt-2" v-for="todo in filterTodoList" :key="todo.id">
                <div>
                    <input type="checkbox" :checked="todo.status === 'Done'" class="checkbox" @change="changeStatus($event, todo.id)"/>
                </div>
                <div :class="todo.status === 'Done' ? 'Line-through' : ''">
                    {{ todo.name }}
                </div>
                <!-- {{ todo.status }} -->
                <!-- {{ todo.uesr }} {{ todo.queue }}
                {{ todo.empty }}  -->
                <div>
                <RouterLink :to="{name: 'todo-edit', params: { id: todo.id }}">
                <button class="btn btn-square btn-outline" > 
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
                </button>
                </RouterLink>
                <button class="btn btn-square ml-2 btn-outline" @click="deleteTodo(todo.id)"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </button>
                </div>
            </div>    
    </div>
</template>

<style scoped>

svg {
    fill: aliceblue;
}

</style>