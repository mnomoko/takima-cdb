import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  isLoading: boolean;

  constructor(public router: Router, private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id: number = params['id'];
      this.getCompany(id);
    });
  }

  private getCompany(id: number) {
    this.companyService.getCompanyById(id).subscribe((company: Company) => {
      this.company = company;
      this.isLoading = false;
    });
  }

  public saveComputer(company: Company) {
    this.companyService.putCompany(company).subscribe(() => {
      this.gotoCompanies();
    });
  }

  private gotoCompanies() {
    const route = ['/companies'];
    this.router.navigate(route);
  }

}
