import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item.model';
import { Observable } from 'rxjs/Observable';

const LOCAL_STORAGE_KEY = 'todo';

@Injectable()
export class TodoService {

  constructor() { }

  private getItemsFromLocalStorage(): Observable<TodoListItem[]> {
    return Observable.of(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  }

  private sortItems(items: TodoListItem[]): TodoListItem[] {
    return items.sort((item1: TodoListItem, item2: TodoListItem) => item1.priority - item2.priority);
  }

  get(): Observable<TodoListItem[]> {
    return this.getItemsFromLocalStorage().map(items => {
      return this.sortItems(items);
    });
  }

  set(item: TodoListItem): Observable<TodoListItem[]> {
    return this.getItemsFromLocalStorage().map(items => {
      items.unshift(item);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      return this.sortItems(items);
    });
  }

  delete(id: string): Observable<TodoListItem[]> {
    return this.getItemsFromLocalStorage().map(items => {
      const index = items.findIndex(item => item.id === id);
      if (index === -1) {
        return items;
      }
      items.splice(index, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      return this.sortItems(items);
    });
  }

  update(itemToUpdate: TodoListItem): Observable<TodoListItem[]> {
    return this.getItemsFromLocalStorage().map(items => {
      const index = items.findIndex(item => item.id === itemToUpdate.id);
      if (index === -1) {
        return items;
      }

      items = items.map(item => {
        if (item.id === itemToUpdate.id) {
          return itemToUpdate;
        }
        return item;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      return this.sortItems(items);
    });
  }
}
