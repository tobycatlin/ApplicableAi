import * as React from "react";
import useSWR from "swr";
import { useState, useEffect, useCallback } from "react";

import { Button, Box, Card, Paper, Typography } from "@mui/material";

import useFetch from "@lib/hooks/use-fetch";
import { useTheme } from "@mui/material/styles";
import TitleUnderlined from "@components/generic/TitleUnderlined";

export default function UploadFile() {
  const [filesData, setFilesData] = useState(false);

  async function uploadFile() {
    const values = {
      filename: `funds-${new Date().toISOString()}.csv`,
      filedata: "one,two,three",
    };

    const response = await fetch("/api/files/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log("uo", data);

    if (response.ok) {
      setFilesData({ success: true, error: "", data });
    } else {
      const { error } = await response.json();
      setFilesData({ success: false, error });
    }
  }

  // useEffect(() => {
  //   uploadFile();
  // }, []);
  //

  return (
    <>
      <TitleUnderlined>Upload</TitleUnderlined>

      <Button onClick={uploadFile} variant="contained" color="primary">
        Upload
      </Button>
      <div>File: {filesData.data?.etag}</div>
    </>
  );
}
