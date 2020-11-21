import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../+model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherRestService {

  private readonly API_URL = 'http://localhost:4200/api/v1/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.API_URL}`, {params: {city}});
  }
}
