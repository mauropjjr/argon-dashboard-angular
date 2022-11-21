import { DashService } from './../../services/dash';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public dash: any;

  constructor(
    private dashService: DashService

  ) {
    this.dashService.getAll().subscribe(data => {
      this.dash = data;
      this.chartValorRecebido();
    });
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });


  }

  public chartValorRecebido() {
    {
      const chartSales = document.getElementById('chart-sales');


      let opcoes = {
        options: {
          scales: {
            yAxes: [{
              gridLines: {
                color: '#212529',
                zeroLineColor: '#212529',
                drawOnChartArea: false
              },
              ticks: {
                callback: function (value) {
                  if (!(value % 10)) {
                    return 'R$' + value + '';
                  }
                }
              }
            }]
          }
        },
        data: {
          labels: this.dash.dashboard.grafico_recebimento.map(m => m.ano + "/" + m.mes),
          datasets: [{
            label: 'Performance',
            data: this.dash.dashboard.grafico_recebimento.map(m => m.total)
          }]
        }
      };

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: opcoes.options,
      data: opcoes.data
    });
  }
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
