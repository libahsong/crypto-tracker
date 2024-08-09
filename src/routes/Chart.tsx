import { useQuery } from "react-query";
import { fetchMarketChart, fetchOhlcv } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IChartProps {
  coinId: string;
}

interface IHistorical {}

function Chart({ coinId }: IChartProps) {
  //   const data = [
  //     [1709395200000, 61942, 62211, 61721, 61845],
  //     [1709409600000, 61828, 62139, 61726, 62139],
  //     [1709424000000, 62171, 62210, 61821, 62068],
  //   ];

  //   const { isLoading: marketLoading, data: marketData } = useQuery(
  //     ["marketChart", coinId],
  //     () => fetchMarketChart(coinId)
  //   );
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchOhlcv(coinId)
  );

  console.log("data", data);
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {false || !data ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data,
            },
          ]}
          options={{
            tooltip: {
              enabled: true,
              y: { formatter: (value) => `$${value.toFixed(2)}` },
              x: {
                show: true,
                format: "dd MMM",
                formatter: undefined,
              },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            title: {
              text: `${coinId.toUpperCase()} CandleStick Chart`,
              align: "left",
            },
            grid: { show: false },
            xaxis: {
              tooltip: {
                enabled: true,
              },
              labels: { show: true },
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
