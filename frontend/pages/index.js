import * as React from "react";
import { useTheme } from "@mui/material/styles";
import BackgroundCover from "@components/BackgroundCover";

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <BackgroundCover />
    </>
  );
}
