<template>
  <div>
    <div v-for="item in todoList" :key="item.id">
      <p>{{ item.title }}</p>
      <p>{{ item.body }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "TodoList",
  computed: {
    todoList() {
      return this.$store.state.todos
    }
  }
}
</script>

<style scoped>

</style>