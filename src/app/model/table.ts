export class Table {
  // table class is to create a table where robot can be placed and index starting form 0 but height and width will be length of the array
  public isValid = false;
  constructor(public height: number, public width: number) {
    if (height > 0 && width > 0 && Number.isInteger(height) && Number.isInteger(width)){
      this.isValid = true;
    }
  }

  // this function is to check whether a point is outside of the table or not
  public isInsideTable(x: number, y: number) {
    return x < this.width && x >= 0 && y < this.height && y >= 0;
  }
}
