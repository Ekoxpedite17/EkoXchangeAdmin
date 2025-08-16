import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  setSecuritySettings,
  setSecurityLoading,
  setSecurityError,
  setSecuritySuccess
} from "../../../redux/reducers/settings.reducer";

export default function SecuritySettings() {
  const dispatch = useDispatch();
  const { enforce2FA, sessionTimeout, passwordMinLength, loginAttemptLimit, ipList, loading } = useSelector(
    (state) => state.settings.security
  );

  const handleSave = () => {
    dispatch(setSecurityLoading(true));
    setTimeout(() => {
      dispatch(setSecuritySuccess("Security settings saved!"));
      dispatch(setSecurityLoading(false));
    }, 1000);
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
                onChange={(e) => dispatch(setSecuritySettings({ enforce2FA: e.target.checked }))}
              />
            }
            label="Enforce 2FA for all users"
          />
          <TextField
            label="Session Timeout (minutes)"
            type="number"
            value={sessionTimeout}
            onChange={(e) => dispatch(setSecuritySettings({ sessionTimeout: Number(e.target.value) }))}
            inputProps={{ min: 1, max: 1440 }}
            fullWidth
          />
          <TextField
            label="Password Minimum Length"
            type="number"
            value={passwordMinLength}
            onChange={(e) => dispatch(setSecuritySettings({ passwordMinLength: Number(e.target.value) }))}
            inputProps={{ min: 6, max: 128 }}
            fullWidth
          />
          <TextField
            label="Login Attempt Limit"
            type="number"
            value={loginAttemptLimit}
            onChange={(e) => dispatch(setSecuritySettings({ loginAttemptLimit: Number(e.target.value) }))}
            inputProps={{ min: 1, max: 20 }}
            fullWidth
          />
          <TextField
            label="IP Whitelist / Blacklist (comma-separated)"
            multiline
            minRows={2}
            value={ipList}
            onChange={(e) => dispatch(setSecuritySettings({ ipList: e.target.value }))}
            placeholder="e.g., 192.168.1.1, 10.0.0.1"
            fullWidth
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
