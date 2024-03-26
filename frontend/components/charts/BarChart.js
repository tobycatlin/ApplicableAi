import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import merge from "lodash/merge";

const BarChart = (props) => {
  const { chartData, chartOptions = {} } = props;
  const theme = useTheme();
  // Reformat to an array of objects with x: y: keys for the charting
  const cdata = [{ data: [] }];
  Object.keys(chartData).forEach((key) => {
    // console.log(key, chartData[key]);
    cdata[0].data.push({ x: key, y: chartData[key] });
  });

  const chartOptionsDefault = {
    chart: {
      background: "transparent",
      fontFamily: theme.typography.fontFamily,
    },

    stroke: {
      width: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },

    theme: {
      mode: theme.palette.mode,
    },
    noData: {
      text: "No data for this query",
    },
  };

  const options = merge(chartOptionsDefault, chartOptions);

  const getChartComponent = () => {
    return <Chart height="90%" options={options} series={cdata} type="bar" />;
  };

  return getChartComponent();
};

export default BarChart;
