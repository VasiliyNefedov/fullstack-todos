<template>
  <div>
    <h2>authpage</h2>
    <span @click="signIn" class="nav" :class="{active: signInBlock}">Войти</span> | <span @click="signUp" class="nav" :class="{active: !signInBlock}">Зарегистрироваться</span>
    <div>{{ signInBlock ? 'Sign In' : 'Sign Up' }}
      <div style="display: block">
        <form @submit.prevent="handleSubmit" novalidate>
          <div><label>Email:</label>
            <input type="email" required v-model="email" placeholder="example@mail.com" tabindex="1"></div>
          <div><label>Password:</label>
            <input type="password" required v-model="password" placeholder="do not use 123 or equal"
                   class="password" tabindex="2"></div>
          <div>
            <button>{{ signInBlock ? 'Войти' : 'Зарегистрироваться' }}</button>
          </div>
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
</style>