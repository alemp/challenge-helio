import { TodoListItem } from './models/todo-list-item.model';

export interface AppState {
  readonly todoState: TodoState;
}

export interface TodoState {
  todos: TodoListItem[];
  message: any;
}
