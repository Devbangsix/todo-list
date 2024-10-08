import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = ('https://669d116415704bb0e3050b6e.mockapi.io')

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list:[],
    SelectedTodo:{},
    filter:[],
    statuses: ['Empty','Doing','Done']
  }),
  actions: {
    async loadTodos (){
      try{
        const reponse = await axios.get(`${BASE_URL}/todos`)
        this.list = reponse.data
        console.log('load todo list complete')
      }catch (error) {
        console.log('error', error)
      } 
    },
    async loadTodo (id){
      try{
        const reponse = await axios.get(`${BASE_URL}/todos/${id}`)
        this.SelectedTodo = reponse.data
        console.log('load todo by id complete')
      }catch (error) {
        console.log('error', error)
      } 
    },
    async addTodo (todoText) {
      const bodyData ={
        name: todoText,
        status: 'Empty'
      }
      try{
        const reponse = await axios.post(`${BASE_URL}/todos`,bodyData)
        this.push(reponse.data)
        console.log('add todo complete')
      }catch (error) {
        console.log('error', error)
      } 
    },
    async editTodo (todoData, id) {
      
      try{
        // const bodyData = {
        //   name: todoData.name,
        //   status: todoData.status
        // }
        const reponse = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('edit todo complete', reponse.data)
        // this.SelectedTodo = reponse.data
      }catch (error) {
        console.log('error', error)
      } 
    },
    async removeTodo (id) {
      try{
        const reponse = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo complete', reponse.data)
        // this.SelectedTodo = reponse.data
      }catch (error) {
        console.log('error', error)
      } 
    }
      
  }
})
