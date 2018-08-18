import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../todo-item';
import { MatBottomSheetRef } from '@angular/material';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TodoItemComponent>, 
    private todoService: TodoService) { }

  onClickSave() {
    this.todoService.update(this.currentItem);
    this.bottomSheetRef.dismiss();
  }

  currentItem: TodoItem;

  ngOnInit() {
    this.bottomSheetRef.afterOpened().subscribe(
      (value) => { 
        console.log("sheet is up");
        this.currentItem = Object.assign({}, this.todoService.selectedItem); 
      }
    );
    this.bottomSheetRef.afterDismissed().subscribe(
      () => {
        this.todoService.selectedItem = null;
      }
    )
  }

}
