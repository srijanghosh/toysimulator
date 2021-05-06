import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Robot } from 'src/app/model/robot';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  robotForm: FormGroup;
  robot: Robot;
  table: Table;
  isPlaced = false;
  direction: string | null;
  reportList: string[] = [];
  robotX: number | null;
  robotY: number | null;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.robotForm = this.formBuilder.group({
      placeText: ['']
    });
    this.robot = new Robot();
    this.table = new Table(5, 5);
  }

  // place the robot
  onPlace() {
    const placeText = this.robotForm.value.placeText;
    const res = this.robot.place(placeText);
    if (res.isError) {
      // text format error
      this.presentToast(res.errorMsg);
    } else {
      // if success
      const position = res.successMsg.split(',');
      if (!this.table.isInsideTable(Number(position[0]), Number(position[1]))) {
        // checking if robot position outside of table
        this.presentToast('Position is outside of table');
        this.robot.confirmLocation(false);
      } else {
        this.robotX = Number(position[0]);
        this.robotY = Number(position[1]);
        this.direction = position[2];
        this.robot.confirmLocation(true);
      }
    }
  }

  // turn robot right
  onRight() {
    const res = this.robot.right();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      const position = res.successMsg.split(',');
      this.robotX = Number(position[0]);
      this.robotY = Number(position[1]);
      this.direction = position[2];
    }
  }

  // turn robot left
  onLeft() {
    const res = this.robot.left();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      const position = res.successMsg.split(',');
      this.robotX = Number(position[0]);
      this.robotY = Number(position[1]);
      this.direction = position[2];
    }
  }

  // move the robot
  onMove() {
    const res = this.robot.move();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      const position = res.successMsg.split(',');
      if (!this.table.isInsideTable(Number(position[0]), Number(position[1]))) {
        // checking if robot position outside of table
        this.presentToast('Position is outside of table');
        this.robot.confirmLocation(false);
      } else {
        this.robotX = Number(position[0]);
        this.robotY = Number(position[1]);
        this.direction = position[2];
        this.robot.confirmLocation(true);
      }
    }
  }

  // show robot position on UI
  onReport() {
    const res = this.robot.report();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      this.reportList.unshift(res.successMsg);
    }
  }

  // show common alert in UI
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message,
      duration: 2000
    });
    toast.present();
  }
}
