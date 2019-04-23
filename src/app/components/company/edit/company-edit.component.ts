import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import {finalize} from 'rxjs/operators';
import {Utils} from '../../../utils/utils';
import Path = Utils.Path;

@Component({
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  path: Path = new Utils.Path();

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
    }, error => {
      console.error(error);
      this.gotoCompanies();
    }, () => this.isLoading = false);
  }

  public saveComputer(company: Company) {
    this.companyService.putCompany(company).subscribe(() => {
      this.gotoCompanies();
    }, error => console.error(error), () => this.isLoading = false);
  }

  private gotoCompanies() {
    const route = [this.path.companies];
    this.router.navigate(route);
  }

}
