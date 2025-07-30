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
} from "@mui/material";
import { useNavigate } from "react-router";

export default function SecuritySettings() {
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [loginAttemptLimit, setLoginAttemptLimit] = useState(5);
  const [ipList, setIpList] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Security settings saved!");
    }, 1000);
  };

  const handleRolePermissions = () => {
    navigate("/roles-permissions");
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Security Settings
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
                checked={enforce2FA}
                onChange={(e) => setEnforce2FA(e.target.checked)}
              />
            }
            label="Enforce 2FA for all users"
          />
          <TextField
            label="Session Timeout (minutes)"
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
            inputProps={{ min: 1, max: 1440 }}
            fullWidth
          />
          <TextField
            label="Password Minimum Length"
            type="number"
            value={passwordMinLength}
            onChange={(e) => setPasswordMinLength(Number(e.target.value))}
            inputProps={{ min: 6, max: 128 }}
            fullWidth
          />
          <TextField
            label="Login Attempt Limit"
            type="number"
            value={loginAttemptLimit}
            onChange={(e) => setLoginAttemptLimit(Number(e.target.value))}
            inputProps={{ min: 1, max: 20 }}
            fullWidth
          />
          <TextField
            label="IP Whitelist / Blacklist (comma-separated)"
            multiline
            minRows={2}
            value={ipList}
            onChange={(e) => setIpList(e.target.value)}
            placeholder="e.g., 192.168.1.1, 10.0.0.1"
            fullWidth
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRolePermissions}
          >
            Manage Role-Based Permissions
          </Button>
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
