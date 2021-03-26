import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '@store/reducer';
import { selectLoading, selectTodos } from '@store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MockComponents, MockedComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { updateTodo } from '@store/actions';
import { Router } from '@angular/router';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let router: Router;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatIcon,
          MatDivider,
          MatCardActions,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard
        ),
      ],
      imports: [MatRippleModule, FormsModule, RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    store.overrideSelector(selectTodos, [
      { id: 0, title: 'todo 1', isClosed: false },
      { id: 1, title: 'todo 2', isClosed: true },
    ]);
    store.overrideSelector(selectLoading, false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(
      fixture.debugElement.query(By.css('mat-card-title')).nativeElement
        .innerText
    ).toEqual('Todos');
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(
      By.css('mat-list mat-list-item')
    );
    expect(todoElements.length).toEqual(2);
    expect(
      todoElements[0].query(By.css('h4')).nativeElement.innerText
    ).toContain('todo 1');
    expect(
      todoElements[1].query(By.css('h4')).nativeElement.innerText
    ).toContain('todo 2');
    const todoCheckboxes: MockedComponent<MatCheckbox>[] = todoElements
      .map((item) => item.query(By.css('mat-checkbox')))
      .map((item) => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should call onChange on check one todo', () => {
    spyOn(component, 'onChange');
    const todoElement = fixture.debugElement.query(By.css('mat-checkbox'));
    todoElement.triggerEventHandler('change', {});
    let selectedTodo = { id: 0, title: 'todo 1', isClosed: false };
    expect(component.onChange).toHaveBeenCalledOnceWith(selectedTodo);
  });

  it('should line-through when todo is closed', () => {
    const todoElement = fixture.debugElement.queryAll(By.css('h4'));
    expect(todoElement[1].nativeElement.getAttribute('style')).toEqual(
      'text-decoration: line-through;'
    );
  });

  it('should not line-through when todo is not closed', () => {
    const todoElement = fixture.debugElement.queryAll(By.css('h4'));
    expect(todoElement[0].nativeElement.getAttribute('style')).toBeNull();
  });

  it('should dispatch update todo when on change', () => {
    const spyStoreDispatch = spyOn(store, 'dispatch');
    const todoElement = fixture.debugElement.query(By.css('mat-checkbox'));
    todoElement.triggerEventHandler('change', {});
    let selectedTodo = { id: 0, title: 'todo 1', isClosed: true };

    expect(spyStoreDispatch).toHaveBeenCalledOnceWith(
      updateTodo({ selectedTodo })
    );
  });

  it('should navigate to add form', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onAdd();
    expect(navigateSpy).toHaveBeenCalledWith(['todo/add']);
  });
});
