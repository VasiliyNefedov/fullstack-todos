import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        currentUserId: null,
        todos: []
    },
    mutations: {
        setAuth(state, id) {
            state.currentUserId = id
            state.isAuthenticated = true
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
                    ctx.commit('setAuth', id)
                })
                .catch(error => console.log('catch', error.response))
        },
    },
    modules: {}
})
