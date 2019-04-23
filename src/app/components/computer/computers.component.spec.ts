import {TestBed, async} from '@angular/core/testing';
import { ComputersComponent } from './computers.component';
import {SharedModule} from '../../shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ComputersModule} from './computers.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule, routableComponents} from '../../app-routing.module';
import {ComputerService} from '../../services/computer.service';
import {HttpClientModule} from '@angular/common/http';
import {Computer} from '../../models/computer';
import {of} from 'rxjs';
import {Pager} from '../../models/pager';

describe('ComputersComponent', () => {

  let computerService: ComputerService;
  const computers: Computer[] = [
    {id: 1, name: 'MacBook Pro 15.4 inch', introduced: undefined, discontinued: undefined, company: undefined},
    {id: 2, name: 'MacBook Pro 13.2 inch', introduced: undefined, discontinued: undefined, company: undefined}
  ];
  const page: Pager = new Pager(5, 2, 1, 0);
  const response = { _embedded: { computers: computers }, page: page };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        ComputersModule,
        AppRoutingModule,
        SharedModule,
      ],
      declarations: [
        routableComponents
      ],
      providers: [ComputerService]
    }).compileComponents();

    computerService = TestBed.get(ComputerService);
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ComputersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load ComputersComponent and call getComputers()', async(() => {
    spyOn(computerService, 'getComputers').and.returnValue(of(response));
    const fixture = TestBed.createComponent(ComputersComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.computers.length).toBe(2);
  }));
  it('should delete computer by calling deleteComputer()', async(() => {
    spyOn(computerService, 'getComputers').and.returnValue(of(response));
    spyOn(computerService, 'deleteComputer').and.returnValue(of({}));
    const fixture = TestBed.createComponent(ComputersComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.removeComputer(1);
      expect(component.computers.length).toBe(1);
    });
  }));
});
