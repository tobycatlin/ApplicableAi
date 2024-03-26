import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TitleUnderlined(props) {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      sx={{
        mb: 2,
        textDecoration: "underline",
        textUnderlineOffset: "8px",
        textDecorationThickness: "4px",
        textDecorationColor: theme.palette.secondary.main,
      }}
    >
      {props.children}
    </Typography>
  );
}
