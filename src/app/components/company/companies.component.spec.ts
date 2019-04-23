import {TestBed, async} from '@angular/core/testing';
import { CompaniesComponent } from './companies.component';
import {SharedModule} from '../../shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule, routableComponents} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {Pager} from '../../models/pager';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company';

describe('CompaniesComponent', () => {

  let companyService: CompanyService;
  const companies: Company[] = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'RCA'},
    {id: 3, name: 'Sony'},
  ];
  const page: Pager = new Pager(5, 2, 1, 0);
  const response = { _embedded: { companies: companies }, page: page };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        AppRoutingModule,
        SharedModule,
      ],
      declarations: [
        routableComponents
      ],
      providers: [CompanyService]
    }).compileComponents();

    companyService = TestBed.get(CompanyService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CompaniesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load CompaniesComponent and call getCompanies()', async(() => {
    spyOn(companyService, 'getCompanies').and.returnValue(of(response));
    const fixture = TestBed.createComponent(CompaniesComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.companies.length).toBe(3);
  }));
  it('should delete company by calling deleteCompany()', async(() => {
    spyOn(companyService, 'getCompanies').and.returnValue(of(response));
    spyOn(companyService, 'deleteCompany').and.returnValue(of({}));
    const fixture = TestBed.createComponent(CompaniesComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.removeCompany(1);
      expect(component.companies.length).toBe(2);
    });
  }));
});
