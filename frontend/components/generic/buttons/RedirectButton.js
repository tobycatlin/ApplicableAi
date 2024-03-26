import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router"; // Import useRouter from Next.js

export default function RedirectButton({ url, label, sx = {} }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url); // Redirect to the specified URL
  };

  return (
    <Button variant="contained" onClick={handleClick} sx={{ ...sx }}>
      {label}
    </Button>
  );
}
