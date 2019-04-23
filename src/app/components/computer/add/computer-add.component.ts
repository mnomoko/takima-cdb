import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Computer} from '../../../models/computer';
import {ComputerService} from '../../../services/computer.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.css']
})
export class ComputerAddComponent implements OnInit {
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
    });
  }

  public saveComputer(computer: Computer) {
    const validateCompany = (company) => this.companies.find(c => company && company.id && Number(company.id) === c.id);
    computer.company = validateCompany(computer.company);
    this.computerService.postComputer(computer).subscribe(() => {
      this.gotoComputers();
    });
  }

  private gotoComputers() {
    const route = ['/computers'];
    this.router.navigate(route);
  }

}
