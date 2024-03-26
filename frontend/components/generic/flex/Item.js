import { useState } from "react";

import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },
});

const Item = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} {...props}>
      {props.children}
    </Box>
  );
};

Item.propTypes = {};

Item.defaultProps = {};

export default Item;
