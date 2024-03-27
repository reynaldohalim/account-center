import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

declare var google: { visualization: {
  PieChart: any;
  arrayToDataTable(arg0: ((string | number)[] | (string | { role: string; })[])[]): unknown; DataTable: new () => any; BarChart: new (arg0: HTMLElement | null) => any; 
}; };

@Component({
  selector: 'app-absensi',
  templateUrl: './absensi.page.html',
  styleUrls: ['./absensi.page.scss'],
})


export class AbsensiPage implements OnInit{
  constructor() {  }

  ngOnInit(): void {
      this.gChart();
  }
  
  gChart(){
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var chartWidth = screenWidth * 0.8; // 80% of the screen width
    var chartHeight = screenHeight * 0.1; // 60% of the screen height
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Mushrooms');
    data.addColumn('number', 'Onions');
    data.addColumn('number', 'Olives');
    data.addColumn('number', 'Zucchini');
    data.addColumn('number', 'Pepperoni');
    data.addRows([
      [3, 1, 1, 1, 2],
    ]);
      
      // Set chart options
    var options = {
      width: chartWidth,
      height: chartHeight,
      isStacked: true,
      legend: { position: 'none' }, // Hide legend.
      hAxis: {
        title: 'Toppings',
        titleTextStyle: { color: '#333' }, // Set title color
        textStyle: { color: 'transparent' }, // Set axis label color
      },
      vAxis: {
        title: 'Slices',
        titleTextStyle: { color: '#333' }, // Set title color
        textStyle: { color: '#333' }, // Set axis label color
        gridlines: { color: 'transparent' }, // Hide vertical gridlines
      },
    };

    // Instantiate and draw the chart
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}
