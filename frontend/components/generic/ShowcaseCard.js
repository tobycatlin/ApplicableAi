import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Avatar,
} from "@mui/material";

import Row from "./flex/Row";
import Column from "./flex/Column";
import Item from "./flex/Item";
import BasicCard from "./BasicCard";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderLeft: "1px solid",
    borderColor: theme.palette.divider,
  },
}));

export const ShowcaseCard = React.memo(function ShowcaseCard(props) {
  const classes = useStyles();

  return (
    <BasicCard>
      <Row justifyContent="space-between">
        <Column flexGrow="1">
          <Row justifyContent="space-between" p={1}>
            <Column>
              <Item>{props.leftHeader}</Item>
            </Column>
            <Column>
              <Item>{props.rightHeader}</Item>
            </Column>
          </Row>

          <Row px={1}>
            <Item>{props.title}</Item>
          </Row>
          <Row p={1}>
            <Item>{props.content}</Item>
          </Row>
        </Column>

        {props.button && (
          <Column className={classes.button}>
            <Item justifyContent="center" alignItems="center" height={"100%"}>
              {props.button}
            </Item>
          </Column>
        )}
      </Row>
    </BasicCard>
  );
});
export default ShowcaseCard;
