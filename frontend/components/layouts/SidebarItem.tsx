import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import { ChevronDown as ChevronDownIcon } from "@icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "@icons/chevron-right";
import Head from "next/head";
import Link from "next/link";

export interface Item {
  active?: boolean;
  children?: Item[];
  chip?: React.ReactNode;
  depth?: number;
  icon?: React.ReactNode;
  info?: string;
  open?: boolean;
  path: string;
  title: string;
  disabled?: boolean;
}

interface Props {
  active?: boolean;
  children?: React.ReactNode;
  chip?: React.ReactNode;
  depth?: number;
  icon?: React.ReactNode;
  info?: string;
  open?: boolean;
  path: string;
  title: string;
  disabled?: boolean;
}

export default function SidebarItem({
  active = true,
  children,
  chip,
  depth,
  icon,
  info,
  open: propOpen = false,
  path,
  title,
  disabled,
  ...other
}: Props) {
  const [open, setOpen] = useState(propOpen);

  let paddingLeft = 24;

  if (depth !== undefined && depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "block",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...other}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronDownIcon fontSize="small" />
            )
          }
          disableRipple
          onClick={() => setOpen(!open)}
          startIcon={icon}
          disabled={disabled}
          sx={{
            color: active ? "secondary.main" : "neutral.300",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "& .MuiButton-endIcon": {
              color: "neutral.400",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <>
      {active && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          // px: 2,
        }}
      >
        <Button
          size={depth! > 0 ? "small" : "medium"}
          component={Link}
          href={path}
          startIcon={icon}
          endIcon={chip}
          disableRipple
          disabled={disabled}
          sx={{
            paddingLeft: 3,
            // border: "1px solid red",
            borderRadius: 2,
            borderTopLeftRadius: 0,

            borderBottomLeftRadius: 0,
            color: "primary.contrastText",
            justifyContent: "flex-start",
            // pl: `${paddingLeft}px`,
            // pr: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            // backgroundColor: "primary.main",
            ...(active && {
              backgroundColor: "primary.main",
              color: "primary.light",
              fontWeight: "fontWeightBold",
            }),
            "& .MuiButton-startIcon": {
              color: active ? "secondary.dark" : "primary.dark",
            },
            "& .MuiButton-startIcon:hover": {
              // color: active ? "secondary.light" : "primary.light",
              backgroundColor: "secondary.main",
            },
            ...(disabled && {
              "*": {
                color: "neutral.500",
              },
              bgcolor: "rgb(0,0,0,0.1)",
            }),
            "&:hover": {
              color: "secondary.contrastText",
              backgroundColor: "secondary.main",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
      </ListItem>
    </>
  );
}
