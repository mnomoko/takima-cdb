import {TestBed, async} from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Pager} from '../../models/pager';

describe('PaginationComponent', () => {

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
        PaginationComponent
      ]
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should load component and check current value', async(() => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    const pager: Pager = new Pager(5, 2, 1, 0);
    component.pager = pager;
    component.ngOnInit();
    expect(component.current).toBe(1);
    expect(component.pagination.length).toBe(1);
  }));
});
