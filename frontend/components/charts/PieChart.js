import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import merge from "lodash/merge";

const PieChart = (props) => {
  const { chartData, chartOptions = {} } = props;
  const theme = useTheme();

  const chartOptionsDefault = {
    labels: Object.keys(chartData),
    chart: {
      background: "transparent",
      fontFamily: theme.typography.fontFamily,
      type: "donut",
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    stroke: {
      width: 1,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: "40%", //size of hole
        },
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    fill: {
      type: "solid",
    },
    theme: {
      mode: theme.palette.mode,
    },
    legend: {
      formatter: function (seriesName, opts) {
        return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]];
      },
      fontSize: "10px",
    },
    noData: {
      text: "No data for this query",
    },
  };
  const options = merge(chartOptionsDefault, chartOptions);

  const getChartComponent = () => {
    return (
      <Chart
        height="90%"
        // width="300px"
        options={options}
        series={Object.values(chartData)}
        type="donut"
      />
    );
  };

  return getChartComponent();
};

export default PieChart;
