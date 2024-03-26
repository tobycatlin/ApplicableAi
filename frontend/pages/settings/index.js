import * as React from "react";

import { Box, Container, Paper, Typography } from "@mui/material";

import useFetch from "@lib/hooks/use-fetch";
import { useTheme } from "@mui/material/styles";
import TitleUnderlined from "@components/generic/TitleUnderlined";

export default function Settings() {
  const theme = useTheme();

  return (
    <>
      <TitleUnderlined>Settings</TitleUnderlined>
    </>
  );
}
