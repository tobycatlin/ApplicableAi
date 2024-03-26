import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
// import StaticDataPicker from "@components/generic/dates/StaticDataPicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { startOfQuarter, endOfQuarter } from "date-fns";
import UserDropDown from "@components/solve/UserDropDown";
import DatasetDropDown from "@components/solve/DatasetDropDown";
import TransferList from "@components/solve/TransferList";
import RedirectButton from "@components/generic/buttons/RedirectButton";

import UserTransferList from "@components/solve/UserTransferList";

export default function RunCreate() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const router = useRouter();

  const error = router.query ? router.query.error : null;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/datasets/list");
      const data = await response.json();

      setDatasets(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/list");
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      userList: [],
      datasetList: [],
      startDate: startOfQuarter(new Date()),
      endDate: endOfQuarter(new Date()),
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      description: Yup.string(),
      userList: Yup.array(),
      datsetList: Yup.array(),
      template: Yup.string(),
      startDate: Yup.date(),
      endDate: Yup.date(),
    }),

    onSubmit: async (values, helpers) => {
      setErrorMessage("");
      console.log("onSubmit", values);
      const response = await fetch("/api/runs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setErrorMessage("");
      }

      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
    },
  });

  // const handleChange = (event, name) => {
  // };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Create New Run
        </Typography>
      </Box>
      <Box
        component="form"
        method="post"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ width: "100%", maxWidth: "1024px" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Template name"
          name="name"
          autoComplete="name"
          autoFocus
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={success}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          helperText={formik.touched.description && formik.errors.description}
          label="Description"
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          autoComplete="description"
          disabled={success}
        />

        <Grid container>
          <Grid item xs={12}>
            <Typography type="title">Users</Typography>

            <UserTransferList
              fieldName="userList"
              users={users}
              form={formik}
              //for editing will need a way to pass current values
              //values={[]}
              // disabled={success}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography type="title">Datasets</Typography>

            {/* {datasets.length == 0 && (
              <Alert severity="error">
                No Datasets have been created.
                <RedirectButton url="/dataset/create" label="Create Dataset" />
              </Alert>
            )}
            {datasets.length > 0 && (
              <TransferList
                id_field="dataset_id"
                label_field="name"
                items={datasets}
              />
            )} */}
          </Grid>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container sx={{ marginTop: 10 }}>
            <Grid item>
              <Typography type="title" color="inherit">
                Start Date
              </Typography>

              <StaticDatePicker
                label="Start Date"
                name="startDate"
                // value={formik.values.startDate}
                // onChange={formik.handleChange}
                format="DD/MM/YYYY"
                value={formik.values.startDate}
                onChange={(value) =>
                  formik.setFieldValue("startDate", value, true)
                }
                // slots={{}}
                slotProps={{
                  actionBar: { actions: [] },
                  toolbar: { hidden: true },
                  textField: {
                    variant: "outlined",
                    error:
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate),
                    helperText:
                      formik.touched.startDate && formik.errors.startDate,
                  },
                }}
              />
            </Grid>

            <Grid item>
              <Typography type="title" color="inherit">
                End Date
              </Typography>

              <StaticDatePicker
                label="End Date"
                name="endDate"
                format="DD/MM/YYYY"
                value={formik.values.endDate}
                onChange={(value) =>
                  formik.setFieldValue("endDate", value, true)
                }
                slotProps={{
                  actionBar: { actions: [] },
                  toolbar: { hidden: true },
                  textField: {
                    variant: "outlined",
                    error:
                      formik.touched.endDate && Boolean(formik.errors.endDate),
                    helperText: formik.touched.endDate && formik.errors.endDate,
                  },
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {success && <Alert severity="success">Saved</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          // disabled={success || !formik.isValid || !formik.dirty}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
// todo make this global as signin also uses it
function getErrorMessage(error) {
  const msg = {
    Unauthorized:
      "Sorry. We could not log you on with these credentials. Please check your password.",
    "Not Found":
      "Sorry. We could not find an account with this email address. ",
    "Bad Request": "Sorry. Please provide both your email and password. ",
  };
  return msg[error] ?? "Sorry. an error occured.";
}
