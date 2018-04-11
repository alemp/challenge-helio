import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TodoState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoListItem } from '../../models/todo-list-item.model';
import * as todoActions from '../../store/todo.actions';
import * as fromReducer from '../../store/todo.reducer';
import fontawesome from '@fortawesome/fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, AfterViewInit {
  todoForm: FormGroup;
  @ViewChild('inputName') inputEl: ElementRef;
  items: Observable<TodoListItem[]>;

  constructor(private store: Store<TodoState>, private fb: FormBuilder) {
    fontawesome.library.add(faSearch);
  }

  createForm() {
    this.todoForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
    this.store.dispatch(new todoActions.GetTodo());
    this.items = this.store.select(fromReducer.getTodos);
  }

  giveFocus() {
    this.todoForm.setValue({ name: '' });
    this.todoForm.reset();
    this.inputEl.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.giveFocus();
  }

  get name() {
    return this.todoForm.get('name');
  }

  addTodo(value: string) {
    if (value !== '') {
      this.store.dispatch(new todoActions.SetTodo({
        id: Math.random().toString(36).substr(2, 9),
        name: value,
        isMarkedAsDone: false,
        priority: 9
      }));
      this.giveFocus();
    }
  }

  search(value) {
    this.store.dispatch(new todoActions.SearchTodo(value));
  }

}
