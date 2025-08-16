import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Alert,
} from "@mui/material";
import { EkoServices_Settings } from "../../../services";
import {
  setGeneralSettings,
  setGeneralLoading,
  setGeneralError,
  setGeneralSuccess
} from "../../../redux/reducers/settings.reducer";

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
  const dispatch = useDispatch();
  const { appName, timezone, maintenance, currency, loading, success, error } = useSelector(
    (state) => state.settings.general
  );

  const handleSave = async () => {
    dispatch(setGeneralLoading(true));
    const payload = {
      appName: appName,
      timezone: timezone,
      defaultCurrency: currency,
      maintenance: maintenance,
    };
    const response = await EkoServices_Settings.updateGeneralSettings(payload);
    if (response) {
      dispatch(setGeneralSuccess("General settings updated successfully"));
      dispatch(setGeneralLoading(false));
    } else {
      dispatch(setGeneralError("Failed to update general settings"));
      dispatch(setGeneralLoading(false));
    }
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      {success && <Alert severity="success">{success}</Alert>}

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
            onChange={(e) => dispatch(setGeneralSettings({ appName: e.target.value }))}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Default Currency</InputLabel>
            <Select
              value={currency}
              label="Default Currency"
              onChange={(e) => dispatch(setGeneralSettings({ currency: e.target.value }))}
            >
              <MenuItem value="NGN">NGN</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>

          {/* End new fields */}
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              label="Timezone"
              onChange={(e) => dispatch(setGeneralSettings({ timezone: e.target.value }))}
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
                onChange={(e) => dispatch(setGeneralSettings({ maintenance: e.target.checked }))}
              />
            }
            label="Maintenance Mode"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
