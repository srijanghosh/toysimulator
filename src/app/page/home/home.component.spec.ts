import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

fdescribe('HomeComponent', () => {
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
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test case 1', async () => {
    const app = fixture.debugElement.componentInstance;
    app.robotForm.controls.placeText.setValue('0,0,NORTH');
    app.onPlace();
    app.onMove();
    app.onReport();
    expect(app.reportList[app.reportList.length - 1]).toEqual('0,1,NORTH');
  });

  it('test case 2', async () => {
    const app = fixture.debugElement.componentInstance;
    app.robotForm.controls.placeText.setValue('0,0,NORTH');
    app.onPlace();
    app.onLeft();
    app.onReport();
    expect(app.reportList[app.reportList.length - 1]).toEqual('0,0,WEST');
  });

  it('test case 3', async () => {
    const app = fixture.debugElement.componentInstance;
    app.robotForm.controls.placeText.setValue('1,2,EAST');
    app.onPlace();
    app.onMove();
    app.onMove();
    app.onLeft();
    app.onMove();
    app.onReport();
    expect(app.reportList[app.reportList.length - 1]).toEqual('3,3,NORTH');
  });
});
