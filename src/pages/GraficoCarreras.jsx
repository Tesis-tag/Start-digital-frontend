import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import './GraficoCarrera.css'

echarts.use([LineChart, BarChart, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer]);


const GraficoCarreras = () => {

    useEffect(() => {
        const pie = echarts.init(document.getElementById('pie'));
        const bar = echarts.init(document.getElementById('bar'));
    
        const pieData = {
            backgroundColor: '#fff',
            title: {
              text: 'DISTRIBUCIÓN DE LOS ESTUDIANTES',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#111',
                fontSize: 20,
              }
            },
            tooltip: {
              trigger: 'item'
            },
            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [
              {
                name: 'Estudiantes en la Carrera de',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                color:['#000F36','#011959','#002076','#002996','#0034BD'],
                data: [
                    { value: 170, name: 'Ingeniería de Producción'},           
                    { value: 150, name: 'Ingeniería Informática'},           
                    { value: 90, name: 'Ingeniería Telemática'},  
                    { value: 70, name: 'Licenciatura en Matemáticas' },        
                    { value: 60, name: 'Licenciatura en Físicas'},         
                    { value: 50, name: 'Análisis de Sistemas'} ,      
                  ].sort(function (a, b) {
                  return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                  color: 'rgba(0, 0, 0, 1)',
                  textStyle: {
                    fontFamily: 'Roboto, sans-serif',
                    fontSize:'16' // Familia de fuentes de la leyenda
                  }
                },
                labelLine: {
                  lineStyle: {
                    color: 'rgba(0, 0, 0, 0.5)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
        }

        const barData={
            title: {
                text: 'ESTUDIANTES A TRAVÉS DE LOS AÑOS',
                left: 'center',
                top: 20,
                textStyle: {
                  color: '#111',
                  fontSize: 20,
                }
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: 'Estudiantes del Decanato',
                  type: 'bar',
                  barWidth: '60%',
                  color:'#011959',
                  data: [526, 473, 485, 600, 550, 580, 610]
                }
              ]
        }

        pie.setOption(pieData);
        bar.setOption(barData);
    
        return () => {
          pie.dispose();
          bar.dispose();
        };
      }, []);
    

  return (
    <>
            <div id="bar" className='graf'/>
            <div id="pie" className='graf' />
        
    </>
  )
}

export default GraficoCarreras