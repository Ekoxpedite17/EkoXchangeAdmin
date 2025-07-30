import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

export default function LoggingAudit() {
  const [filter, setFilter] = useState({ date: "", user: "", ip: "" });
  const [alertSuspicious, setAlertSuspicious] = useState(false);
  // Mock log data covering both login and action logs
  const [logData, setLogData] = useState([
    {
      type: "login",
      ip: "192.168.1.1",
      device: "Chrome",
      user: "admin@example.com",
      time: "2025-07-30 08:00",
    },
    {
      type: "login",
      ip: "10.0.0.2",
      device: "Safari",
      user: "admin@example.com",
      time: "2025-07-30 08:05",
    },
    {
      type: "action",
      action: "Approved withdrawal #123",
      user: "admin@example.com",
      time: "2025-07-30 08:10",
    },
    {
      type: "action",
      action: "Disabled user account",
      user: "mod@example.com",
      time: "2025-07-30 08:12",
    },
  ]);
  const [activityLogs, setActivityLogs] = useState(true);
  const [retention, setRetention] = useState(30);
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("Logging & audit settings saved!");
    }, 1000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      // Here you would trigger log export
      alert("Logs exported to CSV!");
    }, 1500);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Logging & Audit
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={activityLogs}
                onChange={(e) => setActivityLogs(e.target.checked)}
              />
            }
            label="Enable Activity Logs"
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertSuspicious}
                onChange={(e) => setAlertSuspicious(e.target.checked)}
              />
            }
            label="Alert on Suspicious Activity"
          />
          <TextField
            label="Log Retention Period (days)"
            type="number"
            value={retention}
            onChange={(e) => setRetention(Number(e.target.value))}
            inputProps={{ min: 1, max: 3650 }}
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Filter by Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              fullWidth
            />
            <TextField
              label="Filter by User"
              value={filter.user}
              onChange={(e) => setFilter({ ...filter, user: e.target.value })}
              fullWidth
            />
            <TextField
              label="Filter by IP"
              value={filter.ip}
              onChange={(e) => setFilter({ ...filter, ip: e.target.value })}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Activity Logs
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 2,
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              {logData.map((log, idx) => (
                <Typography key={idx} variant="body2">
                  {log.time} -{" "}
                  {log.type === "login"
                    ? `Login by ${log.user} from ${log.device} (${log.ip})`
                    : `${log.user} - ${log.action}`}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleExport}
              disabled={exporting}
              startIcon={exporting ? <CircularProgress size={18} /> : null}
            >
              {exporting ? "Exporting..." : "Export Logs"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
