import { PropsWithChildren, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../Navbar";
import StatusBar from "@components/basic/StatusBar";

const sidebarSections = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
    ],
  },
];

export default function UserLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        {children}
      </Box>
    </>
  );
}
