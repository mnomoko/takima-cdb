
export class Pager {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;

  constructor(size: number, totalElements: number, totalPages: number, number: number) {
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.number = number;
  }
}
