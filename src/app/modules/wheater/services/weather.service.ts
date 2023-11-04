import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Serviço responsável por buscar informações de clima de uma cidade através da API do OpenWeatherMap.
 */
export class WeatherService {
  private apiKey = '3a663ad7cf8891e832cd45767e26615a';

  constructor(private http: HttpClient) {}

  /**
   * Busca informações de clima de uma cidade através da API do OpenWeatherMap.
   * @param cityName Nome da cidade a ser buscada.
   * @returns Um Observable com as informações de clima da cidade.
   */
  getWeatherDatas(cityName: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`
    );
  }
}
