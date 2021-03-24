import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListDetailComponent } from './todo-list/todo-list-detail/todo-list-detail.component';
import { TodoListDetailGuard } from './guards/todo-list-detail.guard';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    path: 'todo/:id',
    canActivate: [TodoListDetailGuard],
    component: TodoListDetailComponent,
  },
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: '**', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
