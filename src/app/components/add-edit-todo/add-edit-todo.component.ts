import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../service/todo.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit-todo.component.html',
  styleUrl: './add-edit-todo.component.css'
})
  
export class AddEditTodoComponent implements OnInit {
 @Input() todo: Todo | null = null;  
  @Output() saved = new EventEmitter<void>();  

  title: string = '';
  startDate: string = '';
  endDate: string = '';
  category: string = '';
  dependsOn?: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // If editing a todo, reuturn the form with its data
    if (this.todo) {
      this.title = this.todo.title;
      this.startDate = this.todo.startDate;
      this.endDate = this.todo.endDate;
      this.category = this.todo.category;
      this.dependsOn = this.todo.dependsOn;
    }
  }

  // Save the todo
  save(): void {
  const newTodo: Todo = {
    id: this.todo ? this.todo.id : Date.now(),  
    title: this.title,
    startDate: this.startDate,
    endDate: this.endDate,
    category: this.category,
    dependsOn: this.dependsOn,  
  };

    if (this.todo) {
       this.todoService.updateTodo(newTodo);
    } else {
       this.todoService.addTodo(newTodo);
    }

     this.saved.emit();
  }

  
}