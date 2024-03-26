import React from "react";
import { Box, Typography } from "@mui/material";

const ImageOverlay = ({ imageUrl, text, link }) => {
  const overlayStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  const textStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the alpha value for transparency
    padding: "15px",
    borderRadius: "5px",
  };

  return (
    <a href={link} style={{ textDecoration: "none" }}>
      <Box sx={overlayStyle}>
        <Box sx={textStyle}>
          <Typography variant="h4" color="primary">
            {text}
          </Typography>
        </Box>
      </Box>
    </a>
  );
};

export default ImageOverlay;
