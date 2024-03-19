import "@fontsource/roboto-mono";
import "./globals.css";
import ThemeRegistry from "../utils/ThemeRegistry";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HiveIcon from "@mui/icons-material/Hive";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ArticleIcon from "@mui/icons-material/Article";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export const metadata = {
  title: "AI Prompt Tool",
  description: "AI CV Prompt Tool open.ai",
};

const DRAWER_WIDTH = 150;

const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  { text: "Generate", href: "/tool", icon: PlumbingIcon },
  { text: "Docs", href: "/doc", icon: ArticleIcon },
  { text: "Prompt examples", href: "/prompts", icon: LightbulbIcon },
];

const PLACEHOLDER_LINKS = [
  { text: "Settings", icon: SettingsIcon },
  { text: "Support", icon: SupportIcon },
  { text: "Logout", icon: LogoutIcon },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <ThemeRegistry options={{ key: "mui-theme" }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: 2000,
            }}
          >
            <Toolbar
              sx={{
                background:
                  "linear-gradient(-135deg, #00bcd4 40%, #004d9e 95%)", // Your gradient colors here
                transition: "background 0.5s ease-in-out",
                textShadow: "2px 4px 4px rgba(46,91,173,0.6)",
                fontSize: "2rem",

                // backgroundColor: "background.paper",
              }}
            >
              <HiveIcon
                sx={{
                  fontSize: 50,
                  color: "#00bcd4",
                  mr: 2,
                  transform: "translateY(-2px)",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{
                  textShadow: "2px 4px 4px rgba(46,91,173,0.6)",
                  fontSize: "2rem",
                  // backgroundColor: "background.paper",
                }}
              >
                AI CV Prompt Tool
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                top: ["48px", "56px", "64px"],
                height: "auto",
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: "auto" }} />
            {/* <List>
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */}
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              ml: `${DRAWER_WIDTH}px`,
              mt: ["48px", "56px", "64px"],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
