import React from "react";
import { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";

// import uniq from "lodash/uniq";
// import map from "lodash/map";
// import sum from "lodash/sum";
// import filter from "lodash/filter";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SummaryChart(props) {
  const { chartData } = props;
  const chartOptions = {
    chart: {
      background: "transparent",
      // sparkline: {
      //   enabled: true,
      // },
    },
    // colors: [theme.palette.primary.main],
    tooltip: {
      enabled: true,
      x: { format: "dd/MM HH:mm" },
    },

    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      type: "datetime",
    },
    // theme: {
    //   mode: theme.palette.mode,
    // },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="area"
      height="300px"
    />
  );
}
