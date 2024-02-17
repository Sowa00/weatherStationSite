import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DownloadComponent } from './download.component';
import { WeatherService } from '../weather.service';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';
import * as moment_ from 'moment';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let moment: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DownloadComponent],
      providers: [FormBuilder, Papa, WeatherService, DatePipe]
    })
      .compileComponents();

    moment = moment_;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download data for date range', () => {
    spyOn((component as any).yourWeatherService, 'getObservationData').and.returnValue({
      subscribe: (callback: (data: any[]) => void) => callback([
        { id: 1, idByDateTime: 1, date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
        },
        { id: 2, idByDateTime: 2, date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
        }
      ])
    });

    const startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    component.downloadForm.patchValue({ startDate, endDate, fileType: 'csv' });
    component.downloadData();

    expect(component.generatedData[0]).toEqual({
      date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
    });
    expect(component.generatedData[1]).toEqual({
      date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
    });
  });


  it('should download data for single date', () => {
    spyOn((component as any).yourWeatherService, 'getWeatherDataForDay').and.returnValue({
      subscribe: (callback: (data: any) => void) => callback([
        { id: 1, idByDateTime: 1, date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
        },
        { id: 2, idByDateTime: 2, date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
        }
      ])
    });

    const singleDate = moment().format('YYYY-MM-DD');
    component.downloadForm.patchValue({ singleDate, fileType: 'csv' });
    component.downloadData();

    expect(component.generatedData[0]).toEqual({
      date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
    });
    expect(component.generatedData[1]).toEqual({
      date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
    });
  });

  it('should download data for single date in txt format with 2 weather data', () => {
    spyOn((component as any).yourWeatherService, 'getWeatherDataForDay').and.returnValue({
      subscribe: (callback: (data: any) => void) => callback([
        { id: 1, idByDateTime: 1, date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
        },
        { id: 2, idByDateTime: 2, date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
        }
      ])
    });

    const singleDate = moment().format('YYYY-MM-DD');
    component.downloadForm.patchValue({ singleDate, fileType: 'txt' });
    component.downloadData();

    expect(component.generatedData[0]).toEqual({
      date: '2024-02-01', time: '12:00', temperatureOut: 25, hiTemperature: 30, lowTemperature: 20, outHuminity: 50, dewPt: 15, windSpeed: 10, windDirection: 'N', windRun: 50, hiSpeed: 15, hiDirection: 'N', windChill: 20, heatIndex: 30, thwIndex: 28, bar: 1010, rain: 0, rainRate: 0, heatDd: 5, coolDd: 10, temperatureIn: 20, inHumidity: 40, inDew: 10, inHeat: 25, inEMC: 12, inAirDensity: 15, windSamp: 100, windTx: 100, ISSRecept: 100, arcInt: 100
    });
    expect(component.generatedData[1]).toEqual({
      date: '2024-02-02', time: '12:00', temperatureOut: 26, hiTemperature: 31, lowTemperature: 21, outHuminity: 51, dewPt: 16, windSpeed: 11, windDirection: 'N', windRun: 51, hiSpeed: 16, hiDirection: 'N', windChill: 21, heatIndex: 31, thwIndex: 29, bar: 1011, rain: 0, rainRate: 0, heatDd: 6, coolDd: 11, temperatureIn: 21, inHumidity: 41, inDew: 11, inHeat: 26, inEMC: 13, inAirDensity: 16, windSamp: 101, windTx: 101, ISSRecept: 101, arcInt: 101
    });
  });
});
