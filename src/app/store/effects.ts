import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  updateTodo,
  updateTodoFailed,
  updateTodoSuccess,
  createTodo,
  createTodoSuccess,
  createTodoFailed,
} from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap((action) =>
        this.todoService.update(action.selectedTodo).pipe(
          map(() => updateTodoSuccess({ selectedTodo: action.selectedTodo })),
          catchError(() => [updateTodoFailed()])
        )
      )
    )
  );
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      mergeMap((action) =>
        this.todoService.create(action.newTodo).pipe(
          map((todo) => createTodoSuccess({ todo })),
          catchError(() => [createTodoFailed()])
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
