import {Component, OnInit} from '@angular/core';
import {Computer} from '../../models/computer';
import {ComputerService} from '../../services/computer.service';
import {Utils} from '../../utils/utils';
import {Pager} from '../../models/pager';
import {finalize} from 'rxjs/operators';
import Path = Utils.Path;

@Component({
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  constructor(private computerService: ComputerService) {}

  path: Path = new Utils.Path();

  computers: Computer[];
  pager: Pager;
  isLoading: boolean;

  ngOnInit(): void {
    this.getComputers();
  }

  private getComputers(page?: number) {
    this.isLoading = true;
    this.computerService.getComputers(page)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((response: any) => {
      this.computers = response._embedded.computers;
      this.pager = response.page;
    }, error => console.error(error));
  }

  public formatDate(date) {
    return Utils.fromJsonDate(date);
  }

  public switchPagination(e: any) {
    if (e === 'first') {
      this.getComputers();
    } else if (e === 'last') {
      this.getComputers(this.pager.totalPages - 1);
    } else if (e === 'next') {
      this.getComputers(this.pager.number + 1);
    } else if (e === 'previous') {
      this.getComputers(this.pager.number - 1);
    } else {
      this.getComputers(e - 1);
    }
  }

  public removeComputer(id: number) {
    this.isLoading = true;
    this.computerService.deleteComputer(id).subscribe(() => {
      this.computers = this.computers.filter((item: Computer) => item.id !== id);
    }, error => console.error(error), () => this.isLoading = false);
  }
}
