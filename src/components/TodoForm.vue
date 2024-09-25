<template>
  <form class="todo-form" @submit.prevent="addTask(inputModel)">
    <input
      class="input"
      type="text"
      v-model.lazy.trim="inputModel"
      placeholder="Что нужно сделать?"
      required
    />
    <button class="button" type="submit">
      <BaseIcon>
        <CancelInCircle />
      </BaseIcon>
    </button>
  </form>
</template>

<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
import CancelInCircle from './icons/CancelInCircle.vue';

import { useTodoListStore } from '@/store/useTodoListStore';

defineEmits<{ (e: 'onSubmit', data: string): void }>();
const store = useTodoListStore();
const inputModel = defineModel<string>();

function addTask(task: string | undefined) {
  if (!task || task.length === 0) {
    return;
  }

  store.addTodo(task);
  inputModel.value = '';
}
</script>

<style scoped>
.todo-form {
  display: flex;
  width: 100%;
  height: 48px;
}

.input {
  padding: 0 16px;
  width: 100%;
  height: 100%;
  outline-offset: -2px;
  border: none;
}

.button {
  padding: 0 8px;
  width: 40px;
  box-shadow: none;
  border: none;
  background-color: var(--color-white);
  color: green;
  transition: 0.4s;

  &:hover {
    color: rgb(2 200 2);
  }

  svg {
    transform: rotate(45deg);
  }
}
</style>
