import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './questions/question/question.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: './dashboard', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: QuestionComponent, canActivate: [ AuthGuardService ] },
  { path: 'admin', component: AdminComponent },
  // { path: 'heroes', component: HeroesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
