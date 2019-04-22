import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Computer} from '../models/computer';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Utils} from '../utils/utils';

@Injectable()
export class ComputerService {
  constructor(private http: HttpClient) {}

  public getComputers(page?: number): Observable<Computer[]> {
    const url = page ? `${API_COMPUTERS}?page=${page}` : API_COMPUTERS;
    return this.http
      .get<Computer[]>(url);
  }

  public getComputerById(id: number): Observable<Computer> {
    return this.http.get<Computer>(`${API_COMPUTERS}/${id}`);
  }

  public postComputer(computer: Computer) {
    return this.http.post(API_COMPUTERS, computer).pipe(catchError(Utils.handleError));
  }

  public putComputer(computer: Computer) {
    return this.http.put(`${API_COMPUTERS}/${computer.id}`, computer).pipe(catchError(Utils.handleError));
  }

  public deleteComputer(id: number) {
    return this.http.delete(`${API_COMPUTERS}/${id}`).pipe(catchError(Utils.handleError));
  }

}

const API_COMPUTERS  = 'http://localhost:8080/api/computers';
