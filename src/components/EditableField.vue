<template>
  <div
    v-if="!showInput"
    :class="{ task: true, ['task-completed']: completed }"
    @click="showInputAndFocus"
  >
    {{ task }}
  </div>

  <input
    v-show="showInput"
    ref="input"
    v-model.lazy.trim="inputModel"
    class="input"
    @change="onChange"
    @blur="hideInput()"
  />
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';

const props = defineProps<{
  id: number;
  task: string;
  completed: boolean;
}>();
const emits = defineEmits<{
  (e: 'change', id: number, data: string): void;
}>();

const input = ref<HTMLInputElement | null>(null);
const inputModel = defineModel('inputValue', { type: String });
const showInput = ref(false);

onMounted(() => {
  inputModel.value = props.task;
});

async function showInputAndFocus() {
  showInput.value = true;
  await nextTick();

  if (input.value) {
    input.value.focus();
  }
}

function hideInput() {
  showInput.value = false;
}

function onChange() {
  if (inputModel.value) {
    emits('change', props.id, inputModel.value);
  }
}
</script>

<style scoped>
.task,
.input {
  cursor: pointer;
  flex-grow: 1;
  padding: 0.5rem;
}

.input {
  border: none;
}

.task {
  transition: 0.4s;

  &:hover {
    background-color: lightgray;
  }
}

.task-completed {
  position: relative;
  color: lightgrey;

  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: gray;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: strike;
    animation-timing-function: linear;
    content: '';
  }
}

@keyframes strike {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
</style>
