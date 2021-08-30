import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

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
            axios.post('http://localhost:5000/api/auth/register', user)
                .then(response => {
                    console.log('then', response.data)
                    ctx.commit('setAuth', user)
                })
                .catch(error => console.log('catch', error.response))
        },
        async signIn(ctx, user) {
            axios.post('http://localhost:5000/api/auth/login', user)
                .then(response => {
                    console.log('then', response.data)
                    const id = response.data.userId
                    const token = response.data.token
                    const storageName = 'userData'
                    localStorage.setItem(storageName, JSON.stringify({
                        userId: id, token
                    }))
                    // this.login(id, token)
                    ctx.commit('setAuth', {id, token})
                })
                .catch(error => console.log('catch', error.response))
        },
        logout(ctx) {
            localStorage.removeItem('userData')
            ctx.commit('clearUser')
        },
        checkAuth(ctx) {
            const data = JSON.parse(localStorage.getItem('userData'))
            if (data && data.token) ctx.commit('setAuth', data)
        },
        async addNewTodo(ctx, newTodo) {
            const headers = {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`}
            axios.post('http://localhost:5000/api/todos/create', newTodo, {headers})
                .then(response => {
                    console.log('then', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        },
        async getTodos(ctx) {
            const headers = {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`}
            axios.get('http://localhost:5000/api/todos/', {headers})
                .then(response => {
                    console.log('response', response.data)
                    const todos = response.data
                    ctx.commit('setTodos', todos)
                })
                .catch(error => console.log('catch', error.response))
        },
        async deleteTodo(ctx, todoId) {
            const headers = {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`}
            axios.delete(`http://localhost:5000/api/todos/delete/${todoId}`, {headers})
                .then(response => {
                    console.log('response', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        },
        async setTodoStatus(ctx, {todoId, todoIsDone}) {
            const headers = {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`}
            axios.put('http://localhost:5000/api/todos/update', {todoId, todoIsDone},{headers})
                .then(response => {
                    console.log('response', response.data)
                    ctx.dispatch('getTodos')
                })
                .catch(error => console.log('catch', error.response))
        }
    },
    getters: {
      // getTodos() {
      //     return this.state.todos
      // }
    },
    modules: {}
})
