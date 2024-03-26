import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import merge from "lodash/merge";

export default function GaugeChart(props) {
  const { chartData, chartOptions = {} } = props;
  const theme = useTheme();

  // Reformat to an array of objects with x: y: keys for the charting
  //   const cdata = [{ data: [] }];
  //   Object.keys(chartData).forEach((key) => {
  //     // console.log(key, chartData[key]);
  //     cdata[0].data.push({ x: key, y: chartData[key] });
  //   });

  const chartOptionsDefault = {
    chart: {
      height: 300,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "14px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["CPU Avg 1hr"],

    theme: {
      mode: theme.palette.mode,
    },
    noData: {
      text: "No data for this query",
    },
  };

  const options = merge(chartOptionsDefault, chartOptions);

  const getChartComponent = () => {
    return (
      <Chart
        options={options}
        series={chartData}
        type="radialBar"
        height={"90%"}
        width={"200px"}
      />
    );
  };

  return getChartComponent();
}
