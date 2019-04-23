import { NgModule } from '@angular/core';

import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {CompanyCommunComponent} from './components/company/commun/company-commun.component';
import {ComputerCommunComponent} from './components/computer/commun/computer-commun.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ErrorAlertComponent} from './components/error-alert/error-alert.component';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, ReactiveFormsModule ],
  declarations: [ NavBarComponent, PaginationComponent, ErrorAlertComponent, ComputerCommunComponent, CompanyCommunComponent ],
  exports: [ NavBarComponent, PaginationComponent, ErrorAlertComponent, ComputerCommunComponent, CompanyCommunComponent ]
})

export class SharedModule {}
