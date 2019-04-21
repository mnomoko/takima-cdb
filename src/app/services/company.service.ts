import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Company} from '../models/company';
import {catchError} from 'rxjs/operators';
import {Utils} from '../utils/utils';


@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  public getCompanies(): Observable<Company[]> {
    return this.http
      .get<Company[]>(API_COMPANY);
  }

  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${API_COMPANY}/${id}`);
  }

  public postCompany(company: Company) {
    return this.http.post(API_COMPANY, company).pipe(catchError(Utils.handleError));
  }

  public putCompany(company: Company) {
    return this.http.put(API_COMPANY, company).pipe(catchError(Utils.handleError));
  }

  public deleteCompany(id: number) {
    return this.http.delete(`${API_COMPANY}/${id}`).pipe(catchError(Utils.handleError));
  }
}

const API_COMPANY = 'http://localhost:8080/api/companies';
