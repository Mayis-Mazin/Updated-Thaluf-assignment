import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../service/todo.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
  
export class TodoListComponent {
  todos: Todo[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  startDate: string = '';
  endDate: string = '';
  @Output() editTodo = new EventEmitter<Todo>();

 
  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
    
  }

  // Search by title
  search(): void {
    this.todos = this.todoService.searchByTitle(this.searchQuery);
  }

   filterByCategory(): void {
    this.todos = this.todoService.filterByCategory(this.selectedCategory);
  }

   filterByDateRange(): void {
    this.todos = this.todoService.filterByDateRange(this.startDate, this.endDate);
  }

   deleteTodo(id: number): void {
    if (this.todoService.deleteTodo(id)) {
      this.todos = this.todoService.getTodos();
    }
  }

    edit(todo: Todo): void {
    this.editTodo.emit(todo);
  }
  

  clearFilters(): void {
    this.searchQuery = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedCategory = '';
    this.todos = this.todoService.getTodos();  
  }
}