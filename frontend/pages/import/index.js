import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { Importer, ImporterField } from "react-csv-importer";
import Box from "@mui/material/Box";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  DataGrid,
  GridEditInputCell,
  stopRowEditMode,
  DataGridProps,
  GridColumns,
  GridFilterModel,
  GridToolbar,
} from "@mui/x-data-grid";
import find from "lodash/find";
import { styled } from "@mui/material/styles";
import "react-csv-importer/dist/index.css";
import { Typography } from "@mui/material";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

export default function DataImport() {
  const [sheetData, setSheetData] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [invalidCells, setInvalidCells] = useState(new Set());

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const InvalidCell = styled("div")({
    border: "solid 1px red",
    // Other styles for invalid cells
  });

  const getCellComponent = (params) => {
    const rowError = find(validationErrors, { rowId: params.id });
    // debugger;
    // console.log("rowError", rowError);
    // console.log("invalidCells", invalidCells);
    // console.log("params", params);
    if (rowError && invalidCells.has(params.field)) {
      return <InvalidCell>{params.value}</InvalidCell>; // Use the styled component for invalid cells
    }
    return params.value; // Return default cell content if not invalid
  };

  const columns = [
    { field: "region", headerName: "Region", editable: true, width: 100 },
    {
      field: "reference_period",
      headerName: "Reference",
      editable: true,
      width: 130,
    },
    { field: "item", headerName: "Item", editable: true, width: 500 },
    { field: "item_code", headerName: "Item Code", editable: true, width: 100 },
    {
      field: "value",
      headerName: "Value",
      editable: true,
      width: 130,
    },
    {
      field: "date",
      headerName: "Date",
      editable: true,
      width: 130,
      preProcessEditCellProps: (params) => {
        const errorMessage = "This is a custom error message.";
        const row = params.row;
        row.date = params.props.value;
        // const valid = DataSchema.parse(row);
        console.log("row", row);
        try {
          const validatedData = DataSchema.parse(row);
          // debugger;

          // remove the object in errors that matches the rowId
          const errors = validationErrors.filter((error) => {
            return error.rowId !== params.id;
          });
          // debugger;
          setValidationErrors(errors);
          console.log("Data is valid:", validatedData);
          return { ...validatedData };
        } catch (error) {
          console.log(error);
          // debugger;
          error.rowId = params.id;
          // return { ...params.props, error: true };
          setInvalidCells(
            (prevInvalidCells) =>
              new Set([...prevInvalidCells, error.issues[0].path[0]])
          );
          //push new value to state validationErrors

          setValidationErrors([
            ...validationErrors,
            {
              rowId: row.id,
              error: error,
            },
          ]);
          // errors.push({ rowId: row.id, error: error });
          return false;
        }
      },
    },
    {
      field: "submissions",
      headerName: "Submissions",
      editable: true,
      width: 130,
    },
  ];

  const DataSchema = z.object({
    id: z.string(),
    region: z.string(),
    reference_period: z.string(),
    item: z.string(),
    item_code: z.string(),
    value: z.string().regex(/^\d+(\.\d+)?$/), // Validate as string with a numeric format
    date: z.string().regex(/^\d{8}$/), // Validate as string with an 8-digit format (YYYYMMDD)
    submissions: z.string(), // Parse as a string and convert to integer
    id: z.string(),
  });

  const generateRowId = () => {
    return "_" + Math.random().toString(36).substr(2, 9); // Simple random ID generator
  };
  console.log("validationErrors", validationErrors);
  return (
    <>
      <Typography variant="h4">Own funds</Typography>
      <p>
        These include items such as issued capital, reserves, retained earnings,
        and other instruments that contribute directly to the company's
        solvency.
      </p>

      <Importer
        dataHandler={async (rows) => {
          // required, receives a list of parsed objects based on defined fields and user column mapping;
          // may be called several times if file is large
          // (if this callback returns a promise, the widget will wait for it before parsing more data)
          const augmentedRows = rows.map((row) => ({
            ...row,
            id: generateRowId(),
          })); // Add IDs to rows
          console.log("received batch of rows", augmentedRows);
          // loop over augmentedRows and validate each row
          const errors = [];
          const validatedRows = augmentedRows.map((row) => {
            try {
              const validatedData = DataSchema.parse(row);
              setValidationErrors(errors);
              return validatedData;
            } catch (error) {
              console.error(error);
              setInvalidCells(
                (prevInvalidCells) =>
                  new Set([...prevInvalidCells, error.issues[0].path[0]])
              );
              errors.push({ rowId: row.id, error: error });
              return null;
            }
          });
          console.log("errors", errors);

          setValidationErrors(errors);
          setSheetData(augmentedRows);
          // console.log("validation rows", validatedRows);
          // console.log("validation errors", errors);
        }}
        chunkSize={10000} // optional, internal parsing chunk size in bytes
        defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
        restartable={false} // optional, lets user choose to upload another file when import is complete
        onStart={({ file, fields }) => {
          // optional, invoked when user has mapped columns and started import
          console.log("starting import of file", file, "with fields", fields);
        }}
        onComplete={({ file, fields }) => {
          // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
          console.log("finished import of file", file, "with fields", fields);
        }}
        onClose={() => {
          // optional, invoked when import is done and user clicked "Finish"
          // (if this is not specified, the widget lets the user upload another file)
          console.log("importer dismissed");
        }}
      >
        <ImporterField name="region" label="Region" />
        <ImporterField name="reference_period" label="Reference period" />
        <ImporterField name="item" label="Item" />
        <ImporterField name="item_code" label="Item Code" />
        <ImporterField name="value" label="Value" />
        <ImporterField name="date" label="Date of extraction" />
        <ImporterField name="submissions" label="Number of submissions" />
      </Importer>

      {sheetData && (
        <>
          {<div>Invalid cells: {validationErrors.length}</div>}
          <DataGrid
            rows={sheetData}
            columns={columns.map((col) => ({
              ...col,
              renderCell: getCellComponent,
            }))}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.id}
            // onRowEditStop={handleEditCellChange}

            // editMode="row"
            // getCellClassName={getCellClassName}
            // getRowClassName={getRowClassName}
            // onCellEditStop={handleCellEditCommit}
            // onCellEditStop={handleCellEditStop}
            // onCellModesModelChange={(model) => setCellModesModel(model)}
          />
        </>
      )}
    </>
  );
}
