import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  updateTodo,
  updateTodoFailed,
  updateTodoSuccess,
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

  updateTodos$ = createEffect(() =>
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

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
