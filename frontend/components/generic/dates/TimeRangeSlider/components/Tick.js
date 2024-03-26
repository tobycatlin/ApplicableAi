import { getMinutes } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tick_marker: {
    position: "absolute",
    marginTop: "20px",
    width: "1px",
    height: "5px",
    backgroundColor: "#c8cacc",
    zIndex: 2,
  },

  // Would be nice to merge in tick_marker and add the extra rules
  // how do you merge styles?
  tick_marker_large: {
    position: "absolute",
    marginTop: "20px",
    width: "1px",
    height: "5px",
    backgroundColor: "#c8cacc",
    zIndex: 2,
    marginTop: "15px",
    height: "10px",
  },

  tick_label: {
    position: "absolute",
    marginTop: "28px",
    fontSize: "10px",
    textAlign: "center",
    zIndex: 2,
    color: "#77828c",
    fontFamily: "sans-serif",
  },
}));

const Tick = ({ tick, count, format }) => {
  const classes = useStyles();
  const isFullHour = !getMinutes(tick.value);

  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  };

  return (
    <>
      <div
        // className={`react_time_range__tick_marker${
        //   isFullHour ? "__large" : ""
        // }`}
        className={isFullHour ? classes.tick_marker_large : classes.tick_marker}
        style={{ left: `${tick.percent}%` }}
      ></div>

      {isFullHour && (
        <div className={classes.tick_label} style={tickLabelStyle}>
          {format(tick.value)}
        </div>
      )}
    </>
  );
};

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
};

Tick.defaultProps = { format: (d) => d };

export default Tick;
