import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Computer} from '../../../models/computer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../utils/utils';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-computer-edition-commun',
  templateUrl: './computer-commun.component.html',
  styleUrls: ['./computer-commun.component.css']
})
export class ComputerCommunComponent implements OnInit {
  @Input() computer: Computer;
  @Input() companies: Company[];
  @Output() item = new EventEmitter();
  title: string;

  computerForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    introduced: new FormControl(null),
    discontinued: new FormControl(null),
    company: new FormGroup({
      id: new FormControl(null)
    })
  });

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    if (this.computer) {
      this.setComputerForm(this.computer);
      this.title = this.computer.name;
    } else {
      this.title = 'Ajouter un nouveau computer';
    }
  }

  private setComputerForm(computer: Computer) {
    const companyId: number = (computer.company && computer.company.id) ? computer.company.id : undefined;

    this.computerForm.patchValue({
      id: computer.id,
      name: computer.name,
      introduced: Utils.fromJsonDate(computer.introduced),
      discontinued: Utils.fromJsonDate(computer.discontinued),
      company: {
        id: companyId
      }
    });
  }

  public submitComputer() {
    this.item.emit(this.computerForm.value);
  }

}
