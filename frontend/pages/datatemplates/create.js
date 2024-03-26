import { useState } from "react";

import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  useFormik,
  FieldArray,
  FormikProvider,
  Field,
  Form,
  ErrorMessage,
} from "formik";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function DataTemplateCreate() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [addField, setAddField] = useState(false);
  const [addValue, setAddValue] = useState(false);
  const [addType, setAddType] = useState(false);

  const router = useRouter();

  const error = router.query ? router.query.error : null;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      template: "",
      fields: [
        {
          field: "id",
          value: "122334",
          type: "string",
        },
      ],
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      description: Yup.string(),
      template: Yup.string(),
    }),

    onSubmit: async (values, helpers) => {
      setErrorMessage("");

      const response = await fetch("/api/datatemplates/create", {
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
        setSuccess(true);
        setErrorMessage("");
      }

      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
    },
  });

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Create New Data Template
        </Typography>
      </Box>
      <Box
        component="form"
        method="post"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ width: "100%" }}
      >
        <FormikProvider value={formik}>
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

          <TextField
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
          />
          <FieldArray
            name="fields"
            render={(arrayHelpers) => (
              <div>
                <TextField
                  id="name"
                  label="Outlined"
                  variant="outlined"
                  onChange={(event) => setAddField(event.target.value)}
                />

                <TextField
                  id="value"
                  label="Outlined"
                  variant="outlined"
                  onChange={(event) => setAddValue(event.target.value)}
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addType}
                  onChange={(event) => setAddType(event.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>

                <button
                  onClick={() => {
                    arrayHelpers.push({
                      field: addField,
                      value: addValue,
                      type: addType,
                    });
                  }}
                >
                  add
                </button>

                <div>
                  {formik.values.fields.map(({ field, value, type }, index) => (
                    <div key={index}>
                      <TextField
                        margin="normal"
                        name="field"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={field}
                      />
                      <TextField
                        margin="normal"
                        name="value"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={value}
                      />

                      <TextField
                        margin="normal"
                        name="type"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={type}
                      />
                      {/* <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                      >
                        delete
                      </button> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

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
        </FormikProvider>
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
