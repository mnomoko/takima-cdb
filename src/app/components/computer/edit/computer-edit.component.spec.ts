import {TestBed, async} from '@angular/core/testing';
import { ComputerEditComponent } from './computer-edit.component';
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

describe('ComputerEditComponent', () => {

  let companyService: CompanyService;
  let computerService: ComputerService;
  const companies: Company[] = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'RCA'},
    {id: 3, name: 'Sony'},
  ];
  const page: Pager = new Pager(5, 2, 1, 0);
  const response = { _embedded: { companies: companies }, page: page };
  const computer: Computer = {id: 1, name: 'Macbook Pro 15.4 inch', introduced: undefined, discontinued: undefined, company: companies[0]};

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
        ComputerEditComponent
      ],
      providers: [ {provide: ActivatedRoute, useValue: { params: of({ id: 1 }) }}, CompanyService, ComputerService ]
    }).compileComponents();

    companyService = TestBed.get(CompanyService);
    computerService = TestBed.get(ComputerService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ComputerEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component and data', async(() => {
    TestBed.get(ActivatedRoute).queryParams = of({ id: 1 });
    const fixture = TestBed.createComponent(ComputerEditComponent);
    const component = fixture.componentInstance;

    spyOn(computerService, 'getComputerById').and.returnValue(of(computer));
    spyOn(companyService, 'getCompaniesWithoutPagination').and.returnValue(of(response));

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.isLoading).toBeFalsy();
      expect(component.companies.length).toBe(3);
    });
  }));
  it('should load component and update a computer', async(() => {
    const data: Computer = new Computer('MacBook Air 13.2 inch');
    const fixture = TestBed.createComponent(ComputerEditComponent);
    const component = fixture.componentInstance;

    spyOn(computerService, 'getComputerById').and.returnValue(of(computer));
    spyOn(companyService, 'getCompaniesWithoutPagination').and.returnValue(of(response));
    spyOn(computerService, 'putComputer').and.returnValue(of({}));
    spyOn(component.router, 'navigate').and.returnValue(true);

    component.computer = computer;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.saveComputer(data);
      fixture.whenStable().then(() => {
        expect(computerService.putComputer).toHaveBeenCalled();
        expect(component.router.navigate).toHaveBeenCalledWith(['/computers']);
      });
    });
  }));
});
