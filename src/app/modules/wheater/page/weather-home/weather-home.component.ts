import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';

/**
 * Componente responsável por exibir as informações climáticas de uma cidade.
 */
@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit {
  /**
   * Nome da cidade inicial a ser exibida.
   */
  initialCityName = 'Itumbiara';

  /**
   * Dados climáticos da cidade.
   */
  weatherDatas!: WeatherDatas;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  /**
   * Obtém os dados climáticos da cidade informada.
   * @param cityName Nome da cidade.
   */
  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName).subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
