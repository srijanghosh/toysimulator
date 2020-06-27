import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableComponent } from './table.component';
import { Table } from 'src/app/model/table';
import { SimpleChange } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('table height should be same as params', async () => {
    const table = fixture.debugElement.componentInstance;
    table.table = new Table(5, 6);
    table.ngOnChanges({
      table: new SimpleChange(null, table.table, true)
    });
    fixture.detectChanges();

    expect(table.heightArray.length).toEqual(5);
  });

  it('table width should be same as params', async () => {
    const table = fixture.debugElement.componentInstance;
    table.table = new Table(5, 6);
    table.ngOnChanges({
      table: new SimpleChange(null, table.table, true)
    });
    fixture.detectChanges();
    expect(table.widthArray.length).toEqual(6);
  });
});
