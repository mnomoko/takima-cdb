import {Component, OnInit} from '@angular/core';
import {Company} from '../../models/company';
import {Pager} from '../../utils/Paginable';
import {CompanyService} from '../../services/company.service';

@Component({
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  companies: Company[];
  pager: Pager;
  isLoading: boolean;

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(page?: number) {
    this.isLoading = true;
    this.companyService.getCompanies(page).subscribe((response: any) => {
      this.companies = response._embedded.companies;
      this.pager = response.page;
      this.isLoading = false;
      console.log('companies : ', this.companies);
    });
  }

  public switchPagination(e: any) {
    console.log('value : ', e);
    if (e === 'next') {
      this.getCompanies(this.pager.number + 1);
    } else if (e === 'previous') {
      this.getCompanies(this.pager.number - 1);
    } else {
      this.getCompanies(e - 1);
    }
  }
}
