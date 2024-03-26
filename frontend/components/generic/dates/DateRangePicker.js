import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/x-date-pickers/DateRangePicker";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";
import enLocale from "date-fns/locale/en-GB";
import Box from "@mui/material/Box";
import {
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  startOfMinute,
  endOfMinute,
  startOfHour,
  endOfHour,
  startOfDay,
  endOfDay,
  isValid,
  isToday,
} from "date-fns";

import { makeStyles } from "@mui/styles";

// TODO find a way to set the date input boxes to use justify-content: space between.
// This will align the input boxes evenly over the space in the querybar
const useStyles = makeStyles((theme) => ({
  pickerInput: {
    "& .MuiFormControl-root": {},
  },
}));

// "& .MuiFormControl-root": {},
const calcAggregationLevel = function (startDate, endDate) {
  if (differenceInMonths(endDate, startDate) > 0) {
    return { interval: "day", number: 1 }; // week?
  }

  if (differenceInWeeks(endDate, startDate) > 1) {
    return { interval: "day", number: 1 };
  }

  if (differenceInDays(endDate, startDate) > 2) {
    return { interval: "hour", number: 2 };
  }

  if (differenceInDays(endDate, startDate) > 0) {
    return { interval: "hour", number: 1 };
  }

  // Handles case where start and end are today
  if (
    differenceInDays(endDate, startDate) == 0 &&
    isToday(startDate) &&
    isToday(endDate)
  ) {
    return { interval: "hour", number: 1 };
  }

  if (differenceInHours(endDate, startDate) > 0) {
    return { interval: "minute", number: 15 };
  }
};

//
const roundTimeToAggLevel = function (startDate, endDate, aggLevel) {
  // Valid AggLevels
  // microseconds;
  // milliseconds;
  // second;
  // minute;
  // hour;
  // day;
  // week;
  // month;
  // quarter;
  // year;

  // Might need this later of we can set hours, mins in the picker
  // switch (aggLevel) {
  //   case "mintue":
  //     roundedStartDate = startOfMinute(startDate);
  //     roundedEndDate = endOfMinute(endDate);
  //     break;
  //   case "hour":
  //     // Start is beginning of day
  //     roundedStartDate = startOfDay(startDate);

  //     if (isToday(endDate)) {
  //       roundedEndDate = new Date();
  //     }
  //     roundedEndDate = endOfDay(endDate);
  //     break;
  //   case "day":
  //     roundedStartDate = startOfDay(startDate);
  //     roundedEndDate = endOfDay(endDate);
  //     break;
  //   default:
  //     throw "RangePicker Invalid aggLevel:" + aggLevel;
  // }

  const roundedStartDate = startOfDay(startDate);
  let roundedEndDate;
  if (isToday(endDate)) {
    roundedEndDate = new Date();
  } else {
    roundedEndDate = endOfDay(endDate);
  }

  return { startDate: roundedStartDate, endDate: roundedEndDate };
};

export default function BasicDateRangePicker(props) {
  const classes = useStyles();

  if (!isValid(props.startDate)) {
    throw "RangePicker props.startDate is invalid: " + props.startDate;
  }

  if (!isValid(props.endDate)) {
    throw "RangePicker props.endDate is invalid: " + props.endDate;
  }

  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

  // useEffect(() => {
  //   const aggLevel = calcAggregationLevel(startDate, endDate);
  //   // Adjust time of date object according to aggLevel
  //   // hours, round to hours etc
  //   // const roundedDateRange = roundTimeToAggLevel(startDate, endDate, aggLevel);

  //   // props.onDateChanged({
  //   //   startDate: roundedDateRange.startDate,
  //   //   endDate: roundedDateRange.endDate,
  //   //   aggLevel,
  //   // });
  //   props.onDateChanged({
  //     startDate: startDate,
  //     endDate: endDate,
  //     aggLevel,
  //   });
  // }, [startDate, endDate]);

  const onChange = (dates) => {
    const [startDate, rawEndDate] = dates;

    const endDate = endOfDay(rawEndDate);

    const aggLevel = calcAggregationLevel(startDate, endDate);

    props.onDateChanged({
      startDate: startDate,
      endDate: endDate,
      aggregationInterval: aggLevel.interval,
      aggregationNumber: aggLevel.number,
    });
  };

  const pickerRef = useRef(null);
  if (pickerRef.current) {
    // pickerRef.current.style.backgroundColor = "red";
    pickerRef.current.style.justifyContent = "space-between";
    // justify-content: space-between;
  }
  // componentsProps;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
      <DateRangePicker
        ref={pickerRef}
        className={classes.pickerInput}
        disableFuture
        startText="Start date"
        endText="End date"
        value={[props.startDate, props.endDate]}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField size="medium" {...startProps} />
            <Box sx={{ mx: 1 }}> to </Box>
            <TextField size="medium" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
