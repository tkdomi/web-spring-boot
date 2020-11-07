import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../+model/car';
import { Color } from '../+model/color';

@Injectable({
  providedIn: 'root'
})
export class CarsRestService {

  private readonly API_URL = 'http://localhost:4200/api/v1/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.API_URL}`);
  }

  getCarsByColor(color: Color): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.API_URL}/color/${color}`);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.API_URL}/${id}`);
  }

  deleteCar(id: number): Observable<{}> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  createCar(car: Car): Observable<{}> {
    return this.http.post(`${this.API_URL}`, car);
  }

  editCar(car: Car): Observable<{}> {
    return this.http.put(`${this.API_URL}`, car);
  }
}
