import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      key={index}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

export default function TabSet({ tabs, ...props }) {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(_, val) => setValue(val)}>
          {tabs.map((tab, index) => (
            <Tab key={index} id={index.toString()} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel {...props} key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
