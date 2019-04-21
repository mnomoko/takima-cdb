import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComputerService} from './services/computer.service';
import {CompanyService} from './services/company.service';

@NgModule({
  declarations: [
    AppComponent, routableComponents, NavBarComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, AppRoutingModule
  ],
  providers: [CompanyService, ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
