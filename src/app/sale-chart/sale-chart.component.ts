import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'chart.js'
import { ProductDetailServiceService } from '../Service/product-detail-service.service';
import { Salechart } from '../../model/salechart';
Chart.register(...registerables);
@Component({
  selector: 'app-sale-chart',
  imports: [],
  templateUrl: './sale-chart.component.html',
  styles: ``
})
export class SaleChartComponent implements OnInit {
  constructor(private servicepro:ProductDetailServiceService){}
public config: any = {
  type: 'bar',
  data: {
    labels: [], 
    datasets: [
      {
        label: 'ยอดขายทั้งหมด',
        data: [], 
        backgroundColor: 'rgba(0, 255, 255, 0.5)',
        borderColor: 'rgba(13,200, 255, 1)',
        borderWidth: 1
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
chart:any;
  ngOnInit(): void {
    this.dataChart();
  }

  dataChart(){
    this.servicepro.getSaleChart().subscribe({
      next:res=>{
        const result = res.map((item : Salechart)=> item.monthName)
        const summary = res.map((item:Salechart)=> item.price);
           this.config.data.labels = result;
           this.config.data.datasets[0].data = summary;

           if(this.chart){
            this.chart.destroy();
           }

           this.chart = new Chart('MyChart',this.config);
      },
      error(err) {
        console.log(err);
        
      },
    });
  }
}
