import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoListItem } from '../models/todo-list-item.model';

describe('TodoService', () => {
  let service: TodoService;
  let item: TodoListItem;

  beforeAll(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    item = {
      id: '1',
      name: 'TODO Test 1',
      isMarkedAsDone: false,
      priority: 0
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });

    service = TestBed.get(TodoService);
  });

  it('should be created', inject([TodoService], () => {
    expect(service).toBeTruthy();
  }));

  describe('set()', () => {
    it('should create an item and store at localStorage', () => {
      service.set(item).subscribe(result => {
        expect(result).toBeTruthy();
      });
    });
  });

  describe('get()', () => {
    it('should get all items of todo at localStorage', () => {
      service.get().subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
      });
    });
  });

  describe('update()', () => {
    it ('should update the item stored at localStorage', () => {
      item.isMarkedAsDone = true;
      service.update(item).subscribe(result => {
        expect(result).toBeTruthy();
      });
    });
  });

  describe('delete()', () => {
    it ('should delete the item stored at localStorage', () => {
      service.delete(item.id).subscribe(result => {
        expect(result).toBeTruthy();
      });
    });
    it ('should be zero items after delete the item at localStorage', () => {
      service.get().subscribe(items => {
        expect(items.length).toBeLessThanOrEqual(0);
      });
    });
  });
});
