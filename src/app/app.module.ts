import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComputerService} from './services/computer.service';
import {CompanyService} from './services/company.service';
import {SharedModule} from './shared.module';
import {ComputersModule} from './components/computer/computers.module';

@NgModule({
  declarations: [
    AppComponent, routableComponents
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, SharedModule, AppRoutingModule
  ],
  providers: [CompanyService, ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
