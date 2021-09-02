<template>
  <div>
    <h2>authpage</h2>
    <span :class="{active: signInBlock}" class="nav" @click="signIn">Войти</span> | <span
      :class="{active: !signInBlock}" class="nav"
      @click="signUp">Зарегистрироваться</span>
    <div>{{ signInBlock ? 'Sign In' : 'Sign Up' }}
      <div style="display: block">
        <form novalidate @submit.prevent="handleSubmit">
          <v-text-field v-model="email" class="input" label="Email" placeholder="example@mail.com"
                        tabindex="1" type="email"></v-text-field>
          <v-text-field v-model="password" class="input" label="Password" placeholder="do not use 123 or equal"
                        tabindex="2" type="password"></v-text-field>
          <transition name="fade22">
            <v-text-field v-show="!signInBlock" v-model="repeatPass" class="input" label="Repeat password"
                          placeholder="repeat your password"
                          tabindex="2" type="password"></v-text-field>
          </transition>
          <v-btn elevation="4" min-width="300"
                 rounded @click="handleSubmit"
          >{{ signInBlock ? 'Войти' : 'Зарегистрироваться' }}
          </v-btn>
          <div>
            <p>тестовый email: <strong>test@test.com</strong></p>
            <p>пароль: <strong>testpass</strong></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authpage",
  data() {
    return {
      signInBlock: true,
      email: "test@test.com",
      password: "testpass",
      repeatPass: ""
    }
  },
  methods: {
    signIn() {
      this.signInBlock = true
    },
    signUp() {
      this.signInBlock = false
    },
    handleSubmit() {
      const user = {email: this.email, password: this.password}
      if (this.signInBlock) {
        this.$store.dispatch('signIn', user)
      } else {
        this.$store.dispatch('signUp', user)
      }
    }
  }
}
</script>

<style scoped>
.nav {
  cursor: pointer;
}

.nav:hover {
  background: #42b983;
}

.active {
  background: #5fa1f1;
}

form {
  /*display: block;*/
}

.input {
  margin: 0 auto;
  max-width: 400px;
}

input {
  border: 1px solid #2c3e50;
}
.fade22-enter-active {
  transition: opacity .5s;
}
.fade22-leave-active {
  transition: opacity .2s;
}
.fade22-enter, .fade22-leave-to {
  opacity: 0;
}
</style>