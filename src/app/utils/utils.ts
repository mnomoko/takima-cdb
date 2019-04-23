import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export namespace Utils {
  export function fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return jDate ? bDate.toISOString().substring(0, 10) : jDate;
  }


  export function handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`, error);

      if (error.status === 409) {
        return throwError(error.error.cause.message);
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  export class Path {
    companies = '/companies';
    newCompany = '/new-company';
    computers = '/computers';
    newComputer = '/new-computer';
  }
}

