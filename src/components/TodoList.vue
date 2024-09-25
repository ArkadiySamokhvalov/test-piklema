<template>
  <transition name="todo-list" mode="out-in">
    <transition-group v-if="todoList.length > 0" tag="ol" class="list" name="todo" appear>
      <li class="list-item" v-for="todo in todoList" :key="todo.id">
        <button class="button" @click="toggleCompleted(todo.id)">
          <BaseIcon v-if="!todo.completed" class="checkbox-icon">
            <CheckboxUncheck />
          </BaseIcon>

          <BaseIcon v-if="todo.completed" class="checkbox-icon">
            <CheckboxCheck />
          </BaseIcon>
        </button>

        <EditableField
          :id="todo.id"
          :task="todo.task"
          :completed="todo.completed"
          @change="changeTask"
          v-bind="$attrs"
        />

        <button class="button" @click="removeTodo(todo.id)">
          <BaseIcon>
            <CancelInCircle />
          </BaseIcon>
        </button>
      </li>
    </transition-group>
    <p v-else class="empty">Задач нет</p>
  </transition>
</template>

<script setup lang="ts">
import EditableField from './EditableField.vue';
import BaseIcon from './BaseIcon.vue';
import CancelInCircle from './icons/CancelInCircle.vue';
import CheckboxCheck from './icons/CheckboxCheck.vue';
import CheckboxUncheck from './icons/CheckboxUncheck.vue';

import { useTodoListStore } from '@/store/useTodoListStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useTodoListStore();
const { todoList } = storeToRefs(store);
const { toggleCompleted, removeTodo, changeTask } = store;

onMounted(() => {
  console.log(todoList);
});
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  background-color: var(--color-white);

  + .list-item {
    margin-top: 0.25rem;
  }
}

.checkbox-icon {
  color: var(--color-gray);
}

.button {
  border: none;
  background-color: transparent;
  color: var(--color-danger);
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: var(--color-danger-hover);
  }
}

.checkbox-label,
.button {
  flex-shrink: 0;
  padding: 0 0.5rem;
  width: 40px;
  height: 40px;
}

.empty {
  color: var(--color-white);
  text-align: center;
}

/* Animations */
.todo-enter-active,
.todo-move {
  transition: 0.4s ease all;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.todo-leave-active {
  position: absolute;
  transition: 0.4s ease all;
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: 0.4s ease all;
}

.todo-list-enter-from,
.todo-list-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
