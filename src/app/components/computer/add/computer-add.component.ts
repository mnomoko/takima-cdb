import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Computer} from '../../../models/computer';
import {ComputerService} from '../../../services/computer.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import {finalize} from 'rxjs/operators';
import {Utils} from '../../../utils/utils';
import Path = Utils.Path;

@Component({
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.css']
})
export class ComputerAddComponent implements OnInit {
  path: Path = new Utils.Path();

  computer: Computer;
  companies: Company[];
  isLoading: boolean;

  constructor(public router: Router, private route: ActivatedRoute, private companyService: CompanyService, private computerService: ComputerService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies() {
    this.isLoading = true;
    this.companyService.getCompaniesWithoutPagination().subscribe((response: any) => {
      this.companies = response._embedded.companies;
      this.isLoading = false;
    }, error => console.error(error));
  }

  public saveComputer(computer: Computer) {
    this.isLoading = true;
    const validateCompany = (company) => this.companies.find(c => company && company.id && Number(company.id) === c.id);
    computer.company = validateCompany(computer.company);
    this.computerService.postComputer(computer)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(() => {
      this.gotoComputers();
    }, error => console.error(error));
  }

  private gotoComputers() {
    const route = [this.path.computers];
    this.router.navigate(route);
  }

}
