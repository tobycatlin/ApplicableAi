import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

interface Props extends React.ComponentPropsWithoutRef<typeof Container> {
  title?: string;
  description?: ReactNode;
  /**
   * Name of the sidebar section group this page belongs to.
   */
  collection?: string;
  /**
   * Takes precedence over `title` for the page title. Defaults to use `title` prop.
   */
  pageTitle?: string;
  children: ReactNode;
}

export default function Main({
  children,
  title,
  description,
  collection,
  pageTitle,
  sx,
  ...props
}: Props) {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: 8, ...sx }} {...props}>
      <Head>
        <title>{`${pageTitle ?? title}`}</title>
      </Head>

      {(collection || title || description) && (
        <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
          {collection && (
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}
            >
              {collection}
            </Typography>
          )}

          {title && (
            <Typography variant="h3" sx={{ lineHeight: 1, mb: 1 }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="subtitle1" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}

      {children}
    </Container>
  );
}
