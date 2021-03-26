import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '@models/todo';
import { createTodo } from '@store/actions';
import { selectLoading } from '@store/selectors';
import { TitleValidator } from '@shared/title.validator';

@Component({
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  loading$?: Observable<boolean>;
  errorMessage: string = '';
  constructor(private route: Router, private store: Store) {
    this.todoForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        TitleValidator.blankValidator,
      ]),
      description: new FormControl(),
    });
  }

  ngOnInit(): void {
    const titleControl = this.todoForm.get('title');
    titleControl?.valueChanges.subscribe(() => this.setMessage(titleControl));
  }

  setMessage(control: AbstractControl): void {
    if ((control.touched || control.dirty) && control.errors?.required) {
      this.errorMessage = 'Title is required';
    } else if ((control.touched || control.dirty) && control.errors?.blank) {
      this.errorMessage = 'Title is empty';
    }
  }

  onCancel(): void {
    this.goToHome();
  }

  goToHome(): void {
    this.route.navigate(['']);
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      let todo: Todo = { ...this.todoForm.value, isClosed: false };
      this.store.dispatch(createTodo({ newTodo: todo }));
      this.store.pipe(select(selectLoading)).subscribe((loading) => {
        if (!loading) {
          this.goToHome();
        }
      });
    }
  }
}
