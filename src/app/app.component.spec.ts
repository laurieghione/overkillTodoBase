import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '@store/reducer';
import { selectTodos } from '@store/selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<State>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MatIcon, MatToolbar],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
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
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).not.toBeNull();
  });

  it('should render title', () => {
    expect(
      fixture.debugElement.query(By.css('mat-toolbar a')).nativeElement
        .innerText
    ).toContain('Overkill Todo App');
  });
});
