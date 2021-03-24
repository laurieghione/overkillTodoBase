import { State } from './reducer';
import { selectTodos, selectTodo } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { id: 0, title: 'todo1Title', isClosed: true },
      { id: 1, title: 'todo2Title', isClosed: false },
    ],
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todo', () => {
    const result = selectTodo.projector(initialState, { id: 0 });
    expect(result).toEqual(initialState.todos[0]);
  });
});
