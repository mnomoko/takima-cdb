import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found.component';
import {CompaniesComponent} from './components/company/companies.component';
import {ComputerAddComponent} from './components/computer/add/computer-add.component';
import {CompanyEditComponent} from './components/company/edit/company-edit.component';
import {CompanyAddComponent} from './components/company/add/company-add.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'companies' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/:id', component: CompanyEditComponent },
  { path: 'new-company', component: CompanyAddComponent },
  { path: 'computers', loadChildren: './components/computer/computers.module#ComputersModule' },
  { path: 'new-computer', component: ComputerAddComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routableComponents = [
  CompaniesComponent,
  CompanyAddComponent,
  CompanyEditComponent,
  ComputerAddComponent,
  PageNotFoundComponent
];
