<template>
  <div class="home">
    <TodoCreate/>
    <TodoList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList";
import TodoCreate from "@/components/TodoCreate";

export default {
  name: 'Home',
  components: {
    TodoCreate,
    TodoList,
  }
}
</script>
