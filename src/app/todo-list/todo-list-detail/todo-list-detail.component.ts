import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodo, selectTodos } from '../../store/selectors';
import { Todo } from 'src/app/models/todo';
import { Observable } from 'rxjs';
import { loadTodos } from 'src/app/store/actions';

@Component({
  templateUrl: './todo-list-detail.component.html',
  styleUrls: ['./todo-list-detail.component.scss'],
})
export class TodoListDetailComponent implements OnInit {
  todo?: Todo | null;
  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.todos$.subscribe((todos) => {
      if (!todos.length) {
        this.store.dispatch(loadTodos());
      }
    });
    let id: string | null = this.route.snapshot.paramMap.get('id');

    this.store.select(selectTodo, { id: Number(id) }).subscribe((todo) => {
      this.todo = todo;
    });
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
