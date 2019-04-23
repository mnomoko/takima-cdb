import {TestBed, async} from '@angular/core/testing';
import { ComputerAddComponent } from './computer-add.component';
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

describe('ComputerAddComponent', () => {

  let companyService: CompanyService;
  let computerService: ComputerService;
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
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        ComputerAddComponent
      ],
      providers: [ CompanyService, ComputerService ]
    }).compileComponents();

    companyService = TestBed.get(CompanyService);
    computerService = TestBed.get(ComputerService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ComputerAddComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component and data', async(() => {
    const fixture = TestBed.createComponent(ComputerAddComponent);
    const component = fixture.componentInstance;

    spyOn(companyService, 'getCompaniesWithoutPagination').and.returnValue(of(response));

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.isLoading).toBeFalsy();
      expect(component.companies.length).toBe(3);
    });
  }));
  it('should load component and create a new computer', async(() => {
    const data: Computer = new Computer('MacBook Air 13.2 inch');
    const fixture = TestBed.createComponent(ComputerAddComponent);
    const component = fixture.componentInstance;

    spyOn(companyService, 'getCompaniesWithoutPagination').and.returnValue(of(response));
    spyOn(computerService, 'postComputer').and.returnValue(of({}));
    spyOn(component.router, 'navigate').and.returnValue(true);

    component.computer = data;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.saveComputer(data);
      fixture.whenStable().then(() => {
        expect(computerService.postComputer).toHaveBeenCalled();
        expect(component.router.navigate).toHaveBeenCalledWith(['/computers']);
      });
    });
  }));
});
