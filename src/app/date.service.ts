import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private currentDate: string = '';

  setCurrentDate(date: string): void {
    this.currentDate = date;
  }

  getCurrentDate(): string {
    return this.currentDate;
  }
}
