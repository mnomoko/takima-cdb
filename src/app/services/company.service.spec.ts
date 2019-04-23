import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import {Company} from '../models/company';

describe('CompanyService', () => {

  const companies: Company[] = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'RCA'},
    {id: 3, name: 'Sony'},
  ];
  const API_COMPANY = 'http://localhost:8080/api/companies';
  const API_COMPANY_ID_1 = 'http://localhost:8080/api/companies/1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
  });

  it('should be initialized', inject([CompanyService], (companyService: CompanyService) => {
    expect(companyService).toBeTruthy();
  }));
  it(
    'should perform getCompanies',
    fakeAsync(
      inject(
        [CompanyService, HttpTestingController],
        (companyService: CompanyService, backend: HttpTestingController) => {

          const responseObject = { '_embedded': { companies: companies}, page: undefined, links: undefined };
          let response = null;

          companyService.getCompanies().subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: API_COMPANY});
          requestWrapper.flush(responseObject);

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );
  it(
    'should perform getCompanyById',
    fakeAsync(
      inject(
        [CompanyService, HttpTestingController],
        (companyService: CompanyService, backend: HttpTestingController) => {

          const responseObject = companies[0];
          let response = null;

          companyService.getCompanyById(1).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: API_COMPANY_ID_1});
          requestWrapper.flush(responseObject);

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );
  it(
    'should perform putCompany',
    fakeAsync(
      inject(
        [CompanyService, HttpTestingController],
        (companyService: CompanyService, backend: HttpTestingController) => {

          const responseObject = companies[0];
          let response = null;

          companyService.putCompany(companies[0]).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: API_COMPANY_ID_1});
          requestWrapper.flush(responseObject);

          expect(requestWrapper.request.method).toEqual('PUT');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );
  it(
    'should perform deleteCompany',
    fakeAsync(
      inject(
        [CompanyService, HttpTestingController],
        (companyService: CompanyService, backend: HttpTestingController) => {

          let response = null;

          companyService.deleteCompany(1).subscribe(
            () => {
              response = {};
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: API_COMPANY_ID_1});
          requestWrapper.flush({});

          expect(requestWrapper.request.method).toEqual('DELETE');
        }
      )
    )
  );
});
