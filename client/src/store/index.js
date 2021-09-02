import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const apiURL = 'http://localhost:5000/api'
const storageName = 'userData'

const authorizationHeader = function () {
    return {Authorization: `Bearer ${JSON.parse(localStorage.getItem(storageName)).token}`}
}

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        token: null,
        todos: [],
    },
    mutations: {
        setAuth(state, {token}) {
            state.isAuthenticated = true
            state.token = token
        },
        clearUser(state) {
            state.isAuthenticated = false
            state.token = null
        },
        setTodos(state, todos) {
            state.todos = todos
        }
    },
    actions: {
        async signUp(ctx, user) {
            axios.post(`${apiURL}/auth/register`, user)
                .then(response => {
                    console.log('then', response.data)
                    ctx.dispatch('signIn', user)
                })
                .catch(error => console.log('catch', error.response))
        },
        async signIn(ctx, user) {
            axios.post(`${apiURL}/auth/login`, user)
                .then(response => {
                    console.log('then', response.data)
                    const id = response.data.userId
                    const token = response.data.token
                    localStorage.setItem(storageName, JSON.stringify({
                        userId: id, token
                    }))
                    ctx.commit('setAuth', {id, token})
                })
                .catch(error => console.log('catch', error.response))
        },
        logout(ctx) {
            localStorage.removeItem(storageName)
            ctx.commit('clearUser')
        },
        checkAuth(ctx) {
            const data = JSON.parse(localStorage.getItem(storageName))
            if (data && data.token) ctx.commit('setAuth', data)
        },
        async addNewTodo(ctx, newTodo) {
            const headers = authorizationHeader()
            axios.post(`${apiURL}/todos/create`, newTodo, {headers})
                .then(response => {
                    console.log('then', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        },
        async getTodos(ctx) {
            const headers = authorizationHeader()
            axios.get(`${apiURL}/todos/`, {headers})
                .then(response => {
                    console.log('response', response.data)
                    const todos = response.data
                    ctx.commit('setTodos', todos)
                })
                .catch(error => console.log('catch', error.response))
        },
        async deleteTodo(ctx, todoId) {
            const headers = authorizationHeader()
            axios.delete(`${apiURL}/todos/delete/${todoId}`, {headers})
                .then(response => {
                    console.log('response', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        },
        async setTodoStatus(ctx, {todoId, todoIsDone}) {
            const headers = authorizationHeader()
            axios.put(`${apiURL}/todos/update`, {todoId, todoIsDone}, {headers})
                .then(response => {
                    console.log('response', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        }
    },
    getters: {},
    modules: {}
})
