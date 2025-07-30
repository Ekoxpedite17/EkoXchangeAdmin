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
  Box,
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
  const [currency, setCurrency] = useState("NGN");
  const [language, setLanguage] = useState("en");
  const [logo, setLogo] = useState(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved!");
    }, 1000);
  };

  const handleLogoUpload = (e) => {
    if (e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          General Settings
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="App Name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Default Currency</InputLabel>
            <Select
              value={currency}
              label="Default Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="NGN">NGN</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Default Language</InputLabel>
            <Select
              value={language}
              label="Default Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Upload Logo
            </Typography>
            <Button variant="outlined" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleLogoUpload}
              />
            </Button>
            {logo && (
              <Box mt={1}>
                <Typography variant="caption">{logo.name}</Typography>
              </Box>
            )}
          </Box>
          {/* End new fields */}
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={maintenance}
                onChange={(e) => setMaintenance(e.target.checked)}
              />
            }
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
