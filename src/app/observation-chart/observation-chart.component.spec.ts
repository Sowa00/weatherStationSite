import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ObservationChartComponent } from './observation-chart.component';
import { DateRangeService } from '../date-range.service';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ObservationChartComponent', () => {
  let component: ObservationChartComponent;
  let fixture: ComponentFixture<ObservationChartComponent>;
  let weatherServiceStub: Partial<WeatherService>;
  let dateRangeServiceStub: Partial<DateRangeService>;

  beforeEach(async () => {
    weatherServiceStub = {
      getObservationData: () => of([])
    };

    dateRangeServiceStub = {
      startDate$: of(''),
      endDate$: of('')
    };

    await TestBed.configureTestingModule({
      declarations: [ObservationChartComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder, DatePipe,
        { provide: WeatherService, useValue: weatherServiceStub },
        { provide: DateRangeService, useValue: dateRangeServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load observation data', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-07');

    spyOn(component.dateRangeForm.valueChanges, 'subscribe').and.callThrough();
    spyOn(component['weatherService'], 'getObservationData').and.returnValue(of([]));

    component.dateRangeForm.patchValue({ startDate, endDate });

    fixture.detectChanges();

    component.loadObservationData();

    expect(component['weatherService'].getObservationData).toHaveBeenCalledWith(
      jasmine.any(Date),
      jasmine.any(Date)
    );
    expect(component.lineChartData.length).toBe(1);
    expect(component.lineChartData[0].data.length).toBe(0);
    expect(component.lineChartLabels.length).toBe(0);
  });


  it('should handle invalid form', () => {
    spyOn(console, 'log');

    component.dateRangeForm.setErrors({ invalid: true });
    component.loadObservationData();

    expect(console.log).toHaveBeenCalledWith('Formularz jest nieprawidłowy. Sprawdź błędy walidacji.');
  });

  it('should handle error while loading data', () => {
    spyOn(console, 'error');

    spyOn(component['weatherService'], 'getObservationData').and.returnValue(
      new Observable(observer => observer.error('test error'))
    );

    component.loadObservationData();

    expect(console.error).toHaveBeenCalledWith('Błąd podczas pobierania danych:', 'test error');
  });
});
