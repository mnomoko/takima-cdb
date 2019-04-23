import {TestBed, async} from '@angular/core/testing';
import { CompanyCommunComponent } from './company-commun.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

describe('CompanyCommunComponent', () => {

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
        CompanyCommunComponent
      ],
      providers: [ CompanyService ]
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CompanyCommunComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component in add state', async(() => {
    const fixture = TestBed.createComponent(CompanyCommunComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.title).toEqual('Ajouter un nouveau company');
  }));
  it('should load component in edit state', async(() => {
    const data: Company = new Company('Peer');
    const fixture = TestBed.createComponent(CompanyCommunComponent);
    const component = fixture.componentInstance;

    spyOn(component.companyForm, 'patchValue').and.callThrough();

    component.company = data;
    component.ngOnInit();
    expect(component.title).not.toEqual('Ajouter un nouveau company');
    expect(component.title).toEqual('Peer');
    expect(component.companyForm.patchValue).toHaveBeenCalled();
  }));
});
