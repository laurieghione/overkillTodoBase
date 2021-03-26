import { Todo } from '@models/todo';
import { createReducer, on } from '@ngrx/store';
import {
  createTodo,
  createTodoSuccess,
  loadTodos,
  loadTodosSuccess,
  updateTodoSuccess,
} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  loading: boolean;
}

export const initialState: State = {
  todos: [],
  loading: false,
};

export const todosReducer = createReducer<State>(
  initialState,
  on(
    loadTodos,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    loadTodosSuccess,
    (state, { todos }): State => ({
      ...state,
      todos,
      loading: false,
    })
  ),

  on(
    updateTodoSuccess,
    (state, { selectedTodo }): State => ({
      ...state,
      todos: state.todos
        .map((todo) => (todo.id === selectedTodo.id ? selectedTodo : todo))
        .sort((a, b) => (a.isClosed === b.isClosed ? 0 : a.isClosed ? 1 : -1)),
      loading: false,
    })
  ),
  on(
    createTodo,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    createTodoSuccess,
    (state, { todo }): State => ({
      ...state,
      todos: [todo, ...state.todos],
      loading: false,
    })
  )
);
