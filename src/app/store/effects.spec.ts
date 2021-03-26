import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import {
  createTodo,
  createTodoFailed,
  createTodoSuccess,
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  updateTodo,
  updateTodoFailed,
  updateTodoSuccess,
} from './actions';
import { Todo } from '@models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', [
    'list',
    'update',
    'create',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id: 0, title: 'aTitle', isClosed: true }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('updateTodo$', () => {
    it('should dispatch updateTodosSuccess action when todoService.update return a result', () => {
      const mockedSelectedTodo: Todo = {
        id: 0,
        title: 'aTitle',
        isClosed: true,
      };
      todoService.update.and.returnValue(of(mockedSelectedTodo));

      actions = hot('-a-', {
        a: updateTodo({ selectedTodo: mockedSelectedTodo }),
      });
      const expected = cold('-b-', {
        b: updateTodoSuccess({ selectedTodo: mockedSelectedTodo }),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    it('should dispatch updateTodoFailed action when todoService.update fails', () => {
      todoService.update.and.returnValue(cold('#'));
      const mockedSelectedTodo: Todo = {
        id: 0,
        title: 'aTitle',
        isClosed: true,
      };

      actions = hot('-a-', {
        a: updateTodo({ selectedTodo: mockedSelectedTodo }),
      });
      const expected = cold('-b-', {
        b: updateTodoFailed(),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    it('should dispatch createTodosSuccess action when todoService.create return a result', () => {
      const mockedNewTodo: Todo = {
        title: 'aTitle',
        isClosed: false,
      };
      todoService.create.and.returnValue(of(mockedNewTodo));

      actions = hot('-a-', {
        a: createTodo({ newTodo: mockedNewTodo }),
      });
      const expected = cold('-b-', {
        b: createTodoSuccess({ todo: mockedNewTodo }),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });

    it('should dispatch createTodoFailed action when todoService.create fails', () => {
      todoService.create.and.returnValue(cold('#'));
      const mockedNewTodo: Todo = {
        title: 'aTitle',
        isClosed: false,
      };

      actions = hot('-a-', {
        a: createTodo({ newTodo: mockedNewTodo }),
      });
      const expected = cold('-b-', {
        b: createTodoFailed(),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });
});
function updateTodosFailed() {
  throw new Error('Function not implemented.');
}
