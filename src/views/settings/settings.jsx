import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab, Card, Typography, Grid, Chip, Alert } from "@mui/material";
import GeneralSettings from "./components/GeneralSettings";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/NotificationSettings";
import RateManagementNotificationSettings from "./components/RateManagementNotificationSettings";
import APIIntegrations from "./components/APIIntegrations";
import UserRoleConfig from "./components/UserRoleConfig";
import LoggingAudit from "./components/LoggingAudit";
import AdBanner from "./components/AdBanner";

const tabSections = [
  { label: "General", component: <GeneralSettings /> },
  { label: "Security", component: <SecuritySettings /> },
  { label: "Notification", component: <NotificationSettings /> },
  { label: "Rate Management", component: <RateManagementNotificationSettings /> },
  { label: "API Integration", component: <APIIntegrations /> },
  { label: "User Role Config", component: <UserRoleConfig /> },
  { label: "Logging & Audit", component: <LoggingAudit /> },
  { label: "Ad banner", component: <AdBanner /> },
];

export default function Settings() {
  const [tab, setTab] = useState(0);
  const settings = useSelector((state) => state.settings);
  
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: "#f7f8fa", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Settings
      </Typography>
      
      {/* Debug Info - Shows that Redux is working */}
      {/* <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Redux State Active:</strong> Settings data is being managed by Redux and will persist across page refreshes.
          <br />
          <strong>Current App Name:</strong> {settings.general.appName} | 
          <strong>Timezone:</strong> {settings.general.timezone} | 
          <strong>Currency:</strong> {settings.general.currency} | 
          <strong>2FA Enabled:</strong> {settings.security.enforce2FA ? "Yes" : "No"}
        </Typography>
      </Alert> */}
      
      <Card
        sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3, mb: 3 }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {tabSections.map((section, idx) => (
            <Tab key={section.label} label={section.label} />
          ))}
        </Tabs>
      </Card>
      <Grid container spacing={3}>
        <Grid item size={8}>
          {tabSections[tab].component}
        </Grid>
      </Grid>
    </Box>
  );
}
