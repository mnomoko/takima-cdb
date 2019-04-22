import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent {

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService) {}

  public saveComputer(company: Company) {
    this.companyService.postCompany(company).subscribe(() => {
      this.gotoCompanies();
    });
  }

  private gotoCompanies() {
    const route = ['/companies'];
    this.router.navigate(route);
  }

}
