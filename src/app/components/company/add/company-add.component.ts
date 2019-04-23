import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import {finalize} from 'rxjs/operators';
import {Utils} from '../../../utils/utils';
import Path = Utils.Path;

@Component({
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent {

  isLoading: boolean;
  constructor(public router: Router, private route: ActivatedRoute, private companyService: CompanyService) {}

  path: Path = new Utils.Path();

  public saveCompany(company: Company) {
    this.isLoading = true;
    this.companyService.postCompany(company).subscribe(() => {
      this.gotoCompanies();
    }, error => console.error(error), () => this.isLoading = false);
  }

  private gotoCompanies() {
    const route = [this.path.companies];
    this.router.navigate(route);
  }

}
