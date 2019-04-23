import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ComputerService } from './computer.service';
import {Computer} from '../models/computer';

describe('ComputerService', () => {

  const computers: Computer[] = [
    {id: 1, name: 'MacBook Pro 15.4 inch', introduced: undefined, discontinued: undefined, company: undefined},
    {id: 2, name: 'MacBook Pro 13.2 inch', introduced: undefined, discontinued: undefined, company: undefined}
  ];
  const API_COMPANY = 'http://localhost:8080/api/computers';
  const API_COMPANY_ID_1 = 'http://localhost:8080/api/computers/1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComputerService]
    });
  });

  it('should be initialized', inject([ComputerService], (computerService: ComputerService) => {
    expect(computerService).toBeTruthy();
  }));
  it(
    'should perform getComputers',
    fakeAsync(
      inject(
        [ComputerService, HttpTestingController],
        (computerService: ComputerService, backend: HttpTestingController) => {

          const responseObject = { '_embedded': { computers: computers}, page: undefined, links: undefined };
          let response = null;

          computerService.getComputers().subscribe(
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
    'should perform getComputerById',
    fakeAsync(
      inject(
        [ComputerService, HttpTestingController],
        (computerService: ComputerService, backend: HttpTestingController) => {

          const responseObject = computers[0];
          let response = null;

          computerService.getComputerById(1).subscribe(
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
    'should perform putComputer',
    fakeAsync(
      inject(
        [ComputerService, HttpTestingController],
        (computerService: ComputerService, backend: HttpTestingController) => {

          const responseObject = computers[0];
          let response = null;

          computerService.putComputer(computers[0]).subscribe(
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
    'should perform deleteComputer',
    fakeAsync(
      inject(
        [ComputerService, HttpTestingController],
        (computerService: ComputerService, backend: HttpTestingController) => {

          let response = null;

          computerService.deleteComputer(1).subscribe(
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
