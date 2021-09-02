<template>
  <div class="container">
    <v-text-field v-model="newTodoTitle"
                  label="Заголовок"
                  outlined
                  placeholder="Заголовок вашей задачи"
                  rounded
                  tabindex="1" type="text"></v-text-field>
    <v-textarea v-model="newTodoDescription"
                label="Описание"
                no-resize
                outlined
                placeholder="Можете описать вашу задачу немного подробнее"
                rounded rows="3" tabindex="2"></v-textarea>
    <v-btn rounded @click="addTodo">Создать</v-btn>
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
      await this.$store.dispatch('addNewTodo', {title: this.newTodoTitle, description: this.newTodoDescription})
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

input, textarea {
  border: 1px solid #2c3e50;
}
</style>