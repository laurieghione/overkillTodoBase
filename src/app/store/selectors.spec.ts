import { State } from './reducer';
import { selectTodos, selectTodo, selectLoading } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { id: 0, title: 'todo1Title', isClosed: true },
      { id: 1, title: 'todo2Title', isClosed: false },
    ],
    loading: false,
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todo', () => {
    const result = selectTodo.projector(initialState, { id: 0 });
    expect(result).toEqual(initialState.todos[0]);
  });

  it('should not select todo', () => {
    const initialState: State = {
      todos: [],
      loading: false,
    };
    const result = selectTodo.projector(initialState, { id: 1 });
    expect(result).toEqual(null);
  });

  it('should select loading', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });
});
