import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Card> {
  label: string;
  value: string | number;
}

export default styled(({ label, value, ...props }: Props) => (
  <Card
    sx={{
      flex: 1,
      p: 1.5,
      textAlign: "center",
      border: 1,
      borderColor: "divider",
    }}
    {...props}
  >
    <Typography color="text.secondary" variant="overline">
      {label}
    </Typography>
    <Typography color="primary" variant="h3">
      {value}
    </Typography>
  </Card>
))``;
