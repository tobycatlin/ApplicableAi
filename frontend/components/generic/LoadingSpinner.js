import React from "react";

import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";

export default function LoadingSpinner(props) {
  return (
    <Grid
      sx={{
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      spacing={0}
      alignItems="center"
      justify="center"
      container
      {...props}
    >
      {props.message && <Typography gutterBottom> {props.message}</Typography>}
      <CircularProgress />
    </Grid>
  );
}
