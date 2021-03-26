import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '@models/todo';
import { select, Store } from '@ngrx/store';
import { selectLoading, selectTodos } from '@store/selectors';
import { updateTodo } from '@store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ReadonlyArray<Todo>>;
  loading: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.store.pipe(select(selectLoading)).subscribe((loading) => {
      this.loading = loading;
    });
  }

  onChange(todo: Todo): void {
    this.store.dispatch(
      updateTodo({ selectedTodo: { ...todo, isClosed: !todo.isClosed } })
    );
  }

  onAdd(): void {
    this.router.navigate(['todo/add']);
  }
}
