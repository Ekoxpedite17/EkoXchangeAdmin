import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

export default function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState(
    "Dear {{user}},\nYour transaction was successful."
  );
  const [openTemplate, setOpenTemplate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [senderEmail, setSenderEmail] = useState("noreply@ekoxchange.com");
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [smsGateway, setSmsGateway] = useState("");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("Notification settings saved!");
    }, 1000);
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Notification Settings
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
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
            }
            label="Enable Email Alerts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
              />
            }
            label="Enable SMS Alerts"
          />
          <TextField
            label="Sender Email Address"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="SMS Gateway Integration (e.g., Twilio, Termii API Key)"
            value={smsGateway}
            onChange={(e) => setSmsGateway(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Notification Types"
            SelectProps={{ multiple: true }}
            value={notificationTypes}
            onChange={(e) => setNotificationTypes(e.target.value)}
            fullWidth
          >
            {["Buy Order", "Sell Order", "KYC Status", "Support Reply"].map(
              (type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              )
            )}
          </TextField>
          <Button
            variant="outlined"
            onClick={() => setOpenTemplate(true)}
            sx={{ alignSelf: "flex-start" }}
          >
            Edit Email Template
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpenTemplate(true)}>
              Manage Email Templates
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test notification sent!")}
            >
              Send Test Notification
            </Button>
          </Box>
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
        <Dialog
          open={openTemplate}
          onClose={() => setOpenTemplate(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Email Template</DialogTitle>
          <DialogContent>
            <TextField
              label="Email Template"
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              multiline
              minRows={6}
              fullWidth
              helperText="You can use {{user}} as a placeholder for the user's name."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTemplate(false)}>Cancel</Button>
            <Button onClick={() => setOpenTemplate(false)} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
