import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//checkoout
// https://stackworx.github.io/formik-mui/docs/guide/getting-started
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function DatasetCreate() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  // setSuccess(false);
  const router = useRouter();

  const error = router.query ? router.query.error : null;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      hash: "",
      datatemplate_id: "",
      users: [],
    },

    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      description: Yup.string(),
      hash: Yup.string(),
      datatemplate_id: Yup.number(),
    }),

    onSubmit: async (values, helpers) => {
      setErrorMessage("");
      values["hash"] = "1223422";

      const response = await fetch("/api/datasets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        // setSuccess(true);
        setErrorMessage("");
      }

      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
    },
  });

  return (
    <>
      <Box
        sx={{
          pt: { xs: 1, sm: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Create New Dataset
          </Typography>
        </Box>
        <Box
          component="form"
          method="post"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Dataset name"
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

          <InputLabel id="demo-simple-select-label">DataTemplate</InputLabel>
          <Select
            label="DataTemplate"
            id="datatemplate_id"
            name="datatemplate_id"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.datatemplate_id}
          >
            <MenuItem value={1}>OurFunds DataTemplate</MenuItem>
            <MenuItem value={2}>BalanceSheet DataTemplate</MenuItem>
          </Select>

          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="users-label"
            id="users"
            name="users"
            multiple
            value={formik.values.users}
            onChange={formik.handleChange}
            input={<OutlinedInput label="Users" />}
            // MenuProps={MenuProps}
          >
            {names.map((name, index) => (
              <MenuItem
                key={index}
                value={index}
                // style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              multiline
              minRows={5}
              error={Boolean(formik.touched.template && formik.errors.template)}
              helperText={formik.touched.template && formik.errors.template}
              label="Template"
              name="template"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.template}
              autoComplete="template"
              disabled={success}
            /> */}

          {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          {success && <Alert severity="success">Saved</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
            disabled={success || !formik.isValid || !formik.dirty}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}
