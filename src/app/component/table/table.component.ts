import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() table: Table; // param to pass table object which contain height and width
  @Input() robotPosition: string | null; // direction of robot in string value ['NORTH', 'EAST', 'SOUTH', 'WEST']

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

  isThereAnyRobot(x: number, y: number, d: string): boolean{
    if (this.robotPosition){
      const position = this.robotPosition.split(',');
      const robotX = Number(position[0]);
      const robotY = Number(position[1]);
      const direction = position[2];
      if (x === robotX && y === robotY && (!d || d === direction)){
        return true;
      }
    }
    return false;
  }

}
