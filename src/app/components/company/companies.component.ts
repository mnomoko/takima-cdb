import {Component, OnInit} from '@angular/core';
import {Company} from '../../models/company';
import {CompanyService} from '../../services/company.service';
import {Pager} from '../../models/pager';
import {finalize} from 'rxjs/operators';
import {Utils} from '../../utils/utils';
import Path = Utils.Path;

@Component({
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  path: Path = new Utils.Path();

  error: any;
  companies: Company[];
  pager: Pager;
  isLoading: boolean;

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(page?: number) {
    this.isLoading = true;
    this.companyService.getCompanies(page)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((response: any) => {
      this.companies = response._embedded.companies;
      this.pager = response.page;
    }, error => console.error(error));
  }

  public removeCompany(id: number) {
    this.error = undefined;
    this.isLoading = true;
    this.companyService.deleteCompany(id).subscribe(() => {
      this.companies = this.companies.filter((item: Company) => item.id !== id);
      this.isLoading = false;
    }, error => {
      this.error = error;
      this.isLoading = false;
    });
  }

  public switchPagination(e: any) {
    if (e === 'first') {
      this.getCompanies();
    } else if (e === 'last') {
      this.getCompanies(this.pager.totalPages - 1);
    } else if (e === 'next') {
      this.getCompanies(this.pager.number + 1);
    } else if (e === 'previous') {
      this.getCompanies(this.pager.number - 1);
    } else {
      this.getCompanies(e - 1);
    }
  }
}
