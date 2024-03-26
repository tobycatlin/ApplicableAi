import { PropsWithChildren, useState } from "react";
import { Cash as CashIcon } from "@icons/cash";
import { Home as HomeIcon } from "@icons/home";
import { ReceiptTax as ReceiptTaxIcon } from "@icons/receipt-tax";
import { ShoppingCart as ShoppingCartIcon } from "@icons/shopping-cart";
import { Camera as CameraIcon } from "@icons/camera";
import { Search as SearchIcon } from "@icons/search";
import { Lock as LockIcon } from "@icons/lock";
import { Users as UsersIcon } from "@icons/users";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import TuneIcon from "@mui/icons-material/Tune";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import Looks1Icon from "@mui/icons-material/LooksOne";
import Looks2Icon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useTheme } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

const sidebarSections = [
  {
    title: "General",
    items: [
      {
        title: "Overview",
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
    ],
  },

  {
    title: "Admin",
    items: [
      {
        title: "Users",
        path: "/users",
        icon: <AdminPanelSettingsIcon fontSize="small" />,
      },
      {
        title: "CV Builder",
        path: "/cv",
        icon: <AdminPanelSettingsIcon fontSize="small" />,
      },
      {
        title: "Jobs",
        path: "/jobs",
        icon: <AdminPanelSettingsIcon fontSize="small" />,
      },
    ],
  },

  {
    title: "Settings",
    items: [
      {
        title: "Settings",
        icon: <TuneIcon />,
        path: "/settings",
      },
    ],
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  // theme.palette.secondary.main
  return (
    <>
      <Navbar onSidebarOpen={() => setIsSidebarOpen(true)} />
      <Sidebar
        sections={sidebarSections}
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
          maxWidth: "100%",
          paddingTop: "77px",
          paddingLeft: { xs: 0, lg: "250px" },
        }}
      >
        <Paper
          sx={{
            margin: 2,
            padding: 2,
          }}
        >
          {children}
        </Paper>
      </Box>
    </>
  );
}
