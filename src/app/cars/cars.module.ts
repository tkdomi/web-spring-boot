import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars.component';
import { CarsTableComponent } from './cars-table/cars-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarFormModule } from './+shared/car-form/car-form.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { CarCreateComponent } from './car-create/car-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarEditComponent } from './car-edit/car-edit.component';


@NgModule({
  declarations: [
    CarsComponent,
    CarsTableComponent,
    CarCreateComponent,
    CarEditComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CarFormModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    CarsComponent
  ]
})
export class CarsModule { }
