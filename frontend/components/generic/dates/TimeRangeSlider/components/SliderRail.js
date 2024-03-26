import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  rail_outer: {
    position: "absolute",
    width: "100%",
    height: "50px",
    transform: "translate(0%, -50%)",
    cursor: "pointer",
  },

  rail_inner: {
    position: "absolute",
    width: "100%",
    height: "50px",
    transform: "translate(0%, -50%)",
    pointerEvents: "none",
    backgroundColor: "#f5f7fa",
    borderBottom: "1px solid #c8cacc",
  },
}));

export const SliderRail = ({ getRailProps }) => {
  const classes = useStyles();
  return (
    <>
      <div id="outer" className={classes.rail_outer} {...getRailProps()}></div>
      <div id="inner" className={classes.rail_inner}></div>
    </>
  );
};

SliderRail.propTypes = { getRailProps: PropTypes.func.isRequired };

export default SliderRail;
