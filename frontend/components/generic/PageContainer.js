import React from "react";
import { makeStyles } from "@mui/styles";
// MUI
import { Container } from "@mui/material";

const useStyles = makeStyles({
  root: {
    // marginTop: 4,
  },
});

export default function PageContainer(props) {
  const classes = useStyles();

  return (
    <Container sx={{ mt: 3 }} id="pageContainer" maxWidth="xl">
      {props.children}
    </Container>
  );
}
