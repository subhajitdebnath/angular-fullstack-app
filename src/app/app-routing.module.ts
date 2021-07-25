import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { TextBoxComponent } from './text-box/text-box.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'about/:id', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'all-users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostDetailsComponent, canActivate: [AuthGuard]},
  {path: 'texts/:toUserId', component: TextBoxComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
