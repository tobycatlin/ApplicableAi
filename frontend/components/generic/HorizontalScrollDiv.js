import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
  },
  content: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
});

const HorizontalScrollDiv = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}> {children}</div>
      </div>
    </>
  );
};

export default HorizontalScrollDiv;
