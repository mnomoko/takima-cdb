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

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies() {
    this.companyService.getCompanies().subscribe((response: any) => {
      this.companies = response._embedded.companies;
      this.pager = response.page;
      console.log('companies : ', this.companies);
    });
  }
}
