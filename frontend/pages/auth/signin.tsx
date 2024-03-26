import { getCsrfToken, useSession, signIn } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import { Alert, IconButton, Input, InputAdornment } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const errorMessages: Record<string, string> = {
  Unauthorized: "Failed to log in. Please check your password.",
  "Not Found": "We could not find an account with this username or email.",
  "Unverified account":
    "Your account requires verification, please contact support.",
  CredentialsSignin:
    "Sorry. We could not log you on with these credentials. Please check your password.",
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // export default function SignIn() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  async function signInClick() {
    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (response === undefined) {
      setError("Invalid credentials");
      return;
    }

    if (response.ok) return;

    const error = errorMessages[response.error ?? ""] ?? "An error occured.";
    setError(error);
  }

  return (
    <>
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
          alt="Login"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          pt: { xs: 1, sm: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: 150, sm: 300 },
            height: { xs: 102, sm: 204 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/images/optimoveLogoLight.svg`}
            alt="Logo"
            style={{ objectFit: "contain" }}
            fill={true}
          />
        </Box>

        <Card
          id="login-card"
          elevation={5}
          sx={{
            m: 2,
            p: 4,
            width: { xs: "60%", lg: "50%" },

            // backgroundColor: "white",
            // opacity: 0.8,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Input type="hidden" name="csrfToken" value={csrfToken} />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="username"
              autoComplete="username"
              autoFocus
              variant="outlined"
              // color="primary"
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              variant="outlined"
              color="primary"
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onKeyDown={(e) => e.key === "Enter" && signInClick()}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 2 }}
              onClick={signInClick}
              disabled={!username || !password}
            >
              Sign In
            </Button>
          </Box>

          <NextLink href="/auth/signup" passHref legacyBehavior>
            <Link color="primary" variant="subtitle2">
              Request new account
            </Link>
          </NextLink>
        </Card>
      </Box>
    </>
  );
}
