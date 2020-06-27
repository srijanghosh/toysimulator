import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() table: Table; // param to pass table object which contain height and width
  @Input() robotX: number | null; // x co-ordinate position of robot origin south west
  @Input() robotY: number | null; // x co-ordinate position of robot origin south west
  @Input() direction: string | null; // direction of robot in string value ['NORTH', 'EAST', 'SOUTH', 'WEST']

  widthArray: number[] = [];
  heightArray: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.table &&
      changes.table &&
      changes.table.currentValue !== changes.table.previousValue
    ) {
      this.heightArray = [];
      this.widthArray = [];
      for (let i = this.table.height - 1; i >= 0; i--) {
        this.heightArray.push(i);
      }
      for (let i = 0; i < this.table.width; i++) {
        this.widthArray.push(i);
      }
    }
  }

}
