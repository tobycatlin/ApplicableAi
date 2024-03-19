"use client";
import { useState, useEffect } from "react";

import {
  Divider,
  Box,
  Typography,
  TextField,
  InputLabel,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Rating,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import TabSet from "../components/TabSet";
import Button from "@mui/material/Button";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  // useEffect();
  // useEffect(async () => {
  //   const image = await getImage();
  //   setImage(image.url);
  // }, []);

  const textboxStyle = {
    height: "100%",
    // "& .MuiInputBase-root": {
    //   height: "100%",
    // },
  };

  // Handle posting text to api
  const generateImage = async () => {
    setLoading(true);
    setError(false);
    // console.log(JSON.stringify({ prompt, context, baseCV }));

    const response = await fetch("/api/image", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        error: `Something went wrong - ${response.status} ${response.statusText}`,
      };
    }

    const image = await response.json();
    debugger;
    setImage(image.url);
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => generateImage()}>
        {loading ? "Loading..." : "Generate image"}
      </button>
      {image && <img className="image-result" src={image} alt="ai generated" />}
    </>
  );
}
