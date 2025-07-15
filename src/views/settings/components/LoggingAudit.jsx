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
  CircularProgress
} from "@mui/material";

export default function LoggingAudit() {
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
      alert("Logs exported!");
    }, 1500);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Logging & Audit
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControlLabel
            control={<Switch checked={activityLogs} onChange={e => setActivityLogs(e.target.checked)} />}
            label="Enable Activity Logs"
          />
          <TextField
            label="Log Retention Period (days)"
            type="number"
            value={retention}
            onChange={e => setRetention(Number(e.target.value))}
            inputProps={{ min: 1, max: 3650 }}
            fullWidth
          />
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