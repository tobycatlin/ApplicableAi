import { useState } from "react";

import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    // justifyContent: "center",
  },
});

import Item from "./Item";

const Column = (props) => {
  const classes = useStyles();
  return (
    <Item className={classes.root} {...props}>
      {props.children}
    </Item>
  );
};

Column.propTypes = {};

Column.defaultProps = {};

export default Column;
