import { useEffect, useRef } from "react";
import "./index.scss";
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
} from "./charting_library";
import DataFeed from "./datafeed";
import * as React from "react";
import { formatScientificNotation, isMobile } from "../../utils/tool"; 

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl?: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion?: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId?: ChartingLibraryWidgetOptions["client_id"];
  userId?: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  container: ChartingLibraryWidgetOptions["container"];
  timezone: any;
  numeric_formatting: any;
}

declare let window: any;
const getLanguageFromURL = (): LanguageCode | null => {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window?.location?.search);
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, " ")) as LanguageCode);
};
 
/**
 * TradingView 自定义价格格式化
 */
function createCustomPriceFormatter(symbolInfo: any, minTick: any) {
  return {
    format: (price: number) => {
      return String(formatScientificNotation(price)).slice(0, 8)
    },
  };
}

const TVChartContainer = React.memo(
  (props: any) => {
    const chartContainerRef = useRef<any>(null);

    const defaultProps: Omit<ChartContainerProps, "container"> = {
      symbol: `${props?.coins?.tokenNameIn}/${props?.coins?.tokenNameOut}`,
      interval: "1" as ResolutionString,
      datafeedUrl: "",
      libraryPath: "/charting_library/",
      // chartsStorageUrl: "https://saveload.tradingview.com",
      // chartsStorageApiVersion: "1.1",
      // clientId: "tradingview.com",
      // userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      timezone: "Asia/Shanghai",
      numeric_formatting: { decimal_sign: "." },
    };
 
    useEffect(() => {
      if (!props?.coins?.tokenNameIn) return; 
      const widgetOptions: any = {
        symbol: defaultProps.symbol as string,
        datafeed: DataFeed,
        interval: "15",
        container: chartContainerRef.current,
        library_path: defaultProps.libraryPath as string,
        locale: getLanguageFromURL() || "en",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_symbol_search",
          "header_quick_search",
        ],
        time_frames: [ 
          // {
          //   text: "1D 15m",
          //   resolution: "15",
          //   description: "1 Day range with 15min bars",
          //   from: "1D",
          // }
        ],
        enabled_features: ["study_templates", isMobile() ? "hide_left_toolbar_by_default" : ''], 
        timezone: "Asia/Shanghai",  
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        fullscreen: defaultProps.fullscreen,
        autosize: true,
        studies_overrides: defaultProps.studiesOverrides,
        theme: "dark",
        custom_formatters: {
          priceFormatterFactory: createCustomPriceFormatter, 
        },  
      };

      const tvWidget = new widget(widgetOptions);

      tvWidget.onChartReady(() => {  
        tvWidget.setCSSCustomProperty("--tv-color-pane-background", "#242424"); 
        window.tvChart = tvWidget.activeChart();
        // window.tvChart.onVisibleRangeChanged().subscribe(null, (_data: any) => { 
        //   console.log(_data);
        // });
      });

      return () => {
        tvWidget.remove();
      };
    }, [props?.coins?.tokenNameIn]);

    return <div ref={chartContainerRef} className="TVChartContainer h-[370px]" />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.coins.tokenNameIn === nextProps.coins.tokenNameIn &&
      prevProps.coins.tokenNameOut === nextProps.coins.tokenNameOut
    );
  }
);

export default TVChartContainer;