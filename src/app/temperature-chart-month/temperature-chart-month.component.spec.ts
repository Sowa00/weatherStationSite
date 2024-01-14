import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartMonthComponent } from './temperature-chart-month.component';

describe('TemperatureChartMonthComponent', () => {
  let component: TemperatureChartMonthComponent;
  let fixture: ComponentFixture<TemperatureChartMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
