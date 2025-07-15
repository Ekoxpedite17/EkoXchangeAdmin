import React, { useState } from "react";
import { Box, Tabs, Tab, Card, Typography, Grid } from "@mui/material";
import GeneralSettings from "./components/GeneralSettings";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/NotificationSettings";
import APIIntegrations from "./components/APIIntegrations";
import UserRoleConfig from "./components/UserRoleConfig";
import LoggingAudit from "./components/LoggingAudit";

const tabSections = [
  { label: "General", component: <GeneralSettings /> },
  { label: "Security", component: <SecuritySettings /> },
  { label: "Notification", component: <NotificationSettings /> },
  { label: "API Integration", component: <APIIntegrations /> },
  { label: "User Role Config", component: <UserRoleConfig /> },
  { label: "Logging & Audit", component: <LoggingAudit /> },
];

export default function Settings() {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: "#f7f8fa", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Settings
      </Typography>
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
        <Grid item size={6}>
          {tabSections[tab].component}
        </Grid>
      </Grid>
    </Box>
  );
}
