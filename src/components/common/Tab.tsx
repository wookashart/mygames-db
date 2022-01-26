import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Tab, Tabs } from '@mui/material';
// import { Tabs } from '@material-ui/core';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CustomTabProps {
  tabs: TabsData[];
}

interface TabsData {
  header: string;
  content: string | React.ReactChild | React.ReactNode;
  disabled?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const CustomTab = ({ tabs }: CustomTabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={(e, value) => handleChange(e as React.SyntheticEvent, value)}
          aria-label="custom tab"
          centered
          textColor="primary"
          indicatorColor="primary"
          scrollButtons="auto"
          variant="fullWidth"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.header}
              {...a11yProps(index)}
              sx={{ color: customColors.textLight }}
              disabled={tab.disabled ? true : false}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CustomTab;
