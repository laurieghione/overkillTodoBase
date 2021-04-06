import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { Todo } from '@models/todo';
import { createTodo } from '@store/actions';
import { State } from '@store/reducer';
import { selectLoading } from '@store/selectors';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore<State>;
  let mockSelectLoading: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoFormComponent,
        MockComponents(
          MatIcon,
          MatDivider,
          MatCardActions,
          MatCardHeader,
          MatError,
          MatCardContent,
          MatCardTitle,
          MatFormField,
          MatCard,
          MatLabel
        ),
      ],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    mockSelectLoading = store.overrideSelector(selectLoading, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title control', () => {
    it(`should valid title`, () => {
      const title = component.todoForm.controls['title'];
      title.setValue('Todo 1');
      expect(title.valid).toBeTrue();
    });
    it(`should return blank error when title have blank`, () => {
      const title = component.todoForm.controls['title'];
      title.setValue('  ');
      expect(title.errors).toEqual({ blank: true });
      expect(title.valid).not.toBeTrue();
    });

    it(`should return required error when title is empty `, () => {
      const title = component.todoForm.controls['title'];
      expect(title.errors).toEqual({ required: true });
      expect(title.valid).not.toBeTrue();
    });
  });

  describe('error messages', () => {
    it('should not return error message when title has no error', () => {
      let input = fixture.debugElement.query(By.css('#title')).nativeElement;
      input.value = 'Todo 1';
      input.dispatchEvent(new Event('input'));

      expect(component.errorMessage).toEqual('');
    });
    it('should return error message when title has blank error', () => {
      let input = fixture.debugElement.query(By.css('#title')).nativeElement;
      input.value = ' ';
      input.dispatchEvent(new Event('input'));

      expect(component.errorMessage).toEqual('Title is empty');
    });
    it('should return error message when title has required error', () => {
      let input = fixture.debugElement.query(By.css('#title')).nativeElement;
      input.value = '';
      input.dispatchEvent(new Event('input'));

      expect(component.errorMessage).toEqual('Title is required');
    });
  });

  describe('cancel action', () => {
    it('should call onCancel when click on cancel button', () => {
      spyOn(component, 'onCancel');
      const btn = fixture.debugElement.query(By.css('#cancel'));
      btn.triggerEventHandler('click', {});
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should call go to home when on cancel', () => {
      spyOn(component, 'goToHome');
      component.onCancel();
      expect(component.goToHome).toHaveBeenCalled();
    });
  });

  describe('submit button', () => {
    it(`should enabled submit when title is valid`, () => {
      const title = component.todoForm.controls['title'];
      const submitBtn = fixture.debugElement.nativeElement.querySelector(
        '#submit'
      );
      title.setValue('Todo 1');
      fixture.detectChanges();
      expect(submitBtn.disabled).toBeFalse();
    });

    it(`should disabled submit when title is empty`, () => {
      const title = component.todoForm.controls['title'];
      const submitBtn = fixture.debugElement.nativeElement.querySelector(
        '#submit'
      );
      title.setValue('');
      fixture.detectChanges();
      expect(submitBtn.disabled).toBeTrue();
    });
  });

  describe('submit action', () => {
    it('should submit when form is valid', () => {
      const spyStoreDispatch = spyOn(store, 'dispatch').and.callThrough();
      spyOn(component, 'goToHome').and.callThrough();
      const title = component.todoForm.controls['title'];
      title.setValue('Todo 1');
      fixture.detectChanges();

      let button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      let todo: Todo = { ...component.todoForm.value, isClosed: false };
      expect(spyStoreDispatch).toHaveBeenCalledOnceWith(
        createTodo({ newTodo: todo })
      );
      expect(component.goToHome).toHaveBeenCalled();
    });
    it('should not submit when form is invalid', () => {
      const spyStoreDispatch = spyOn(store, 'dispatch');
      const title = component.todoForm.controls['title'];
      title.setValue(' ');

      component.onSubmit();

      expect(spyStoreDispatch).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('should not call goToHome when loading is true', () => {
      spyOn(store, 'dispatch').and.callThrough();
      spyOn(component, 'goToHome').and.callThrough();
      const title = component.todoForm.controls['title'];
      title.setValue('Todo 1');
      mockSelectLoading.setResult(true);

      component.onSubmit();

      expect(component.goToHome).not.toHaveBeenCalled();
    });
    it('should call goToHome when loading is false', () => {
      spyOn(store, 'dispatch').and.callThrough();
      spyOn(component, 'goToHome').and.callThrough();
      const title = component.todoForm.controls['title'];
      title.setValue('Todo 1');

      component.onSubmit();

      expect(component.goToHome).toHaveBeenCalled();
    });
  });
});
