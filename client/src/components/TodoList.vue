<template>
  <div>
    <div v-for="item in todoList" :key="item.id" class="todo">
      <div class="todo__head">
        <div><label>Выполнено</label><input type="checkbox"></div>
        <div class="todo__title"><p><strong>{{ item.title }}</strong></p></div>
        <div>
          <button class="del-btn">Удалить</button>
        </div>
      </div>
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
.todo {
  margin: 10px auto;
  width: 90%;
  max-width: 800px;
  border: lightcoral 3px solid;
  border-radius: 10px;
}
.todo__head {
  display: flex;
  flex-direction: row;
}
.todo__title {
  flex:1 1 auto;
}
.del-btn {
  width: 80px;
}
</style>