import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const updateTodo = createAction(
  '[Todos] Update todo',
  props<{ selectedTodo: Todo }>()
);

export const updateTodoSuccess = createAction(
  '[Todos] Update todo success',
  props<{ selectedTodo: Todo }>()
);

export const updateTodoFailed = createAction('[Todos] Update todo failed');

export const createTodo = createAction(
  '[Todos] Add todo',
  props<{ newTodo: Todo }>()
);

export const createTodoSuccess = createAction(
  '[Todos] Add todo success',
  props<{ todo: Todo }>()
);

export const createTodoFailed = createAction('[Todos] Add todo failed');
