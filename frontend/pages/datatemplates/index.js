import * as React from "react";
import useSWR from "swr";

import { Box, Card, Paper, Typography } from "@mui/material";

import useFetch from "@lib/hooks/use-fetch";
import { useTheme } from "@mui/material/styles";
import TitleUnderlined from "@components/generic/TitleUnderlined";
import RedirectButton from "@components/generic/buttons/RedirectButton";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DataTemplates() {
  const theme = useTheme();
  const { data, error } = useSWR("/api/datatemplates/list", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <TitleUnderlined>Data Templates</TitleUnderlined>
      <RedirectButton
        url="/datatemplates/create"
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
              DataTemplate {item.name}
            </AccordionSummary>
            <AccordionDetails>
              <p>{item.description}</p>
              {/* <pre>{item.template}</pre> */}
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
}
