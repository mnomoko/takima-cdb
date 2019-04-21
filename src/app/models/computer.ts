import {Company} from './company';

export class Computer {
  id: number;
  name: string;
  introduced: Date;
  discontinued: Date;
  company: Company;

  constructor(name: string, introduced?: Date, discontinued?: Date, company?: Company) {
    this.name = name;
    this.introduced = introduced;
    this.discontinued = discontinued;
    this.company = company;
  }
}
