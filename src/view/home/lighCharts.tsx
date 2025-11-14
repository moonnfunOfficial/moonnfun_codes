import React from 'react';
import { useEffect } from 'react'
import { init, dispose, getSupportedOverlays, DomPosition, registerLocale } from 'klinecharts'
import { countLeadingZerosAfterDecimal, isMobile } from '../../utils/tool';
import { useTranslation } from 'react-i18next';
// https://klinecharts.com/guide/styles

interface MyComponentProps {
  dataLine: any;
}
const App: React.FC<MyComponentProps> = ({ dataLine }) => {
  const subscriptNumbers: any = {
    0: '₀',
    1: '₁',
    2: '₂',
    3: '₃',
    4: '₄',
    5: '₅',
    6: '₆',
    7: '₇',
    8: '₈',
    9: '₉'
  }
  let { t, i18n } = useTranslation();
  useEffect(() => {
    const isH5 = isMobile()
    let chart: any = init('chart', {
      decimalFold: {
        format: value => {
          const vl = `${value}`
          const reg = /\.0{3,}[1-9][0-9]*$/
          if (reg.test(vl)) {
            const result = vl.split('.')
            const lastIndex = result.length - 1
            const v = result[lastIndex]
            const match = /0*/.exec(v)
            if (match) {
              const count = `${match[0].length}`
              result[lastIndex] = v.replace(/0*/, `0${count.replace(/\d/, $1 => subscriptNumbers[$1] ?? '')}`)
              return result.join('.')
            }
          }
          return vl
        }
      }
    })
    chart.createIndicator('VOL')
    // chart.createIndicator('SAR', false, { id:'chart' })
    const styles = {
      grid: {
        show: true,
        horizontal: {
          show: true,
          size: 1,
          color: '#ffffff29',
          style: 'dashed',
          dashedValue: [12, 12]
        },
        vertical: {
          show: true,
          size: 1,
          color: '#ffffff29',
          style: 'dashed',
          dashedValue: [2, 2]
        }
      },
      candle: {
        // 'candle_solid' | 'candle_stroke' | 'candle_up_stroke' | 'candle_down_stroke' | 'ohlc' | 'area'
        type: 'candle_solid',
        bar: {
          // 'current_open' | 'previous_close'
          compareRule: 'current_open',
          upColor: '#2DC08E',
          downColor: '#F92855',
          noChangeColor: '#888888',
          upBorderColor: '#2DC08E',
          downBorderColor: '#F92855',
          noChangeBorderColor: '#888888',
          upWickColor: '#2DC08E',
          downWickColor: '#F92855',
          noChangeWickColor: '#888888'
        },
        area: {
          lineSize: 2,
          lineColor: '#2196F3',
          smooth: false,
          value: 'close',
          backgroundColor: [{
            offset: 0,
            color: 'rgba(33, 150, 243, 0.01)'
          }, {
            offset: 1,
            color: 'rgba(33, 150, 243, 0.2)'
          }],
          point: {
            show: true,
            color: 'blue',
            radius: 4,
            rippleRadius: 8,
            animation: true,
            animationDuration: 1000
          }
        },
        priceMark: {
          show: true,
          high: {
            show: true,
            color: '#D9D9D9',
            textMargin: 5,
            textSize: 12,
            textFamily: 'Helvetica Neue',
            textWeight: 'normal'
          },
          low: {
            show: true,
            color: '#D9D9D9',
            textMargin: 5,
            textSize: 12,
            textFamily: 'Helvetica Neue',
            textWeight: 'normal',
          },
          last: {
            show: true,
            // 'current_open' | 'previous_close'
            compareRule: 'current_open',
            upColor: '#2DC08E',
            downColor: '#F92855',
            noChangeColor: '#888888',
            line: {
              show: true,
              // 'solid' | 'dashed'
              style: 'dashed',
              dashedValue: [4, 4],
              size: 1
            },
            text: {
              show: true,
              // 'fill' | 'stroke' | 'stroke_fill'
              style: 'fill',
              size: 12,
              paddingLeft: 4,
              paddingTop: 4,
              paddingRight: 4,
              paddingBottom: 4,
              // 'solid' | 'dashed'
              borderStyle: 'solid',
              borderSize: 0,
              borderColor: 'transparent',
              borderDashedValue: [2, 2],
              color: '#FFFFFF',
              family: 'Helvetica Neue',
              weight: 'normal',
              borderRadius: 2
            }
          }
        },
        tooltip: {
          offsetLeft: 4,
          offsetTop: 0,
          offsetRight: 4,
          offsetBottom: 6,
          showRule: 'always',// 'always' | 'follow_cross' | 'none' 
          showType: isH5 ? 'rect' : 'standard',// 'standard' | 'rect'
          custom: [
            { title: 'time', value: '{time}' },
            { title: 'open', value: '{open}' },
            { title: 'high', value: '{high}' },
            { title: 'low', value: '{low}' },
            { title: 'close', value: '{close}' },
            { title: 'volume', value: '{volume}' }
          ],
          defaultValue: 'n/a',
          rect: {
            // 'fixed' | 'pointer'
            position: 'pointer',
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            offsetLeft: 4,
            offsetTop: 4,
            offsetRight: 4,
            offsetBottom: 4,
            borderRadius: 4,
            borderSize: 1,
            borderColor: '#FBF8EF',
            color: '#62573A'
          },
          text: {
            size: isH5 ? 10 : 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            color: '#D9D9D9',
            marginLeft: 8,
            marginTop: isH5 ? 0 : 4,
            marginRight: 8,
            marginBottom: 4,
          },
          features: []
        }
      },
      indicator: {
        ohlc: {
          // 'current_open' | 'previous_close'
          compareRule: 'current_open',
          upColor: 'rgba(45, 192, 142, .7)',
          downColor: 'rgba(249, 40, 85, .7)',
          noChangeColor: '#888888'
        },
        bars: [{
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderSize: 1,
          borderDashedValue: [2, 2],
          upColor: 'rgba(45, 192, 142, .7)',
          downColor: 'rgba(249, 40, 85, .7)',
          noChangeColor: '#888888'
        }],
        lines: [
          {
            // 'solid' | 'dashed'
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color: '#FF9600'
          }, {
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color: '#935EBD'
          }, {
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color: '#2196F3'
          }, {
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color: '#E11D74'
          }, {
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color: '#01C5C4'
          }
        ],
        circles: [{
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderSize: 1,
          borderDashedValue: [2, 2],
          upColor: 'rgba(45, 192, 142, .7)',
          downColor: 'rgba(249, 40, 85, .7)',
          noChangeColor: '#888888'
        }],
        lastValueMark: {
          show: false,
          text: {
            show: false,
            // 'fill' | 'stroke' | 'stroke_fill'
            style: 'fill',
            color: '#FFFFFF',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            // 'solid' | 'dashed'
            borderStyle: 'solid',
            borderSize: 1,
            borderDashedValue: [2, 2],
            paddingLeft: 4,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            borderRadius: 2
          }
        },
        tooltip: {
          offsetLeft: 4,
          offsetTop: 6,
          offsetRight: 4,
          offsetBottom: 6,
          // 'always' | 'follow_cross' | 'none'
          showRule: 'always',
          // 'standard' | 'rect'
          showType: 'standard',
          showName: true,
          showParams: true,
          defaultValue: 'n/a',
          text: {
            size: isH5 ? 10 : 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            color: '#D9D9D9',
            marginTop: 4,
            marginRight: 8,
            marginBottom: 4,
            marginLeft: 8
          },
          features: []
        }
      },
      xAxis: {
        show: true,
        size: 'auto',
        axisLine: {
          show: true,
          color: '#888888',
          size: 1
        },
        tickText: {
          show: true,
          color: '#D9D9D9',
          family: 'Helvetica Neue',
          weight: 'normal',
          size: isH5 ? 10 : 12,
          marginStart: 4,
          marginEnd: 4
        },
        tickLine: {
          show: true,
          size: 1,
          length: 3,
          color: '#888888'
        }
      },
      yAxis: {
        show: true,
        size: 'auto',
        // 'left' | 'right'
        position: 'right',
        // 'normal' | 'percentage' | 'log'
        type: 'normal',
        inside: false,
        reverse: false,
        axisLine: {
          show: true,
          color: '#888888',
          size: 1
        },
        tickText: {
          show: true,
          color: '#D9D9D9',
          family: 'Helvetica Neue',
          weight: 'normal',
          size: 12,
          marginStart: 4,
          marginEnd: 4
        },
        tickLine: {
          show: true,
          size: 1,
          length: 3,
          color: '#888888'
        }
      },
      separator: {
        size: 1,
        color: '#888888',
        fill: true,
        activeBackgroundColor: 'rgba(230, 230, 230, .15)'
      },
      crosshair: {
        show: true,
        horizontal: {
          show: true,
          line: {
            show: true,
            // 'solid' | 'dashed'
            style: 'dashed',
            dashedValue: [4, 2],
            size: 1,
            color: '#888888'
          },
          text: {
            show: true,
            // 'fill' | 'stroke' | 'stroke_fill'
            style: 'fill',
            color: '#FFFFFF',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            // 'solid' | 'dashed'
            borderStyle: 'solid',
            borderDashedValue: [2, 2],
            borderSize: 1,
            borderColor: '#686D76',
            borderRadius: 2,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: '#686D76'
          }
        },
        vertical: {
          show: true,
          line: {
            show: true,
            // 'solid'|'dashed'
            style: 'dashed',
            dashedValue: [4, 2],
            size: 1,
            color: '#888888'
          },
          text: {
            show: true,
            // 'fill' | 'stroke' | 'stroke_fill'
            style: 'fill',
            color: '#FFFFFF',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            // 'solid' | 'dashed'
            borderStyle: 'solid',
            borderDashedValue: [2, 2],
            borderSize: 1,
            borderColor: '#686D76',
            borderRadius: 2,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: '#686D76'
          }
        }
      },
      overlay: {
        point: {
          color: '#1677FF',
          borderColor: 'rgba(22, 119, 255, 0.35)',
          borderSize: 1,
          radius: 5,
          activeColor: '#1677FF',
          activeBorderColor: 'rgba(22, 119, 255, 0.35)',
          activeBorderSize: 3,
          activeRadius: 5
        },
        line: {
          // 'solid' | 'dashed'
          style: 'solid',
          smooth: false,
          color: '#1677FF',
          size: 1,
          dashedValue: [2, 2]
        },
        rect: {
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          color: 'rgba(22, 119, 255, 0.25)',
          borderColor: '#1677FF',
          borderSize: 1,
          borderRadius: 0,
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderDashedValue: [2, 2]
        },
        polygon: {
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          color: '#1677FF',
          borderColor: '#1677FF',
          borderSize: 1,
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderDashedValue: [2, 2]
        },
        circle: {
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          color: 'rgba(22, 119, 255, 0.25)',
          borderColor: '#1677FF',
          borderSize: 1,
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderDashedValue: [2, 2]
        },
        arc: {
          // 'solid' | 'dashed'
          style: 'solid',
          color: '#1677FF',
          size: 1,
          dashedValue: [2, 2]
        },
        text: {
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          color: '#FFFFFF',
          size: 12,
          family: 'Helvetica Neue',
          weight: 'normal',
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderDashedValue: [2, 2],
          borderSize: 0,
          borderRadius: 2,
          borderColor: '#1677FF',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: '#1677FF'
        }
      }
    }
    chart.setStyles(styles);  
    if (dataLine && dataLine.length > 0) {
      const priceDecimal = countLeadingZerosAfterDecimal(dataLine[0]?.close || '0')
      const volumeDecimal = countLeadingZerosAfterDecimal(dataLine[0]?.volume || '0')
      chart.setPrecision({ price: priceDecimal + 3, volume: volumeDecimal + 3 })  
    }
    chart.setOffsetRightDistance(30); 

    const flattened = Array.isArray(dataLine) ? dataLine.flat() : dataLine;
    const convertedData = flattened.map((item: any) => ({
      ...item,
      // volume: JSON.stringify(item?.volume || 0)
    }));
    if (convertedData && convertedData.length === 1 && convertedData[0].isUP) {
      const priceDecimal = countLeadingZerosAfterDecimal(convertedData[0]?.close || '0')
      const volumeDecimal = countLeadingZerosAfterDecimal(convertedData[0]?.volume || '0')
      chart.setPrecision({ price: priceDecimal + 3, volume: volumeDecimal + 3 }) 
      chart.applyNewData(convertedData)
    } else {
      chart.applyNewData(convertedData)
    } 
    registerLocale('en-US', {
      time: 'time:',
      open: 'open:',
      high: 'high:',
      low: 'low:',
      close: 'close:',
      volume: 'volume:',
      second: 'second',
      minute: 'minute',
      hour: 'hour',
      day: 'day',
      week: 'week',
      month: 'month',
      year: 'year',
      change: 'change：',   
      turnover: 'turnover：',  
    })
    registerLocale('zh-TW', {
      time: '時間：',
      open: '開：',
      high: '高：',
      low: '低：',
      close: '收：',
      volume: '成交量：',
      second: '秒',
      minute: '分鐘',
      hour: '小時',
      day: '天',
      week: '週',
      month: '月',
      year: '年',
      change: '漲跌幅：',   
      turnover: '成交額：', 
    }) 
    if(i18n.language === "en") {
      chart.setLocale('en-US')
    } else{
      chart.setLocale('zh-TW')
    }  

    // chart.applyNewData([{
    //   close: 0.00000000007019273, high: 0.00000000007019273, low: 0.00000000007019273, open: 0.00000000007019273, timestamp: 1749031822520, volume: '0.0000000007339029'
    // }, {
    //   close: 0.00000000008329273, high: 0.00000000028019273, low: 0.00000000008019273, open: 0.00000000007819273, timestamp: 1749038822520, volume: '0.0000000009339029'
    // }]) 
    // fetch('https://klinecharts.com/datas/kline.json')
    //   .then(res => res.json())
    //   .then(dataList => {
    //     chart.applyNewData(dataList);
    //   }).catch(err => {
    //     console.log(err)
    //   })

    return () => {
      dispose('chart')
    }
  }, [dataLine, i18n?.language])

  return (
    <div className="">
      <div id="chart" style={{ height: 336 }} />
    </div>
  );
}

export default App;