import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Computer} from '../../../models/computer';
import {ComputerService} from '../../../services/computer.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {
  computer: Computer;
  companies: Company[];
  isLoading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService, private computerService: ComputerService) {}

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
    });
  }

  private getCompanies() {
    this.companyService.getCompaniesWithoutPagination().subscribe((response: any) => {
      this.companies = response._embedded.companies;
      this.isLoading = false;
    });
  }

  public saveComputer(computer: any) {
    const validateCompany = (company) => this.companies.find(c => company && company.id && Number(company.id) === c.id);
    // const computer: Computer = this.computerForm.value;
    computer.company = validateCompany(computer.company);
    this.computerService.putComputer(computer).subscribe(() => {
      this.gotoComputers();
    });
  }

  private gotoComputers() {
    const route = ['/computers'];
    this.router.navigate(route);
  }

}
