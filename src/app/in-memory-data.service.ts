import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {

  constructor() { }

  createDb() {
    const todos = [
      { id: 0, title: "HTML lernen", done: true},
      { id: 1, title: "Javascript lernen", done: true},
      { id: 2, title: "Typescript lernen", done: true},
      { id: 3, title: "Angular lernen", done: false},
    ];
    return {todos};
  };

}
