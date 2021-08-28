import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        currentUserId: null,
        token: null,
        todos: []
    },
    mutations: {
        setAuth(state, {id, token}) {
            state.currentUserId = id
            state.isAuthenticated = true
            state.token = token
        },
        clearUser(state) {
            state.currentUserId = null
            state.isAuthenticated = false
            state.token = null
        }
    },
    actions: {
        async signUp(ctx, user) {
            await axios.post('http://localhost:5000/api/auth/register', user)
                .then(response => {
                    console.log('then', response.data)
                    ctx.commit('setAuth', user)
                })
                .catch(error => console.log('catch', error.response))
        },
        async signIn(ctx, user) {
            await axios.post('http://localhost:5000/api/auth/login', user)
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
        }
    },
    modules: {}
})
