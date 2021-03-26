import * as fromReducer from './reducer';
import { State } from './reducer';
import {
  createTodo,
  createTodoSuccess,
  loadTodos,
  loadTodosSuccess,
  updateTodoSuccess,
} from './actions';

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
        loading: false,
      };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadTodos action', () => {
    it('should update loading state', () => {
      const initialState = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
        loading: false,
      };
      const todos: State = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
        loading: true,
      };
      const action = loadTodos();

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(todos);
      expect(state).not.toBe(todos);
    });
  });

  describe('updateTodoSuccess action', () => {
    it('should update one todo, sort all todos and update the state', () => {
      const initialState = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
        loading: false,
      };

      const todos: State = {
        todos: [
          { id: 1, title: 'todo 2', isClosed: false },
          { id: 0, title: 'todo 1', isClosed: true },
        ],
        loading: false,
      };
      const action = updateTodoSuccess({
        selectedTodo: { id: 0, title: 'todo 1', isClosed: true },
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(todos);
      expect(state).not.toBe(todos);
    });
  });

  describe('createTodo action', () => {
    it('should update loading state', () => {
      const initialState = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
        loading: false,
      };
      const todos: State = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: false },
        ],
        loading: true,
      };
      const action = createTodo({
        newTodo: {
          id: 2,
          title: 'todo 3',
          description: 'take a break',
          isClosed: false,
        },
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(todos);
      expect(state).not.toBe(todos);
    });
  });

  describe('createTodoSuccess action', () => {
    it('should create one todo and update the state', () => {
      const initialState = {
        todos: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: true },
        ],
        loading: false,
      };

      const todos: State = {
        todos: [
          {
            id: 2,
            title: 'todo 3',
            description: 'take a break',
            isClosed: false,
          },
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: true },
        ],
        loading: false,
      };
      const action = createTodoSuccess({
        todo: {
          id: 2,
          title: 'todo 3',
          description: 'take a break',
          isClosed: false,
        },
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(todos);
      expect(state).not.toBe(todos);
    });
  });
});
