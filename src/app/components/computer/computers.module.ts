import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComputersRoutingModule, routableCumputersComponents} from './computers-routing.module';
import {SharedModule} from '../../shared.module';
import {ComputerService} from '../../services/computer.service';
import {CompanyService} from '../../services/company.service';

@NgModule({
  imports: [
    CommonModule,
    ComputersRoutingModule,
    SharedModule
  ],
  declarations: [routableCumputersComponents],
  providers: [CompanyService, ComputerService]
})
export class ComputersModule { }
