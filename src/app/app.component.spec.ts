import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from './shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {ComputersModule} from './components/computer/computers.module';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ComputersModule,
        AppRoutingModule,
        SharedModule,
      ],
      declarations: [
        AppComponent,
        routableComponents
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
