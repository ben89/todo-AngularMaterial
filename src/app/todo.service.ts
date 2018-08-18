import { Injectable } from '@angular/core';
import { TodoItem } from 'src/app/todo-item';
import { Observable, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  API_URL: string = "api/todos"

  constructor(private httpClient: HttpClient) { }

  public selectedItem: TodoItem;

  public todos: TodoItem[];

  public newTodoText: string;

  /**
   * performs GET call to retrieve all todos
   */
  public getAll() : Observable<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(this.API_URL);
  }

  public add(): Observable<TodoItem> {
    // send to data-source
    let newTodo = new TodoItem(this.newTodoText);
    let observable : Observable<TodoItem> = this.httpClient.post<TodoItem>(this.API_URL, newTodo, httpOptions);
    observable.subscribe(
      (todo) => {this.loadItems(); },
      (err) => {console.log(err)},
      () => {
        this.newTodoText = '';
        console.log("API: add() complete")
      }
    );

    return observable;
  }

  public getById(id: number): Observable<TodoItem> {
    let url = this.API_URL + '/' + id;
    return this.httpClient.get<TodoItem>(url);
  }

  public update(todo: TodoItem = this.selectedItem): Observable<TodoItem> {
    console.log("sending todo: ");
    console.log(todo);
    let url = this.API_URL + '/' + todo.id;
    let observable: Observable<TodoItem> = this.httpClient.put<TodoItem>(url, todo, httpOptions);
    observable.subscribe(
      (data) => {},
      (err) => {},
      () => {
        this.loadItems();
      }
    )

    return observable;
  }

  public remove(todo: TodoItem): Observable<TodoItem> {
    let url = this.API_URL + '/' + todo.id;
    let observable: Observable<TodoItem> = this.httpClient.delete<TodoItem>(url);
    observable.subscribe(
      (data) => {},
      (err) => {},
      () => {
        this.loadItems();
      }
    )

    return observable;
  }

  public loadItems = () => {
    let observable : Observable<TodoItem[]> = this.getAll(); 
    observable.subscribe(
      (todos) => {this.todos = todos},
      (err) => {console.log(err)},
      () => {console.log("API: getAll() complete")}
    );
  }

  // public remove(id: number) {
  //   // TODO: implement  
  // }

}
