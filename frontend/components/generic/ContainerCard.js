import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "@generic/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  card: {},
  cardHeader: {},
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "red",
    minHeight: "100%",
    padding: 0,
  },
}));

export default function ContainerCard(props) {
  const { children, title, height, loading, error } = props;
  const classes = useStyles();

  let content = <LoadingSpinner message={"Loading"} />;

  if (error) {
    content = <LoadingSpinner height="400px" message={"Error"} />;
  } else if (!loading && !error) {
    content = children;
  }

  return (
    <Card sx={{ height }}>
      {title && <CardHeader title={title} />}
      <CardContent className={classes.cardContent}>{content}</CardContent>
    </Card>
  );
}
