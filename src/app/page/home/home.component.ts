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
  tableForm: FormGroup;
  robot: Robot;
  table: Table;
  reportList: string[] = [];
  robotPosition: string | null;
  isTableCreated:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.robotForm = this.formBuilder.group({
      placeText: ['']
    });
    this.tableForm = this.formBuilder.group({
      tableSizeText: ['']
    });
    
  }

  // place the robot
  onPlace() {

    if(!this.isTableCreated){
      this.presentToast("Create a table first");
      return;
    }
    if(!this.robot){
      this.robot = new Robot();
    }
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
        this.robotPosition = res.successMsg;
        this.robot.confirmLocation(true);
      }
    }
  }

  // create table
  onCreateTable() {
    const tableSize = this.tableForm.value.tableSizeText;
    if(tableSize && this.isValidTable(tableSize)){
      const height=parseInt(tableSize.split(',')[0], 10);
      const width=parseInt(tableSize.split(',')[1], 10);
      this.table = new Table(height, width);
      this.isTableCreated=true;
      this.robotPosition=null;
      this.robot=null;
    }
    else{
      this.presentToast("Enter valid height width");
    }
    
  }
  
  private isValidTable(text:string):boolean{
    if(text && text.split(',').length==2 && Number.isInteger(parseInt(text.split(',')[0], 10)) && Number.isInteger(parseInt(text.split(',')[1], 10))){
      return true;
    }
    return false;
  }

  // turn robot right
  onRight() {
    const res = this.robot.right();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      this.robotPosition = res.successMsg;
    }
  }

  // turn robot left
  onLeft() {
    const res = this.robot.left();
    if (res.isError) {
      // error if robot not placed
      this.presentToast(res.errorMsg);
    } else {
      this.robotPosition = res.successMsg;
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
        this.robotPosition = res.successMsg;
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
