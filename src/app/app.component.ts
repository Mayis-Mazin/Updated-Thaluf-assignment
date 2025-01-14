import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { Todo } from './interfaces/todo';
import { AddEditTodoComponent } from './components/add-edit-todo/add-edit-todo.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent,AddEditTodoComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

selectedTodo: Todo | null = null;
showAddEditTodo: boolean = false;  

    showAddTodo(): void {
    this.selectedTodo = null; 
    this.showAddEditTodo = true;  
  }



   onEditTodo(todo: Todo): void {
    this.selectedTodo = todo;  
    this.showAddEditTodo = true;  
  }

  
  onTodoSaved(): void {
    this.selectedTodo = null; 
    this.showAddEditTodo = false;  
  }
  
}