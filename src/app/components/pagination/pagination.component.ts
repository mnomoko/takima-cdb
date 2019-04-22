import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pager} from '../../utils/Paginable';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pager: Pager;
  @Output() clickPagination = new EventEmitter();
  pagination: number[];

  ngOnInit(): void {
    this.pagination = this.getPaginationIndexes(this.pager);
  }

  public getPaginationIndexes(pager: Pager): number[] {
    const pagination = { range: 7, pages: pager.totalPages };
    return this.doPaging(pager.number, pagination);
  }

  private doPaging(current, {range, pages, start = 0}) {
    const paging: number[] = [];
    const starter = (pages + start - range > 0) ? pages + start - range : 0;
    let i = Math.min(starter, Math.max(start, current - (range / 2 | 0)));
    const end = (i + range > pages) ? pages : i + range;
    while (i < end) {
      i = i + 1;
      paging.push(i);
    }
    return paging;
  }

  public switchPagination(val) {
    this.clickPagination.emit(val);
  }

}
