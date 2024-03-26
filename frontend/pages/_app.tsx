import { ReactNode, useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AdminLayout from "@components/layouts/admin/AdminLayout";
import UserLayout from "@components/layouts/user/UserLayout";
import BasicLayout from "@components/layouts/user/BasicLayout";
import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import rootStore from "@lib/store/rootStore";
import { observer } from "mobx-react-lite";
import {
  Box,
  responsiveFontSizes,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import Head from "next/head";
import LoadingSpinner from "@generic/LoadingSpinner";
import getConfig from "next/config";

import { Router } from "next/router";
import baseThemeOptions from "@lib/theme/BaseTheme";
import lightThemeOptions from "@lib/theme/LightTheme";
import darkThemeOptions from "@lib/theme/DarkTheme";

import "@fontsource/kanit";
import "./global.css";

export default observer(function App({
  Component,
  router,
  pageProps,
}: AppProps) {
  const { serverRuntimeConfig, publicRuntimeConfig: config } = getConfig();

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDarkMode = false;
  let mode;
  if (rootStore.theme.mode === "system") {
    mode = prefersDarkMode ? "dark" : "light";
  } else {
    mode = rootStore.theme.mode;
  }
  // const mode = "light";

  useEffect(() => rootStore.theme.load(), []);

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          baseThemeOptions,
          mode === "light" ? lightThemeOptions : darkThemeOptions
        )
      ),
    [mode]
  );

  return (
    <>
      <Head>
        <title>{config.app_title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CurrentLayout router={router}>
            <Component {...pageProps} />
          </CurrentLayout>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
});

/**
 * This is a wrapper component that will render the
 * correct layout based on the current session.
 */
function CurrentLayout({
  children,
  router,
}: {
  children: ReactNode;
  router: Router;
}) {
  const { data, status, ...other } = useSession();

  // if (typeof window !== "undefined" && status !== "authenticated") {
  //   router.replace("/auth/signin");
  //   // router.push("/auth/signin", undefined, { shallow: true });

  //   return null;
  // }
  // console.log(data, status, other);

  // const noLayoutPaths = new RegExp("^/(public|auth)", "i");
  // if (noLayoutPaths.test(router.pathname)) {
  //   return <>{children}</>;
  // }
  return <AdminLayout>{children}</AdminLayout>;
}
