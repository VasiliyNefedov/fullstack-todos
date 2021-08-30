<template>
  <div>
    <div v-for="item in todoList" :key="item._id" class="todo" :class="{'todo__done': item.isDone}">
      <div class="todo__head">
        <div><label>Выполнено</label><input type="checkbox" :checked="item.isDone" @click="setDoneMark(item._id, item.isDone) "></div>
        <div class="todo__title"><p><strong>{{ item.title }}</strong></p></div>
        <div>
          <button class="del-btn" @click="deleteTodo(item._id)">Удалить</button>
        </div>
      </div>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "TodoList",
  methods: {
    deleteTodo(todoId) {
      this.$store.dispatch('deleteTodo', todoId)
    },
    setDoneMark(todoId, todoIsDone) {
        this.$store.dispatch('setTodoStatus', {todoId, todoIsDone})
    }
  },
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
.todo__done {
  border: #42b983 3px solid;
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