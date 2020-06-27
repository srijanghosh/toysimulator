// export class Table {
//   // index starting form 0 but height and width will be length of the array
//   constructor(public height: number, public width: number) {}

//   public isInsideTable(x: number, y: number) {
//     return x < this.width && x >= 0 && y < this.height && y >= 0;
//   }
// }

import { Table } from './table';

describe('Table', () => {
  it('should create table', () => {
    const table = new Table(10, 10);
    expect(table).toBeTruthy();
  });

  it('table heigth should be equal', () => {
    const table = new Table(12, 10);
    expect(table.height).toEqual(12);
  });

  it('table width should be equal', () => {
    const table = new Table(12, 10);
    expect(table.width).toEqual(10);
  });

  it('table should be invalid in negetive width', () => {
    const table = new Table(12, -10);
    expect(table.isValid).toBeFalsy();
  });

  it('table should be invalid in 0 width', () => {
    const table = new Table(12, 0);
    expect(table.isValid).toBeFalsy();
  });

  it('table should be invalid in negetive heigth', () => {
    const table = new Table(-12, 10);
    expect(table.isValid).toBeFalsy();
  });

  it('table should be invalid in 0 heigth', () => {
    const table = new Table(0, 10);
    expect(table.isValid).toBeFalsy();
  });

  it('table should be valid', () => {
    const table = new Table(12, 10);
    expect(table.isValid).toBeTruthy();
  });

  it('should be inside table', () => {
    const table = new Table(10, 10);
    expect(table.isInsideTable(5, 5)).toBeTruthy();
  });

  it('should be outside table', () => {
    const table = new Table(10, 10);
    expect(table.isInsideTable(10, 5)).toBeFalsy();
  });

});
