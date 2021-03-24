import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { State } from 'src/app/store/reducer';
import { selectTodo, selectTodos } from 'src/app/store/selectors';

import { TodoListDetailComponent } from './todo-list-detail.component';
import { MatIcon } from '@angular/material/icon';

describe('TodoListDetailComponent', () => {
  let component: TodoListDetailComponent;
  let fixture: ComponentFixture<TodoListDetailComponent>;
  let store: MockStore<State>;

  class mockRouter {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListDetailComponent,
        MockComponents(
          MatCardContent,
          MatIcon,
          MatDivider,
          MatCardHeader,
          MatCardActions,
          MatCardTitle,
          MatButton,
          MatCard
        ),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: number) => {
                  return 0;
                },
              },
            },
          },
        },
        { provide: Router, useClass: mockRouter },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListDetailComponent);
    component = fixture.componentInstance;
    store.overrideSelector(selectTodos, [
      {
        id: 0,
        title: 'todo 1',
        isClosed: true,
        description: "C'est le printemps !",
      },
      { id: 1, title: 'todo 2', isClosed: true },
    ]);

    store.overrideSelector(selectTodo, {
      id: 0,
      title: 'todo 1',
      isClosed: true,
      description: "C'est le printemps !",
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a todo description', () => {
    expect(
      fixture.debugElement.query(By.css('mat-card-content')).nativeElement
        .innerText
    ).toEqual("C'est le printemps !");
  });

  it('should display a completed icon when todo is closed', () => {
    expect(
      fixture.debugElement.query(By.css('#header-check-icon'))
    ).toBeTruthy();
  });

  it('should navigate to back', () => {
    spyOn(component, 'onBack');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', {});
    expect(component.onBack).toHaveBeenCalled();
  });
});
