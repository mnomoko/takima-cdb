import {TestBed, async} from '@angular/core/testing';
import { ComputerCommunComponent } from './computer-commun.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Computer} from '../../../models/computer';

describe('ComputerCommunComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        ComputerCommunComponent
      ],
      providers: [ CompanyService ]
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ComputerCommunComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component in add state', async(() => {
    const fixture = TestBed.createComponent(ComputerCommunComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.title).toEqual('Ajouter un nouveau computer');
  }));
  it('should load component in edit state', async(() => {
    const data: Computer = new Computer('MacBook Pro 15.4 inch');
    const fixture = TestBed.createComponent(ComputerCommunComponent);
    const component = fixture.componentInstance;

    spyOn(component.computerForm, 'patchValue').and.callThrough();

    component.computer = data;
    component.ngOnInit();
    expect(component.title).not.toEqual('Ajouter un nouveau computer');
    expect(component.title).toEqual('MacBook Pro 15.4 inch');
    expect(component.computerForm.patchValue).toHaveBeenCalled();
  }));
});
