import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodo, selectTodos } from '@store/selectors';
import { Todo } from '@models/todo';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
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
    let id: string | null = this.route.snapshot.paramMap.get('id');
    this.store.select(selectTodo, { id: Number(id) }).subscribe((todo) => {
      this.todo = todo;
      if (!todo) {
        this.goToHome();
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }
}
