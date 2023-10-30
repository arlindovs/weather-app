import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente responsável por exibir as informações climáticas de uma cidade.
 */
@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  /**
   * Utiliza o Subject `destroy$` para gerenciar a destruição do componente. Evitar Memory Leaks.
   */
  private readonly destroy$: Subject<void> = new Subject<void>();
  /**
   * Nome da cidade inicial a ser exibida.
   */
  initialCityName = 'Itumbiara';

  /**
   * Dados climáticos da cidade.
   */
  weatherDatas!: WeatherDatas;

  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }


  /**
   * Obtém os dados do clima para uma cidade específica.
   * @param cityName O nome da cidade para a qual se deseja obter os dados do clima.
   * @returns Nenhum valor é retornado, mas os dados do clima são atribuídos à propriedade weatherDatas do componente.
   */
  getWeatherDatas(cityName: string): void {
    this.weatherService
      .getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Envia o nome da cidade para obter os dados do clima e limpa o campo de entrada.
   */
  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  /**
   * Método que é chamado quando o componente é destruído.
   * Ele emite um valor para o subject `destroy$` e completa o subject.
   * @returns void
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
