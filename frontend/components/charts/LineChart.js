import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import merge from "lodash/merge";

const LineChart = (props) => {
  const { chartData, chartOptions = {} } = props;
  const theme = useTheme();

  const cdata = [{ data: [] }];
  // Need to change how this works
  Object.keys(chartData).forEach((key) => {
    // console.log(key, chartData[key]);
    cdata[0].data.push({ x: key, y: chartData[key] });
  });

  const chartOptionsDefault = {
    chart: {
      background: "transparent",
      fontFamily: theme.typography.fontFamily,
    },
    xaxis: {
      type: "datetime",
    },

    stroke: {
      width: 1,
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
    return (
      <Chart
        height="90%"
        // width="300px"
        options={options}
        series={cdata}
        type="line"
      />
    );
  };

  return getChartComponent();
};

export default LineChart;
