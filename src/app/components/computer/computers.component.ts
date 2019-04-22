import {Component, OnInit} from '@angular/core';
import {Computer} from '../../models/computer';
import {ComputerService} from '../../services/computer.service';
import {Pager} from '../../utils/Paginable';
import {Utils} from '../../utils/utils';
import {Company} from '../../models/company';

@Component({
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  constructor(private computerService: ComputerService) {}

  computers: Computer[];
  pager: Pager;
  isLoading: boolean;

  ngOnInit(): void {
    this.getComputers();
  }

  private getComputers(page?: number) {
    this.isLoading = true;
    this.computerService.getComputers(page).subscribe((response: any) => {
      this.computers = response._embedded.computers;
      this.pager = response.page;
      this.isLoading = false;
      console.log('computers : ', this.computers);
    });
  }

  public formatDate(date) {
    return Utils.fromJsonDate(date);
  }

  public switchPagination(e: any) {
    console.log('value : ', e);
    if (e === 'next') {
      this.getComputers(this.pager.number + 1);
    } else if (e === 'previous') {
      this.getComputers(this.pager.number - 1);
    } else {
      this.getComputers(e - 1);
    }
  }
}
