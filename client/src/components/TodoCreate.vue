<template>
  <div>
    <input type="text" v-model="newTodoTitle">
    <textarea id="" cols="30" name="todo-body" rows="3" v-model="newTodoDescription"></textarea>
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

</style>