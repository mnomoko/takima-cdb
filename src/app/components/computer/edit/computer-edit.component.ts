import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Computer} from '../../../models/computer';
import {ComputerService} from '../../../services/computer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../utils/utils';

@Component({
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {
  computer: Computer;
  isLoading: boolean;

  computerForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    introduced: new FormControl(null),
    discontinued: new FormControl(null),
    company: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null)
    })
  });

  constructor(private router: Router, private route: ActivatedRoute, private computerService: ComputerService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id: number = params['id'];
      this.getComputer(id);
    });
  }

  private getComputer(id: number) {
    this.computerService.getComputerById(id).subscribe((computer: Computer) => {
      this.computer = computer;
      this.setComputerForm(computer);
      this.isLoading = false;
    });
  }

  private setComputerForm(computer: Computer) {
    const companyId: number = (computer.company && computer.company.id) ? computer.company.id : undefined;
    const companyName: string = (computer.company && computer.company.name) ? computer.company.name : undefined;

    this.computerForm.patchValue({
      id: computer.id,
      name: computer.name,
      introduced: Utils.fromJsonDate(computer.introduced),
      discontinued: Utils.fromJsonDate(computer.discontinued),
      company: {
        id: companyId,
        name: companyName
      }
    });
  }

  public saveComputer() {
    const validateCompany = (company) => company.id ? company : undefined;
    const computer: Computer = this.computerForm.value;
    computer.company = validateCompany(computer.company);
    this.computerService.putComputer(computer).subscribe(() => {
      console.log('value : ', computer);
      this.gotoComputers();
    });
  }

  private gotoComputers() {
    const route = ['/computers'];
    this.router.navigate(route);
  }

}
