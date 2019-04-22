import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-company-edition-commun',
  templateUrl: './company-commun.component.html',
  styleUrls: ['./company-commun.component.css']
})
export class CompanyCommunComponent implements OnInit {
  @Input() company: Company;
  @Output() item = new EventEmitter();
  isLoading: boolean;
  title: string;

  companyForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.company) {
      this.setCompanyForm(this.company);
      this.title = this.company.name;
    } else {
      this.title = 'Ajouter un nouveau company';
    }
  }

  private setCompanyForm(company: Company) {
    this.companyForm.patchValue({
      id: company.id,
      name: company.name
    });
  }

  public submitCompany() {
    this.item.emit(this.companyForm.value);
  }

}
