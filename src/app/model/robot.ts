import { RobotResponse } from './common';

export class Robot {
  // Robot class is to create a robot which can be turn left or right and move forward
  private isPlaced = false;
  private nextLocation: number[] = [-1, -1]; // to valid next location
  private currentLocation: number[]  = [-1, -1]; // table index starting from south west
  private directionText: string[]  = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  private direction = 0; // 0-N 1-E 2-S 3-W

  constructor() {}

  // this method unplce a robot if its placed in wrong position
  unPlace() {
    this.isPlaced = false;
    this.nextLocation = [-1, -1];
    this.currentLocation = [-1, -1];
  }

  // this method plce a robot
  public place(placeText: string): RobotResponse {
    if (!!placeText && placeText.split(',').length === 3) {
      const placeArr: any = placeText.split(',');
      placeArr.map((el: any) => {
        return el.trim();
      });
      if (
        Number.isInteger(parseInt(placeArr[0], 10)) &&
        Number.isInteger(parseInt(placeArr[1], 10)) &&
        this.directionText.indexOf(placeArr[2].toUpperCase()) >= 0
      ) {
        this.nextLocation = [parseInt(placeArr[0], 10), parseInt(placeArr[1], 10)];
        this.direction = this.directionText.indexOf(placeArr[2].toUpperCase());
        return new RobotResponse(
          true,
          this.nextLocation.join(',') +
            ',' +
            this.directionText[this.direction]
        );
      }
    }
    return new RobotResponse(false, 'Invalid format');
  }

  // this method is to turn the robot direction rigth
  public right(): RobotResponse {
    if (this.isPlaced) {
      this.direction++;
      this.direction = this.direction % 4;
      return new RobotResponse(
        true,
        this.currentLocation.join(',') +
          ',' +
          this.directionText[this.direction]
      );
    } else {
      return new RobotResponse(false, 'Robot not Placed');
    }
  }

  // this method is to turn the robot direction left
  public left(): RobotResponse {
    if (this.isPlaced) {
      this.direction--;
      this.direction < 0 ? (this.direction = 4 + this.direction) : null;
      return new RobotResponse(
        true,
        this.currentLocation.join(',') +
          ',' +
          this.directionText[this.direction]
      );
    } else {
      return new RobotResponse(false, 'Robot not Placed');
    }
  }

  // this method return the next location if robot moves forward
  public move(): RobotResponse {
    if (!this.isPlaced) {
      return new RobotResponse(false, 'Robot not Placed');
    } else {
      switch (this.direction) {
        case 0: // moving north
          this.nextLocation[1]++;
          break;
        case 1: // moving east
          this.nextLocation[0]++;
          break;
        case 2: // moving south
          this.nextLocation[1]--;
          break;
        case 3: // moving west
          this.nextLocation[0]--;
          break;
      }
      return new RobotResponse(
        true,
        this.nextLocation.join(',') + ',' + this.directionText[this.direction]
      );
    }
  }

  // this method return robots current position
  public report(): RobotResponse {
    if (!this.isPlaced) {
      return new RobotResponse(false, 'Robot not Placed');
    } else {
      return new RobotResponse(
        true,
        this.currentLocation.join(',') +
          ',' +
          this.directionText[this.direction]
      );
    }
  }

  confirmLocation(isValidLocation: boolean): RobotResponse{
    if (isValidLocation){
      this.isPlaced = true;
      this.currentLocation = [...this.nextLocation];
    }else if (!this.isPlaced) {
      this.unPlace();
    }else{
      this.nextLocation = [...this.currentLocation];
    }

    return this.report();
  }

}
