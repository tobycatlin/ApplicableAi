import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

function Requirement({ fulfilled, text }) {
  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        {fulfilled ? (
          <CheckCircleIcon color="primary" />
        ) : (
          <HorizontalRuleIcon color="disabled" />
        )}
      </ListItemAvatar>
      <ListItemText primary={text} secondary={""} />
    </ListItem>
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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const error = router.query ? router.query.error : null;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),

    onSubmit: async (values, helpers) => {
      setErrorMessage("");

      const response = await fetch("/api/usersadmin/signup", {
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

  // if (status == "authenticated") {
  //   router.push("/");
  //   return null;
  // }
  const minLength = formik.values.password.length >= 8;
  const hasNumber = !!formik.values.password.match(/[\d]/);
  const hasUpper = !!formik.values.password.match(/[A-Z]/);
  const hasLower = !!formik.values.password.match(/[a-z]/);

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
        <Card
          elevation={5}
          sx={{ m: 2, p: 4, width: { xs: "80%", lg: "50%" } }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography component="h1" variant="h5" align="center">
              Create New User
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
              label="Full name"
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="email"
              disabled={success}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              autoComplete="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={success}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <List dense>
              <Requirement
                fulfilled={minLength}
                text="Contains at least 8 characters"
              />
              <Requirement
                fulfilled={hasNumber}
                text="Contains at least one number"
              />
              <Requirement
                fulfilled={hasUpper}
                text="Contains at least one uppercase letter"
              />
              <Requirement
                fulfilled={hasLower}
                text="Contains at least one lowercase letter"
              />
            </List>

            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={success}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {success && (
              <Alert severity="success">
                Your user account was created successfully.
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ my: 2 }}
              disabled={
                success ||
                !formik.isValid ||
                !formik.dirty ||
                !minLength ||
                !hasNumber ||
                !hasUpper ||
                !hasLower ||
                confirmPassword !== formik.values.password
              }
            >
              Request Account
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
