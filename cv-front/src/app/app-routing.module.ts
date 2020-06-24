import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { ShowCandidateComponent } from './components/show-candidate/show-candidate.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add_candidate', component: AddCandidateComponent },
  { path: 'candidates_list', component: CandidatesListComponent },
  { path: 'show_candidate/:id', component: ShowCandidateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
