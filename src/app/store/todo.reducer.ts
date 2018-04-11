import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoListItem } from '../models/todo-list-item.model';
import { TodoState } from '../app.state';
import * as fromActions from './todo.actions';

export const initialState: TodoState = { todos: [], message: ''};

export const reducer = (state = initialState, action: fromActions.ALL_REDUCER_ACTIONS): TodoState => {
  switch (action.type) {
    case fromActions.GET_TODO_SUCCESS:
    case fromActions.UPDATE_TODO_SUCCESS:
    case fromActions.DELETE_TODO_SUCCESS:
      return { todos: action.payload, message: 'Success' };
    case fromActions.SET_TODO_SUCCESS:
      return { todos: action.payload, message: 'Todo created successfully'};
    case fromActions.SEARCH_TODO_SUCCESS:
      return { todos: action.payload, message: 'Todo searched'};
    default:
      return state;
  }
};

export const getTodoState = createFeatureSelector<TodoState>('todoState');

export const getTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.todos
);

export const getMessage = createSelector(
  getTodoState,
  (state: TodoState) => state.message
);
