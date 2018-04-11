import { Action } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item.model';

export const GET_TODO = '[ToDo] Get Todo';
export const GET_TODO_SUCCESS = '[ToDo] Get Todo Success';
export const GET_TODO_FAILED = '[ToDo] Get Todo Failed';
export const SET_TODO = '[ToDo] Set Todo';
export const SET_TODO_SUCCESS = '[ToDo] Set Todo Success';
export const SET_TODO_FAILED = '[ToDo] Set Todo Failed';
export const UPDATE_TODO = '[ToDo] Update Todo';
export const UPDATE_TODO_SUCCESS = '[ToDo] Update Todo Success';
export const UPDATE_TODO_FAILED = '[ToDo] Update Todo Failed';
export const DELETE_TODO = '[ToDo] Delete Todo';
export const DELETE_TODO_SUCCESS = '[ToDo] Delete Todo Success';
export const DELETE_TODO_FAILED = '[ToDo] Delete Todo Failed';
export const SEARCH_TODO = '[ToDo] Search Todo';
export const SEARCH_TODO_SUCCESS = '[ToDo] Search Todo Success';
export const SEARCH_TODO_FAILED = '[ToDo] Search Todo Failed';

export class GetTodo implements Action {
  readonly type: string = GET_TODO;
  constructor(public payload?: string) {}
}

export class GetTodoSuccess implements Action {
  readonly type: string = GET_TODO_SUCCESS;
  constructor(public payload: TodoListItem[]) {}
}

export class GetTodoFailed implements Action {
  readonly type: string = GET_TODO_FAILED;
  constructor(public payload: any) {}
}

export class SetTodo implements Action {
  readonly type: string = SET_TODO;
  constructor(public payload: TodoListItem) {}
}

export class SetTodoSuccess implements Action {
  readonly type: string = SET_TODO_SUCCESS;
  constructor(public payload: TodoListItem[]) {}
}

export class SetTodoFailed implements Action {
  readonly type: string = SET_TODO_FAILED;
  constructor(public payload: any) {}
}

export class DeleteTodo implements Action {
  readonly type: string = DELETE_TODO;
  constructor(public payload: TodoListItem) {}
}

export class DeleteTodoSuccess implements Action {
  readonly type: string = DELETE_TODO_SUCCESS;
  constructor(public payload: TodoListItem[]) {}
}

export class DeleteTodoFailed implements Action {
  readonly type: string = DELETE_TODO_FAILED;
  constructor(public payload: any) {}
}

export class UpdateTodo implements Action {
  readonly type: string = UPDATE_TODO;
  constructor(public payload: TodoListItem) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type: string = UPDATE_TODO_SUCCESS;
  constructor(public payload: TodoListItem[]) {}
}

export class UpdateTodoFailed implements Action {
  readonly type: string = UPDATE_TODO_FAILED;
  constructor(public payload: any) {}
}

export class SearchTodo implements Action {
  readonly type: string = SEARCH_TODO;
  constructor(public payload: string) {}
}

export class SearchTodoSuccess implements Action {
  readonly type: string = SEARCH_TODO_SUCCESS;
  constructor(public payload: TodoListItem[]) {}
}

export type ALL_REDUCER_ACTIONS = GetTodoSuccess | SetTodoSuccess | UpdateTodoSuccess | DeleteTodoSuccess | SearchTodoSuccess;
