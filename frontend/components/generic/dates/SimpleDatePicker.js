import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";
import enLocale from "date-fns/locale/en-GB";
import { startOfYesterday } from "date-fns";

export default function SimpleDatePicker(props) {
  const { onDateChanged } = props;
  const [date, setDate] = useState(startOfYesterday());

  useEffect(() => {
    onDateChanged({
      date: date,
    });
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
      <DatePicker
        disableFuture
        label="Date"
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
