import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { differenceInHours, addHours, startOfDay, endOfDay } from "date-fns";
import { Button, Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import TimeRangeSlider from "./TimeRangeSlider";

export default function TimeRangePicker(props) {
  const { onTimeChanged, dateRange } = props;

  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState({
    startDate: dateRange.startDate,
    endDate: addHours(dateRange.startDate, 1),
  });

  // if the selected date changes then update the selected interval and make it the whole day
  useEffect(() => {
    setSelectedInterval({
      startDate: dateRange.startDate,
      endDate: addHours(dateRange.startDate, 24),
    });

    setPlaying(false);
  }, [dateRange]);

  const playTimeRange = () => {
    const startDay = startOfDay(selectedInterval.startDate);
    const endDay = endOfDay(selectedInterval.endDate);

    if (selectedInterval.endDate < endDay) {
      // If period is within the day move the slider along by 1 hr
      setSelectedInterval({
        startDate: addHours(selectedInterval.startDate, 1),
        endDate: addHours(selectedInterval.endDate, 1),
      });
    } else {
      const diffHours = differenceInHours(
        selectedInterval.endDate,
        selectedInterval.startDate,
        { roundingMethod: "ceil" }
      );

      // if the selected range is the whole day defaut back to 1hr
      if (diffHours == 24) diffHours = 1;

      // The slider has moved passed the end of the day so reset to the start while maintaining the period
      setSelectedInterval({
        startDate: startDay,
        endDate: addHours(startDay, diffHours),
      });
    }
  };

  // set a interval timer to updated the selected interval
  useEffect(() => {
    if (!playing) return;
    // todo play back speed can be increased by decreasing the interval
    const id = setInterval(playTimeRange, 500);
    return () => clearInterval(id);
  }, [selectedInterval, playing]);

  const errorHandler = (update) => {
    setError(update.error);
  };

  const onChangeCallback = (updatedInterval) => {
    const dateRange = {
      startDate: updatedInterval[0],
      endDate: updatedInterval[1],
    };

    setSelectedInterval(dateRange);
  };

  // Fire change handler once on load to tell parent a default state
  useEffect(() => {
    onChangeCallback([selectedInterval.startDate, selectedInterval.endDate]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call parent with new range
  useEffect(() => {
    onTimeChanged(selectedInterval);
  }, [selectedInterval]);

  // const disabledIntervals = [
  //   {
  //     start: dateRange.startDate,
  //     end: addHours(dateRange.startDate, 1),
  //   },
  // ];
  return (
    <Grid container alignItems="center" justify="center" spacing={1}>
      <Grid item xs={11}>
        <TimeRangeSlider
          containerClassName="heatmapTimeSlider"
          error={error}
          ticksNumber={36}
          selectedInterval={[
            selectedInterval.startDate,
            selectedInterval.endDate,
          ]}
          timelineInterval={[dateRange.startDate, dateRange.endDate]}
          onUpdateCallback={errorHandler}
          onChangeCallback={onChangeCallback}
          step={3600000}
          // disabledIntervals={disabledIntervals}
        />
      </Grid>

      <Grid item xs={1}>
        <Button
          variant="outlined"
          onClick={() => {
            setPlaying(playing ? false : true);
          }}
        >
          {playing ? <StopCircleIcon /> : <PlayCircleIcon />}
        </Button>
      </Grid>
    </Grid>
  );
}

// Add propTypes
