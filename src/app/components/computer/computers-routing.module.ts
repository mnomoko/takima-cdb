import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ComputersComponent} from './computers.component';
import {ComputerEditComponent} from './edit/computer-edit.component';


const routes: Routes = [
  { path: '', component: ComputersComponent },
  { path: ':id', component: ComputerEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }

export const routableCumputersComponents = [
  ComputersComponent,
  ComputerEditComponent
];
