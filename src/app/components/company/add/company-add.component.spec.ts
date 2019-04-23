import {TestBed, async} from '@angular/core/testing';
import { CompanyAddComponent } from './company-add.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {SharedModule} from '../../../shared.module';
import {of} from 'rxjs';
import {Company} from '../../../models/company';

describe('CompanyAddComponent', () => {

  let companyService: CompanyService;
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
        CompanyAddComponent
      ],
      providers: [ CompanyService ]
    }).compileComponents();

    companyService = TestBed.get(CompanyService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CompanyAddComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component and create a new company', async(() => {
    const data: Company = new Company('Peer');
    const fixture = TestBed.createComponent(CompanyAddComponent);
    const component = fixture.componentInstance;

    spyOn(companyService, 'postCompany').and.returnValue(of({}));
    spyOn(component.router, 'navigate').and.returnValue(true);

    fixture.whenStable().then(() => {
      component.saveCompany(data);
      fixture.whenStable().then(() => {
        expect(companyService.postCompany).toHaveBeenCalled();
        expect(component.router.navigate).toHaveBeenCalledWith(['/companies']);
      });
    });
  }));
});
