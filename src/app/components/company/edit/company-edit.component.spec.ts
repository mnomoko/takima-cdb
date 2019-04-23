import {TestBed, async} from '@angular/core/testing';
import { CompanyEditComponent } from './company-edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {SharedModule} from '../../../shared.module';
import {ComputerService} from '../../../services/computer.service';
import {Company} from '../../../models/company';
import {of} from 'rxjs';
import {Pager} from '../../../models/pager';
import {Computer} from '../../../models/computer';
import {ActivatedRoute} from '@angular/router';

describe('CompanyEditComponent', () => {

  let companyService: CompanyService;
  const company: Company = {id: 1, name: 'Peer'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        CompanyEditComponent
      ],
      providers: [ {provide: ActivatedRoute, useValue: { params: of({ id: 1 }) }}, CompanyService ]
    }).compileComponents();

    companyService = TestBed.get(CompanyService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CompanyEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component and data', async(() => {
    TestBed.get(ActivatedRoute).queryParams = of({ id: 1 });
    const fixture = TestBed.createComponent(CompanyEditComponent);
    const component = fixture.componentInstance;

    spyOn(companyService, 'getCompanyById').and.returnValue(of(company));

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.isLoading).toBeFalsy();
    });
  }));
  it('should load component and update a computer', async(() => {
    const data: Computer = new Computer('MacBook Air 13.2 inch');
    const fixture = TestBed.createComponent(CompanyEditComponent);
    const component = fixture.componentInstance;

    spyOn(companyService, 'getCompanyById').and.returnValue(of(company));
    spyOn(companyService, 'putCompany').and.returnValue(of({}));
    spyOn(component.router, 'navigate').and.returnValue(true);

    component.company = company;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.saveComputer(data);
      fixture.whenStable().then(() => {
        expect(companyService.putCompany).toHaveBeenCalled();
        expect(component.router.navigate).toHaveBeenCalledWith(['/companies']);
      });
    });
  }));
});
