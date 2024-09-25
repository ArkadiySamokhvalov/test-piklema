import { defineStore } from 'pinia';

type ToDoItem = {
  id: number;
  task: string;
  completed: boolean;
};

function getLocalStoredTodoList(): ToDoItem[] {
  const todoList = localStorage.getItem('todoList');
  return todoList ? JSON.parse(todoList) : [];
}

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: getLocalStoredTodoList(),
    id: 0
  }),
  actions: {
    addTodo(task: string) {
      this.todoList.push({ task, id: this.id++, completed: false });
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
    removeTodo(id: number) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
    changeTask(id: number, task: string) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.task = task;
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
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
