import React, { useEffect, useState } from "react";
import TVChartContainer from "./chart";
import { wsBus } from "../../utils/wsBus";
import { Spin } from "antd";
import { chainCoinName } from "../../view/coinName";
import { useAppKitNetwork } from "@reown/appkit/react";
interface MyComponentProps {
  info: any;
}
const Chart = (props: MyComponentProps) => {
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    let chartTimeout: ReturnType<typeof setTimeout> | null = null;
    let hasChartLoaded = false;

    function startChartTimeout() {
      if (chartTimeout !== null) {
        clearTimeout(chartTimeout);
      }
      chartTimeout = setTimeout(() => {
        if (!hasChartLoaded) { 
          window.location.reload();
        }
      }, 5 * 60 * 1000); 
    }

    startChartTimeout();

    const handleChartLoading = (isLoading: any) => {
      setChartLoading(isLoading === 0);
      if (isLoading === 1) {
        hasChartLoaded = true;  
        if (chartTimeout !== null) {
          clearTimeout(chartTimeout);  
          chartTimeout = null;
        }
      }
    };

    wsBus.on("chart_loading", handleChartLoading);

    return () => {
      wsBus.off("chart_loading", handleChartLoading);
      if (chartTimeout !== null) {
        clearTimeout(chartTimeout);
      }
    };
  }, []);
  return (
    <div>
      <Spin spinning={chartLoading}  >
        <TVChartContainer
          coins={{ tokenNameIn: props?.info?.symbol, tokenNameOut: chainCoinName(chainId) }}
        ></TVChartContainer>
      </Spin>
    </div>
  );
};

export default Chart;
