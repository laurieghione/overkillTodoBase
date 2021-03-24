import { TestBed } from '@angular/core/testing';
import { Router, UrlSegment } from '@angular/router';

import { TodoListDetailGuard } from './todo-list-detail.guard';

describe('TodoListDetailGuard', () => {
  let guard: TodoListDetailGuard;

  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    guard = TestBed.inject(TodoListDetailGuard);
  });

  let routeStateMock: any = {};

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect', () => {
    let url: UrlSegment = new UrlSegment('todo', {});
    let parameter: UrlSegment = new UrlSegment('gg', {});
    let routeMock: any = { url: [url, parameter] };
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('should authorize access', () => {
    let url: UrlSegment = new UrlSegment('todo', {});
    let parameter: UrlSegment = new UrlSegment('1', {});
    let routeMock: any = { url: [url, parameter] };
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
