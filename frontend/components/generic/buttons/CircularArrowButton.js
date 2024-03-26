import React from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackwardIcon from "@material-ui/icons/ArrowBackwardIcon";

const useStyles = makeStyles({
  button: {
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    backgroundColor: "#e0e0e0",
  },
});

const CircularArrowButton = (direction = "forward") => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button}>
      <ArrowForwardIcon />
    </IconButton>
  );
};

export default CircularArrowButton;
