import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

const getTrackConfig = ({ error, source, target, disabled }) => {
  const basicStyle = {
    left: `${source.percent}%`,
    width: `calc(${target.percent - source.percent}% - 1px)`,
  };

  if (disabled) return basicStyle;

  const coloredTrackStyle = error
    ? {
        backgroundColor: "rgba(214,0,11,0.5)",
        borderLeft: "1px solid rgba(214,0,11,0.5)",
        borderRight: "1px solid rgba(214,0,11,0.5)",
      }
    : {
        backgroundColor: "rgba(98, 203, 102, 0.5)",
        borderLeft: "1px solid #62CB66",
        borderRight: "1px solid #62CB66",
      };

  return { ...basicStyle, ...coloredTrackStyle };
};

const useStyles = makeStyles((theme) => ({
  range_track: {
    position: "absolute",
    transform: "translate(0%, -50%)",
    height: "50px",
    cursor: "pointer",
    transition: "background-color 0.15s ease-in-out, border-color 0.15s ease",
    zIndex: 3,
  },

  range_track_disabled: {
    zIndex: 1,
    borderLeft: "1px solid #c8cacc",
    borderRight: "1px solid #c8cacc",
  },
}));

const Track = ({ error, source, target, getTrackProps, disabled }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.range_track}
      style={getTrackConfig({ error, source, target, disabled })}
      {...getTrackProps()}
    ></div>
  );
};

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Track.defaultProps = { disabled: false };

export default Track;
