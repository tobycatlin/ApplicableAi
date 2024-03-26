import { useRef, useState } from "react";
import getConfig from "next/config";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { styled } from "@mui/system";
import { Menu as MenuIcon } from "@icons/menu";
import { UserCircle as UserCircleIcon } from "@icons/user-circle";
import BlockIcon from "@mui/icons-material/Block";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LightModeIcon from "@mui/icons-material/LightMode";
import rootStore from "@lib/store/rootStore";
import NavbarAccountPopover from "./NavbarAccountPopover";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import SearchBox from "./SearchBox";
interface Props {
  onSidebarOpen?: () => void;
  [x: string]: any;
}

const RangeNavbarRoot = styled(AppBar)(({ theme }) =>
  theme.palette.mode === "light"
    ? {
        boxShadow: (theme.shadows as string[])[3],
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: theme.palette.background.navbar,
        // backgroundColor: "#474747",
        // color: "#FFFFFF",
      }
    : {
        backgroundColor: theme.palette.background.navbar,

        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }
);

const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const { data: session, status } = useSession();

  // const user = {
  //   avatar: session.user.image,
  //   name: session.user.name,
  // };

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
        >
          {session && <UserCircleIcon fontSize="small" />}
          {!session && <BlockIcon fontSize="small" />}
          {/* <UserCircleIcon fontSize="small" /> */}
        </Avatar>
      </Box>

      <NavbarAccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
const ThemeToggle = observer(() => (
  <Tooltip title={toTitleCase(rootStore.theme.mode) + " Theme"}>
    <IconButton sx={{ ml: 1 }} onClick={rootStore.theme.toggle} color="inherit">
      {rootStore.theme.mode === "dark" ? (
        <DarkModeIcon fontSize="large" color="secondary" />
      ) : (
        <LightModeIcon fontSize="large" color="secondary" />
      )}
    </IconButton>
  </Tooltip>
));

export default function RangeNavbar({ onSidebarOpen, ...props }: Props) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const config = publicRuntimeConfig;

  return (
    <>
      <RangeNavbarRoot
        sx={{
          left: {
            lg: 0,
          },
          width: {
            lg: "100%",
          },
        }}
        {...props}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            py: 1,
            pl: "26px",
          }}
        >
          {onSidebarOpen && (
            <IconButton
              onClick={onSidebarOpen}
              sx={{
                display: {
                  xs: "inline-flex",
                  lg: "none",
                },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}

          <NextLink
            href="/"
            passHref
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image width="180" height="60" alt="App logo" src={config.logo} />
          </NextLink>

          <Box sx={{ flexGrow: 1 }} />
          <SearchBox />

          <ThemeToggle />
          <AccountButton />
        </Toolbar>
      </RangeNavbarRoot>
    </>
  );
}
