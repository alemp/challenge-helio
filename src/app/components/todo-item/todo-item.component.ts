import { Component, OnInit, Input } from '@angular/core';
import { TodoListItem } from '../../models/todo-list-item.model';
import { Store } from '@ngrx/store';
import { TodoState } from '../../app.state';
import * as todoActions from '../../store/todo.actions';
import fontawesome from '@fortawesome/fontawesome';
import { faSquare, faCheckSquare, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoListItem;
  constructor(private store: Store<TodoState>) {
    fontawesome.library.add(faSquare, faCheckSquare, faTrashAlt, faCaretUp, faCaretDown);
  }

  ngOnInit() {
  }

  done(item: TodoListItem) {
    item.isMarkedAsDone = !item.isMarkedAsDone;
    this.store.dispatch(new todoActions.UpdateTodo(item));
  }

  delete(item: TodoListItem) {
    this.store.dispatch(new todoActions.DeleteTodo(item));
  }

  priorityUp(item: TodoListItem) {
    item.priority = item.priority > 0 ? item.priority -= 1 : item.priority = 0;
    this.store.dispatch(new todoActions.UpdateTodo(item));
  }

  priorityDown(item: TodoListItem) {
    item.priority = item.priority >= 9 ? item.priority = 9 : item.priority += 1;
    this.store.dispatch(new todoActions.UpdateTodo(item));
  }
}
