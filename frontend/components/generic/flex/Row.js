import { useState } from "react";

import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

import Item from "./Item";

const Row = (props) => {
  const classes = useStyles();
  return (
    <Item className={classes.root} {...props}>
      {props.children}
    </Item>
  );
};

Row.propTypes = {};

Row.defaultProps = {};

export default Row;
