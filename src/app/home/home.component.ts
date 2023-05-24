import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { DataModel } from '../model/my-model';
import { MyServiceService } from '../service/my-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexPlotOptions,
  ApexAxisChartSeries

} from 'ng-apexcharts';



export type ChartOptions = {
  series: ApexAxisChartSeries | any[];
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  yaxis?: ApexYAxis | any;
  tooltip?: ApexTooltip | any;
  plotOptions?: ApexPlotOptions | any;
  title?: ApexTitleSubtitle | any;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  stockDataList: Array<DataModel> = [];
  stockData: DataModel = new DataModel();
  itemIndex: number = 1;
  itemPerPage: number = 10;
  Dates: Date[];
  Open: Number[];
  Close: Number[];
  High: Number[];
  Low: Number[];
  myData: any[] = [];

  constructor(
    private master: MyServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDataFromAzure();
  }
  getDataFromAzure() {
    debugger
    this.master.getStockData().subscribe((result) => {
      debugger;
      this.stockDataList = result as [DataModel];

      for (let i = 0; i < this.stockDataList.length; i++) {
        var obj = {
          x: this.stockDataList[i].RowKey,
          y: [this.stockDataList[i].Open, this.stockDataList[i].High, this.stockDataList[i].Low, this.stockDataList[i].Close]
        }
        this.myData.push(obj);
      }
    })
  }

  dummy: ChartOptions = {

    series: [
      {
        data: this.myData
      },
    ],
    chart: {
      type: 'candlestick',
      height: 600,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yy',
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3C90EB',
          downward: '#DF7D46',
        },
      },
    },
    title: {
      text: 'Stock Price',
    },
  };


  findDataById(id: string): any {
    debugger;
    let a = this.stockDataList.find(data => data.RowKey === id)
    this.stockData = a != undefined ? a : new DataModel;
  }
  addNewStockData() {
    this.master.addNewStockData(this.stockData).subscribe(
      (result) => {
        if (result) {
          this.toastr.success('Data added successfully!', 'Success');
          this.stockData = new DataModel();
          this.getDataFromAzure();
        } else {
          this.toastr.warning('Data addition failed!', 'Warning');
        }
      },
      (err) => {
        this.toastr.error('Failed to add data!', 'Error');
      }
    );
  }

  blankData() {
    this.stockData = new DataModel();
  }
  updateStockData() {
    debugger;
    this.master.updateStockData(this.stockData).subscribe(
      (result) => {
        if (result) {
          debugger
          this.toastr.success('Data updated successfully!', 'Success');
          this.stockData = new DataModel();
          this.getDataFromAzure();
        } else {
          this.toastr.warning('Data update failed!', 'Warning');
        }
      },
      (err) => {
        this.toastr.error('Failed to update data!', 'Error');
      }
    );
  }

}
