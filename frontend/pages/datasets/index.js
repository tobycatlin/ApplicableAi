import * as React from "react";
import useSWR from "swr";

import { Box, Card, Paper, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

import useFetch from "@lib/hooks/use-fetch";
import { useTheme } from "@mui/material/styles";
import TitleUnderlined from "@components/generic/TitleUnderlined";
import RedirectButton from "@components/generic/buttons/RedirectButton";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import DataImport from "@components/solve/DataImport";
import StatusChip from "@components/solve/StatusChip";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DataSets() {
  const theme = useTheme();
  const { data, error } = useSWR("/api/datasets/list", fetcher);
  const [sheetData, setSheetData] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [invalidCells, setInvalidCells] = useState(new Set());

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const ownFunds = [
    {
      key: "id",
      type: "string",
      label: "Row identifier",
    },
    {
      key: "region",
      type: "string",
      label: "Region EEA or EFTA",
    },
    {
      key: "reference_period",
      type: "string",
      label: "Reference period - Year & Quarter",
    },
    {
      key: "item",
      type: "string",
      label: "Item name",
    },
    {
      key: "item_code",
      type: "string",
      label: "Item Code",
    },
    {
      key: "value",
      type: "number",
      label: "Value of fund in GBP",
    },
    {
      key: "date",
      type: "date",
      label: "Date of extraction (yyyymmdd)",
    },
    {
      key: "submissions",
      type: "number",
      label: "Count of submissions",
    },
  ];
  // {
  //   id: z.string(),
  //   region: z.string(),
  //   reference_period: z.string(),
  //   item: z.string(),
  //   item_code: z.string(),
  //   value: z.string().regex(/^\d+(\.\d+)?$/), // Validate as string with a numeric format
  //   date: z.string().regex(/^\d{8}$/), // Validate as string with an 8-digit format (YYYYMMDD)
  //   submissions: z.string(), // Parse as a string and convert to integer
  //   id: z.string(),
  // }

  return (
    <>
      <TitleUnderlined>DataSets</TitleUnderlined>

      <RedirectButton
        url="/datasets/create"
        label="Create New"
        sx={{ marginBottom: 2 }}
      />

      {data.map((item, index) => (
        <>
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={item.id}
              sx={{ border: 1, borderColor: "grey", borderRadius: 1 }}
            >
              Dataset: {item.name}
              <StatusChip
                status={item.status}
                label={item.status}
                sx={{ mr: "24px", ml: "10px" }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <DataImport fields={ownFunds} />
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
}
