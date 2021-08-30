<template>
  <div class="container">
    <label for="title">Название задачи</label>
    <input id="title" v-model="newTodoTitle">
    <label for="description">Описание</label>
    <textarea id="description" cols="30" name="todo-body" rows="3" v-model="newTodoDescription"></textarea>
    <button @click="addTodo">Создать</button>
  </div>
</template>

<script>
export default {
  name: "TodoCreate",
  data() {
    return {
      newTodoTitle: '',
      newTodoDescription: ''
    }
  },
  methods: {
    async addTodo() {
      if (!this.newTodoTitle || !this.newTodoDescription) return
      await this.$store.dispatch('addNewTodo', {title: this.newTodoTitle, description: this.newTodoDescription })
      this.newTodoTitle = ''
      this.newTodoDescription = ''
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
  width: 90%;
  display: flex;
  flex-direction: column;
}
.container > label {
  padding: 10px;
}
button {
  margin: 10px auto;
  width: 200px;
}
</style>