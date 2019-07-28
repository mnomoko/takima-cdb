import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../models/company';
import {catchError} from 'rxjs/operators';
import {Utils} from '../utils/utils';
import {environment} from '../../environments/environment';


@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  public getCompanies(page?: number): Observable<Company[]> {
    const url = page ? `${API_COMPANY}?page=${page}` : API_COMPANY;
    return this.http
      .get<Company[]>(url).pipe(catchError(Utils.handleError));
  }

  public getCompaniesWithoutPagination(): Observable<Company[]> {
    const url = `${API_COMPANY}?size=1000000000`;
    return this.http
      .get<Company[]>(url).pipe(catchError(Utils.handleError));
  }

  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${API_COMPANY}/${id}`).pipe(catchError(Utils.handleError));
  }

  public postCompany(company: Company) {
    return this.http.post(API_COMPANY, company).pipe(catchError(Utils.handleError));
  }

  public putCompany(company: Company) {
    return this.http.put(`${API_COMPANY}/${company.id}`, company).pipe(catchError(Utils.handleError));
  }

  public deleteCompany(id: number) {
    return this.http.delete(`${API_COMPANY}/${id}`).pipe(catchError(Utils.handleError));
  }
}

// const API_COMPANY = 'http://localhost:8080/api/companies';
const API_COMPANY = `${environment.apiUrl}/companies`;
