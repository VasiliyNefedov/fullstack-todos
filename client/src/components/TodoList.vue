<template>
  <div>
    <div v-for="item in todoList" :key="item.id">
      <p><strong>{{ item.title }}</strong></p>
      <p>{{ item.description }}</p>
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
  },
  mounted() {
    this.$store.dispatch('getTodos')
  }
}
</script>

<style scoped>

</style>