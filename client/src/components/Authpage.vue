<template>
  <div>
    <h2>authpage</h2>
    <span :class="{active: signInBlock}" class="nav" @click="signIn">Войти</span> |
    <span :class="{active: !signInBlock}" class="nav" @click="signUp">Зарегистрироваться</span>
    <div>
      <form novalidate @submit.prevent="handleSubmit">
        <div style="margin: 30px auto 30px; max-width: 400px;">
          <v-text-field v-model="email" label="Email" placeholder="example@mail.com"
                        tabindex="1" type="email"></v-text-field>
          <v-text-field v-model="password" label="Password" placeholder="do not use 123 or equal"
                        tabindex="2" :type="passwordFieldType">
            <template v-slot:append>
              <v-icon @click="showPassword">{{ isVisiblePassword ? 'mdi-eye' : 'mdi-eye-outline' }}</v-icon>
            </template>
          </v-text-field>
          <transition name="fade22">
            <v-text-field v-show="!signInBlock" v-model="repeatPass" label="Repeat password"
                          placeholder="repeat your password"
                          tabindex="3" :type="passwordFieldType"></v-text-field>
          </transition>
        </div>
        <v-btn elevation="4" min-width="230"
               rounded @click="handleSubmit"
        >{{ signInBlock ? 'Войти' : 'Зарегистрироваться' }}
        </v-btn>
        <div style="cursor: pointer; margin: 30px 0 30px 0;" @click="testUser">
          <p>тестовый email: <strong>test@test.com</strong></p>
          <p>пароль: <strong>testpass</strong></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authpage",
  data() {
    return {
      signInBlock: true,
      email: "",
      password: "",
      repeatPass: "",
      isVisiblePassword: false,
      passwordFieldType: 'password'
    }
  },
  methods: {
    signIn() {
      this.signInBlock = true
    },
    signUp() {
      this.signInBlock = false
      this.email = ''
      this.password = ''
    },
    handleSubmit() {
      const user = {email: this.email, password: this.password}
      if (this.signInBlock) {
        this.$store.dispatch('signIn', user)
      } else {
        this.$store.dispatch('signUp', user)
      }
    },
    testUser() {
      this.signInBlock = true
      this.email = 'test@test.com'
      this.password = 'testpass'
    },
    showPassword() {
      if (this.isVisiblePassword) {
        this.isVisiblePassword = false
        this.passwordFieldType = 'password'
      } else {
        this.isVisiblePassword = true
        this.passwordFieldType = 'text'
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

.fade22-enter-active {
  transition: opacity .5s;
}

.fade22-enter, .fade22-leave-to {
  opacity: 0;
}
</style>