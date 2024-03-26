import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  keyboard_handle: {
    position: "absolute",
    marginTop: "20px",
    width: "1px",
    height: "5px",
    backgroundColor: "#c8cacc",
    zIndex: 2,
  },
}));

const KeyboardHandle = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => {
  const classes = useStyles();
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={classes.keyboard_handle}
      style={{
        left: `${percent}%`,
        backgroundColor: disabled ? "#666" : "#ffc400",
      }}
      {...getHandleProps(id)}
    />
  );
};

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

KeyboardHandle.defaultProps = { disabled: false };

export default KeyboardHandle;
