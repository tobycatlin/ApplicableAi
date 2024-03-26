import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, Theme, useMediaQuery } from "@mui/material";
// import { Scrollbar } from "@components/scrollbar";
import { Item } from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { useTheme } from "@mui/material/styles";

export interface Section {
  title: string;
  items: Item[];
}

interface Props {
  onClose: () => void;
  open: boolean;
  sections: Section[];
}

export default function Sidebar({ sections, onClose, open }: Props) {
  const router = useRouter();
  const theme = useTheme();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    if (!router.isReady) return;

    if (open) {
      onClose();
    }
  }, [router.isReady, router.asPath]);

  const content = (
    <>
      {/* <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      > */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              path={router.asPath}
              sx={{
                mt: 4,
                "& + &": {
                  mt: 2,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748", // dark divider
          }}
        />
      </Box>
      {/* </Scrollbar> */}
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 250,
            top: 64,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.600",
          color: "#FFFFFF",
          width: 250,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
