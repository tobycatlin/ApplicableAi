import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useRouter } from "next/router";

type ApiStatus =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

interface RequirementProps {
  fulfilled: boolean;
  text: string;
}

function Requirement({ fulfilled, text }: RequirementProps) {
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

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>();

  const router = useRouter();
  const { email, token } = router.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .max(255)
        .required("Password is required")
        .matches(/[\d]/, "Must contain at least one number")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter"),
      confirmPassword: Yup.string(),
      // .required("Confirm password is required")
      // .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await fetch("/api/passwordreset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          password: values.password,
        }),
      });
      setIsLoading(false);

      if (response.ok) {
        setApiStatus({ success: true });
      } else {
        const { error } = await response.json();
        console.error(error);

        setApiStatus({ success: false, error });
      }
    },
  });

  const minLength = formik.values.password.length >= 8;
  const hasNumber = !!formik.values.password.match(/[\d]/);
  const hasUpper = !!formik.values.password.match(/[A-Z]/);
  const hasLower = !!formik.values.password.match(/[a-z]/);

  return (
    <>
      {isLoading && (
        <Box sx={{ width: "100%", position: "fixed" }}>
          <LinearProgress />
        </Box>
      )}

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          height: "100%",
          pt: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: -100,
          }}
        >
          <Image
            fill={true}
            src={`/images/auth-bg.jpg`}
            alt="Login background"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: 225, md: 300 },
            height: { xs: 150, md: 204 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/images/logo.svg`}
            alt="Logo"
            style={{ objectFit: "contain" }}
            fill={true}
          />
        </Box>

        <Card sx={{ p: 3, mx: 2, mb: 4, boxShadow: 12 }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", mx: { sm: 12 } }}
            >
              Reset password
            </Typography>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                (formik.touched.password && formik.errors.password) as string
              }
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <List dense>
              <Requirement
                fulfilled={minLength}
                text="Must be at least 8 characters"
              />
              <Requirement
                fulfilled={hasNumber}
                text="Contain at least one number"
              />
              <Requirement
                fulfilled={hasUpper}
                text="Contain at least one uppercase letter"
              />
              <Requirement
                fulfilled={hasLower}
                text="Contain at least one lowercase letter"
              />
            </List>

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword) as string
              }
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {apiStatus?.success === false && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {apiStatus.error}
              </Alert>
            )}
            {apiStatus?.success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Password has been reset
              </Alert>
            )}

            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
              disabled={
                !formik.isValid ||
                formik.values.password !== formik.values.confirmPassword ||
                apiStatus?.success
              }
            >
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </>
  );
}
