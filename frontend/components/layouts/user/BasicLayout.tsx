import { PropsWithChildren, useState } from "react";
import { Box, Container } from "@mui/material";
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

export default function BasicLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: "76px",
        }}
      >
        <Container maxWidth={"xl"}>{children}</Container>
      </Box>
    </>
  );
}
