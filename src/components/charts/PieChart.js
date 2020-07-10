
import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SecondChart extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);
   

   
    let data = [];
    chart.data = 
        [{
            "country": "Lithuania",
            "litres": 501,
            "color": am4core.color("#ED1C24")
          }, {
            "country": "Czechia",
            "litres": 301,
            "color": am4core.color("#235789")
          }, {
            "country": "Ireland",
            "litres": 201,
            "color": am4core.color("#F1D302")
          }, {
            "country": "Germany",
            "litres": 165,
            "color": am4core.color("#020100")
          }]
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.dataFields.value = "litres";
    let hs = pieSeries.slices.template.states.getKey("hover");
hs.properties.scale = 1;
let as = pieSeries.slices.template.states.getKey("active");
as.properties.shiftRadius = 0;
pieSeries.slices.template.fillOpacity = 1;

hs.properties.fillOpacity = 0.5;
pieSeries.dataFields.category = "country";
chart.innerRadius = am4core.percent(40);
pieSeries.slices.template.stroke = am4core.color("#4a2abb");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
  }
  render() {
    return (
      <div id="chartdiv" ></div>
    );
  }
}

export default SecondChart;