import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

      this.yourWeatherService.getWeatherDataForDay(singleDate).subscribe(data => {
        this.generatedData = this.transformData(data, ['id', 'idByDateTime']);
        console.log(this.generatedData);
        this.downloadFile(fileType);
      });
    } else if (this.downloadForm.value.startDate && this.downloadForm.value.endDate) {
      const startDate = this.downloadForm.value.startDate;
      const endDate = this.downloadForm.value.endDate;

      this.yourWeatherService.getObservationData(startDate, endDate).subscribe(data => {
        this.generatedData = this.transformData(data, ['id', 'idByDateTime']);
        console.log(this.generatedData);
        this.downloadFile(fileType);
      });
    }
  }

  transformData(data: any[], excludeFields: string[]): any[] {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }

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
      const dataArray = Object.values(this.generatedData);
      const csvData = this.papa.unparse(dataArray as { [k: string]: string | number }[]);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'data.csv');
    } else if (fileType === 'xlsx') {
      if (Array.isArray(this.generatedData) && this.generatedData.length > 0) {
        const keys = Object.keys(this.generatedData[0]);
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
}
