import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StaticDataPicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker />
    </LocalizationProvider>
  );
}
