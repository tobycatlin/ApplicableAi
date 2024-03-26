import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { PropsWithChildren, ReactNode, useState } from "react";


type BoxProps = Parameters<typeof Box>[0];

interface TabPanelProps extends BoxProps {
  index: number;
  value: number;
}

function TabPanel(props: PropsWithChildren<TabPanelProps>) {
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

interface Tab {
  label: string;
  component: ReactNode;
}

interface Props extends BoxProps {
  tabs: Tab[];
}

export default function TabSet({ tabs, ...props }: PropsWithChildren<Props>) {
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
