import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/observable/if';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { TodoService } from '../services/todo.service';
import * as todoActions from './todo.actions';
import { TodoState } from '../app.state';
import { TodoListItem } from '../models/todo-list-item.model';

@Injectable()
export class TodoEffects {
  constructor(
    private service: TodoService,
    private actions$: Actions,
    private store: Store<TodoState>) {}

  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType<todoActions.GetTodo>(todoActions.GET_TODO)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.service.get()
        .map(data => new todoActions.GetTodoSuccess(data))
        .catch(error => of(new todoActions.GetTodoFailed(error)))
    );

  @Effect()
  set$: Observable<Action> = this.actions$
    .ofType<todoActions.SetTodo>(todoActions.SET_TODO)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.service.set(payload)
        .map(data => new todoActions.SetTodoSuccess(data))
        .catch(error => of(new todoActions.SetTodoFailed(error)))
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<todoActions.UpdateTodo>(todoActions.UPDATE_TODO)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.service.update(payload)
        .map(data => new todoActions.UpdateTodoSuccess(data))
        .catch(error => of(new todoActions.UpdateTodoFailed(error)))
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<todoActions.DeleteTodo>(todoActions.DELETE_TODO)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.service.delete(payload.id)
        .map(data => new todoActions.DeleteTodoSuccess(data))
        .catch(error => of(new todoActions.DeleteTodoFailed(error)))
    );

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType<todoActions.SearchTodo>(todoActions.SEARCH_TODO)
    .map(action => action.payload)
    .switchMap(value => {
      const hasValue: boolean = value.length > 0;
      let result;
      if (hasValue) {
        result = this.service.get()
          .map(todos => new todoActions.GetTodoSuccess(todos.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)));
      } else {
        result = this.service.get()
          .map(todos => new todoActions.GetTodoSuccess(todos));
      }
      return result;
    });
}
