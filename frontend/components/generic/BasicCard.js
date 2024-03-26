import React from "react";
import { makeStyles } from "@mui/styles";
import { Card } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    // padding: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: 5,
    transition: "0.4s",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    marginBottom: theme.spacing(1),
  },
}));

export default function BasicCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card} {...props}>
      {props.children}
    </Card>
  );
}
