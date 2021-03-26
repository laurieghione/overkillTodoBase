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
import { State } from '@store/reducer';
import { selectTodo, selectTodos } from '@store/selectors';

import { TodoDetailComponent } from './todo-detail.component';
import { MatIcon } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: MockStore<State>;
  let router: Router;
  let mockedselectedTodo: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoDetailComponent,
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
        provideMockStore(),
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TodoDetailComponent);
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

    mockedselectedTodo = store.overrideSelector(selectTodo, {
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

  it('should navigate to home when todo is not find', () => {
    spyOn(component, 'goToHome');
    mockedselectedTodo.setResult(null);

    store.refreshState();
    fixture.detectChanges();
    expect(component.goToHome).toHaveBeenCalled();
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

  it('should call goToHome when click on button', () => {
    spyOn(component, 'goToHome');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', {});
    expect(component.goToHome).toHaveBeenCalled();
  });

  it('should navigate to home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
