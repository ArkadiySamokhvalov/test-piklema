import { defineStore } from 'pinia';

type ToDoItem = {
  id: number;
  task: string;
  completed: boolean;
};

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: <ToDoItem[]>[],
    id: 0
  }),
  actions: {
    addTodo(task: string) {
      this.todoList.push({ task, id: this.id++, completed: false });
    },
    removeTodo(id: number) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
    changeTask(id: number, task: string) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.task = task;
      }
    },
    toggleCompleted(id: number) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
      }
    }
  }
});
