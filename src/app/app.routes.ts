import { Routes } from '@angular/router';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { authGuard } from './core/guards/auth.guard';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { TestErrorsComponent } from './components/errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { preventUnsavedChangesGuard } from './core/guards/preventUnsavedChanges.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
