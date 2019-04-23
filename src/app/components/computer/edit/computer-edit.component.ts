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
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {
  path: Path = new Utils.Path();
  computer: Computer;
  companies: Company[];
  isLoading: boolean;

  constructor(public router: Router, private route: ActivatedRoute, private companyService: CompanyService, private computerService: ComputerService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: number = params['id'];
      this.getComputer(id);
    });
  }

  private getComputer(id: number) {
    this.isLoading = true;
    this.computerService.getComputerById(id).subscribe((computer: Computer) => {
      this.computer = computer;
      this.getCompanies();
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.gotoComputers();
    });
  }

  private getCompanies() {
    this.companyService.getCompaniesWithoutPagination().subscribe((response: any) => {
      this.companies = response._embedded.companies;
    }, error => console.error(error), () => this.isLoading = false);
  }

  public saveComputer(computer: any) {
    this.isLoading = true;
    const validateCompany = (company) => this.companies.find(c => company && company.id && Number(company.id) === c.id);
    // const computer: Computer = this.computerForm.value;
    computer.company = validateCompany(computer.company);
    this.computerService.putComputer(computer).subscribe(() => {
      this.gotoComputers();
    }, error => console.error(error), () => this.isLoading = false);
  }

  private gotoComputers() {
    const route = [this.path.computers];
    this.router.navigate(route);
  }

}
