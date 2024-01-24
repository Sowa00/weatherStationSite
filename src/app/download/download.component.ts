import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Papa } from 'ngx-papaparse';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent {
  downloadForm: FormGroup;
  generatedData: Record<string, any> = {};

  constructor(private fb: FormBuilder, private papa: Papa, private yourWeatherService: WeatherService) {
    this.downloadForm = this.fb.group({
      singleDate: [''],
      startDate: [''],
      endDate: [''],
      fileType: ['text', Validators.required],
    });
  }

  downloadData(): void {
    const fileType = this.downloadForm.value.fileType;

    if (this.downloadForm.value.singleDate) {
      const singleDate = this.downloadForm.value.singleDate;
      const formattedDate = moment(singleDate).format('DD.MM.YYYY');

      this.yourWeatherService.getWeatherDataForDay(formattedDate).subscribe(data => {
        this.generatedData = this.transformData(data, ['id', 'idByDateTime']);
        this.downloadFile(fileType);
      });
    } else if (this.downloadForm.value.startDate && this.downloadForm.value.endDate) {
      const startDate = this.downloadForm.value.startDate;
      const endDate = this.downloadForm.value.endDate;
      const formattedStartDate = moment(startDate).format('DD.MM.YYYY');
      const formattedEndDate = moment(endDate).format('DD.MM.YYYY');

      this.yourWeatherService.getObservationData(formattedStartDate, formattedEndDate).subscribe(data => {
        this.generatedData = this.transformData(data, ['id', 'idByDateTime']);
        this.downloadFile(fileType);
      });
    }
  }

  transformData(data: any[], excludeFields: string[]): any[] {
    const transformedData = data.map(item => {
      const newItem: any = { ...item };
      excludeFields.forEach(field => {
        const matchingField = Object.keys(newItem).find(key => key.toLowerCase() === field.toLowerCase());
        if (matchingField) {
          delete newItem[matchingField];
        }
      });
      return newItem;
    });

    return transformedData;
  }



  private downloadFile(fileType: string): void {
    if (fileType === 'text') {
      const blob = new Blob([JSON.stringify(this.generatedData)], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'data.txt');
    } else if (fileType === 'csv') {
      // Konwersja danych do CSV
      const dataArray = Object.values(this.generatedData);
      const csvData = this.papa.unparse(dataArray as { [k: string]: string | number }[]);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'data.csv');
    } else if (fileType === 'xlsx') {
      // Sprawdzamy, czy this.generatedData jest dwuwymiarową tablicą
      // Sprawdzamy, czy this.generatedData jest dwuwymiarową tablicą
      if (Array.isArray(this.generatedData) && this.generatedData.length > 0) {
        // Extract keys from the first object to create the header row
        const keys = Object.keys(this.generatedData[0]);

        // Create a two-dimensional array with keys as the first row
        const dataArray: any[][] = [keys, ...this.generatedData.map(obj => keys.map(key => obj[key]))];

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');
      } else {
        console.error('Błąd: Oczekiwano obiektu danych dla formatu XLSX');
      }


    }
  }






  private getFileName(data: any, extension: string): string {
    // Implementuj logikę tworzenia nazwy pliku na podstawie danych
    return 'data.' + extension;
  }
}
