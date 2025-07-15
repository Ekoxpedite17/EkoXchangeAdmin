import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Box
} from "@mui/material";

const timezones = [
  "UTC",
  "Africa/Lagos",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Asia/Dubai",
  "America/Los_Angeles",
];

export default function GeneralSettings() {
  const [appName, setAppName] = useState("EkoXchange");
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [maintenance, setMaintenance] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("Settings saved!");
    }, 1000);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          General Settings
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="App Name"
            value={appName}
            onChange={e => setAppName(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              label="Timezone"
              onChange={e => setTimezone(e.target.value)}
            >
              {timezones.map(tz => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch checked={maintenance} onChange={e => setMaintenance(e.target.checked)} />}
            label="Maintenance Mode"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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