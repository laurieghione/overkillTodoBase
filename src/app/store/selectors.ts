import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos
);

export const selectTodo = createSelector(getState, (state: State, props: any) =>
  state.todos ? state.todos.find((todo) => todo.id === props.id) : null
);
