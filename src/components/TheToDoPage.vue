<template>
  <div class="container">
    <TodoForm />
    <TodoList class="todo-list" />
  </div>
</template>

<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
</script>

<style scoped>
.container {
  padding: 24px;

  @media (width >= 768px) {
    margin-inline: auto;
    padding: 3rem 0;
    max-width: 768px;
  }
}

.todo-list {
  margin-top: 2rem;
}
</style>
