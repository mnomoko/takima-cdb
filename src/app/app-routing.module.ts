import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found.component';
import {CompaniesComponent} from './components/company/companies.component';
import {ComputersComponent} from './components/computer/computers.component';
import {ComputerEditComponent} from './components/computer/edit/computer-edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'companies' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'computers', component: ComputersComponent },
  { path: 'computers/:id', component: ComputerEditComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routableComponents = [
  CompaniesComponent,
  ComputersComponent,
  ComputerEditComponent,
  PageNotFoundComponent
];
