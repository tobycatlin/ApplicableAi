import React from "react";
import { useTheme } from "@mui/material/styles";
import { Chip } from "@mui/material";

export default function StatusBar(props) {
  const {
    label,
    size = "medium",
    color = "default",
    variant = "outlined",
    status = null,
    sx = null,
  } = props;
  const theme = useTheme();

  //   DRAFT
  //   PENDING_UPLOAD
  //   PENDING_REVIEW
  //   CONFIRMED
  const renderChip =
    (status === "DRAFT" && (
      <Chip
        size="small"
        label={label}
        color="default"
        variant={variant}
        sx={sx}
      />
    )) ||
    (status === "PENDING_UPLOAD" && (
      <Chip
        size="small"
        label={label}
        color="success"
        variant={variant}
        sx={sx}
      />
    )) ||
    (status === "PENDING_REVIEW" && (
      <Chip
        size="small"
        label={label}
        color="success"
        variant={variant}
        sx={sx}
      />
    )) ||
    (status === "CONFIRMED" && (
      <Chip
        size="small"
        label={label}
        color="error"
        variant={variant}
        sx={sx}
      />
    ));

  return (
    renderChip || (
      <Chip size={size} label={label} color={color} variant={variant} />
    )
  );
}

{
  /* <StatusChip
payment={params.value}
label={params.value}
sx={{ mr: "24px", ml: "10px" }}
/> */
}
