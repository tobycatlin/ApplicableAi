import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Box, Typography } from "@mui/material";
import { Card, CardHeader, CardContent } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { grey } from "@mui/material/colors";

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
  cardHeader: {},
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    // backgroundColor: "red",
    minHeight: "100%",
    padding: 0,
  },
}));

export default function ListTextCard(props) {
  const classes = useStyles();
  const { title, subheader, value, loading = false } = props;

  const listComponents = [];
  for (let index = 0; index < value.length; index++) {
    const element = value[index];
    listComponents.push(
      <Typography
        key={index}
        variant="body2"
        sx={{
          color: "text.primary",
        }}
      >
        {element}
      </Typography>
    );
  }

  return (
    <Grid
      item
      xs
      sx={{
        p: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        textAlign: "center",
        bgcolor: "background.paper",
        minWidth: 200,
      }}
    >
      {loading && <LinearProgress />}
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          fontWeight: 600,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {listComponents}
    </Grid>
  );
}
