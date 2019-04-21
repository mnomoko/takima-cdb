import {Component, OnInit} from '@angular/core';
import {Computer} from '../../models/computer';
import {ComputerService} from '../../services/computer.service';
import {Pager} from '../../utils/Paginable';
import {Utils} from '../../utils/utils';
import {Router} from '@angular/router';

@Component({
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  constructor(private computerService: ComputerService) {}

  computers: Computer[];
  pager: Pager;

  ngOnInit(): void {
    this.getComputers();
  }

  private getComputers() {
    this.computerService.getComputers().subscribe((response: any) => {
      this.computers = response._embedded.computers;
      this.pager = response.page;
      console.log('computers : ', this.computers);
    });
  }

  public formatDate(date) {
    return Utils.fromJsonDate(date);
  }
}
