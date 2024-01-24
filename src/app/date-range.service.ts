import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  private startDateSubject = new BehaviorSubject<string>('');
  private endDateSubject = new BehaviorSubject<string>('');

  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();

  getStartDate(): string {
    return this.startDateSubject.value;
  }

  setStartDate(startDate: string): void {
    this.startDateSubject.next(startDate);
  }

  getEndDate(): string {
    return this.endDateSubject.value;
  }

  setEndDate(endDate: string): void {
    this.endDateSubject.next(endDate);
  }
}
