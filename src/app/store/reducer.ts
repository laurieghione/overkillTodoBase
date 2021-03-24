import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { loadTodosSuccess, updateTodoSuccess } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer<State>(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }): State => ({
      ...state,
      todos,
    })
  ),
  on(
    updateTodoSuccess,
    (state, { selectedTodo }): State => ({
      ...state,
      todos: state.todos
        .map((todo) => (todo.id === selectedTodo.id ? selectedTodo : todo))
        .sort((a, b) => (a.isClosed === b.isClosed ? 0 : a.isClosed ? 1 : -1)),
    })
  )
);
