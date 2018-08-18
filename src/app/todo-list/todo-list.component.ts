import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item';
import { TodoService } from '../todo.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { APPLICATION_MODULE_PROVIDERS } from '@angular/core/src/application_module';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService, private bottomSheet: MatBottomSheet) {}

  // event-handlers START

  onItemClick = (clickedTodo: TodoItem) => {
    console.log("item clicked: " + clickedTodo.title);
    // slide in bottom sheet
    this.todoService.selectedItem = clickedTodo;
    this.bottomSheet.open(TodoItemComponent);
  }

  onItemCheck = (checkedTodo: TodoItem) => {
    console.log(checkedTodo);
    this.todoService.update(checkedTodo);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      console.log("enter pressed");
      this.addItem();
    }
  }

  onClickDelete = (clickedTodo: TodoItem) => {
    console.log("item clicked for deletion: " + clickedTodo.title);
    this.todoService.remove(clickedTodo);
  }
  
  addItem = () => {
    this.todoService.add();
  }
  
  ngOnInit() {
    this.todoService.loadItems();
  }
  
  // event-handlers END
}
