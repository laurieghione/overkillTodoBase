import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccess, updateTodoSuccess } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: 0, title: 'aTitle', isClosed: false }],
      };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('updateTodoSuccess action', () => {
    it('should update one todo, sort all todos and update the state', () => {
      const initialState = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
      };

      const todos: State = {
        todos: [
          { id: 1, title: 'todo 2', isClosed: false },
          { id: 0, title: 'todo 1', isClosed: true },
        ],
      };
      const action = updateTodoSuccess({
        selectedTodo: { id: 0, title: 'todo 1', isClosed: true },
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(todos);
      expect(state).not.toBe(todos);
    });
  });
});
