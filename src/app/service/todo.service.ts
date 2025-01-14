import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";


@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private todos: Todo[] = [];
  private readonly storageKey = 'todos';

  constructor() {
    this.loadTodos();
  }

   private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.storageKey);
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  }
 
   private saveTodos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }
 
   addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveTodos();
  }

   getTodos(): Todo[] {
    return this.todos;
  }  

   updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.saveTodos();
    }
  }

   deleteTodo(id: number): boolean {
   if (this.todos.some((t) => t.dependsOn === id)) {
    alert('Cannot delete this item because it is a dependency for another item.');
    return false; 
  }
   this.todos = this.todos.filter((t) => t.id !== id);
  this.saveTodos();
  return true;  
}

   searchByTitle(query: string): Todo[] {
  if (!query) {
    return this.todos;  
  }
  return this.todos.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );
}
  // Filter by category
  filterByCategory(category: string): Todo[] {
    return this.todos.filter((t) => t.category === category);
  }

  // Filter by date range
  filterByDateRange(startDate: string, endDate: string): Todo[] {
    return this.todos.filter(
      (t) => t.startDate >= startDate && t.endDate <= endDate
    );
  }

  
}