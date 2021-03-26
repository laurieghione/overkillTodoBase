import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoDetailGuard } from './guards/todo-detail.guard';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

const routes: Routes = [
  {
    path: 'todo/add',
    component: TodoFormComponent,
  },
  {
    path: 'todo/:id',
    canActivate: [TodoDetailGuard],
    component: TodoDetailComponent,
  },

  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: '**', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
