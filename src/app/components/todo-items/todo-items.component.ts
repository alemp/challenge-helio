import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from '../../app.state';
import { Observable } from 'rxjs/Observable';
import { TodoListItem } from '../../models/todo-list-item.model';
import * as todoActions from '../../store/todo.actions';
import * as fromReducer from '../../store/todo.reducer';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {
  items: Observable<TodoListItem[]>;
  constructor(private store: Store<TodoState>) {

  }

  ngOnInit() {
    this.store.dispatch(new todoActions.GetTodo());
    this.items = this.store.select(fromReducer.getTodos);
  }

}
