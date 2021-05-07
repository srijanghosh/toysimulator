import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const home = fixture.debugElement.componentInstance;
    home.tableForm.controls.tableSizeText.setValue('5,5');
    home.onCreateTable();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test case set 1', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,NORTH');
    home.onPlace();
    home.onMove();
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('0,1,NORTH');
  });

  it('test case set 2', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,NORTH');
    home.onPlace();
    home.onLeft();
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('0,0,WEST');
  });

  it('test case set 3', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('1,2,EAST');
    home.onPlace();
    home.onMove();
    home.onMove();
    home.onLeft();
    home.onMove();
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('3,3,NORTH');
  });

  it('robot should not fall east side', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,EAST');
    home.onPlace();
    const tableWidth = home.table.width;
    for (let i = 0; i <= tableWidth * 2; i++){
      home.onMove();
    }
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual((tableWidth - 1) + ',0,EAST');
  });

  it('robot should not fall north side', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,NORTH');
    home.onPlace();
    const tableheight = home.table.height;
    for (let i = 0; i <= tableheight * 2; i++){
      home.onMove();
    }
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('0,' + (tableheight - 1) + ',NORTH');
  });

  it('robot should not fall west side', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,WEST');
    home.onPlace();
    const tableWidth = home.table.width;
    for (let i = 0; i <= tableWidth * 2; i++){
      home.onMove();
    }
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('0,0,WEST');
  });

  it('robot should not fall south', async () => {
    const home = fixture.debugElement.componentInstance;
    home.robotForm.controls.placeText.setValue('0,0,SOUTH');
    home.onPlace();
    const tableheight = home.table.height;
    for (let i = 0; i <= tableheight * 2; i++){
      home.onMove();
    }
    home.onReport();
    expect(home.reportList[home.reportList.length - 1]).toEqual('0,0,SOUTH');
  });


});
