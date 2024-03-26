import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  handle_wrapper: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    WebkitTapHighlightColor: "#000",
    zIndex: 6,
    width: "24px",
    height: "24px",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  handle_container: {
    position: "absolute",
    display: "flex",
    transform: "translate(-50%, -50%)",
    zIndex: 4,
    width: "10px",
    height: "24px",
    borderRadius: "4px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
    backgroundColor: "#fff",
  },
  handle_container_disabled: { backgroundColor: "#666" },
  handle_marker: {
    width: "2px",
    height: "12px",
    margin: "auto",
    borderRadius: "2px",
    backgroundColor: "#62cb66",
    transition: "background-color 0.2s ease",
  },
  handle_marker_error: { backgroundColor: "#d6000b" },
}));

const Handle = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`;
  const classes = useStyles();

  // merge in styling if disabled or in error
  // if (disabled) {
  //   classes.handle_container = { ...classes.handle_marker_error };
  // }

  // if (error) {
  //   classes.handle_container = { ...classes.handle_container_disabled };
  // }

  return (
    <>
      <div
        className={classes.handle_wrapper}
        style={{ left: leftPosition }}
        {...getHandleProps(id)}
      ></div>
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={classes.handle_container} //disabled ? "__disabled" : ""
        style={{ left: leftPosition }}
      >
        <div
          className={classes.handle_marker} //${error ? "__error" : ""
        ></div>
      </div>
    </>
  );
};

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Handle.defaultProps = { disabled: false };

export default Handle;
