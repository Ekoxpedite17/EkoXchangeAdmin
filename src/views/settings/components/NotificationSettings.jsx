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
  Select,
  InputLabel,
  FormControl,
  Chip,
  Divider,
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  Smartphone as SmartphoneIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export default function NotificationSettings() {
  // Email Settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState(
    "Dear {{user}},\nYour transaction was successful."
  );
  const [senderEmail, setSenderEmail] = useState("noreply@ekoxchange.com");

  // SMS Settings
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [smsProvider, setSmsProvider] = useState("twilio");
  const [smsApiKey, setSmsApiKey] = useState("");
  const [smsFromNumber, setSmsFromNumber] = useState("");

  // Push Notification Settings
  const [pushAlerts, setPushAlerts] = useState(true);
  const [pushProvider, setPushProvider] = useState("firebase");
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  });
  const [pushTemplate, setPushTemplate] = useState("{{title}}\n{{body}}");
  const [pushCategories, setPushCategories] = useState([
    "transaction",
    "security",
    "promotional",
    "system",
  ]);
  const [selectedPushCategories, setSelectedPushCategories] = useState([
    "transaction",
    "security",
  ]);

  // General Settings
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openPushConfig, setOpenPushConfig] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      // TODO: API call to save all notification settings
      // await saveNotificationSettings({
      //   email: { enabled: emailAlerts, template: emailTemplate, sender: senderEmail },
      //   sms: { enabled: smsAlerts, provider: smsProvider, apiKey: smsApiKey, fromNumber: smsFromNumber },
      //   push: { enabled: pushAlerts, provider: pushProvider, config: firebaseConfig, template: pushTemplate, categories: selectedPushCategories }
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Notification settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to save notification settings. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handlePushCategoryToggle = (category) => {
    setSelectedPushCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFirebaseConfigChange = (field, value) => {
    setFirebaseConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Stack spacing={3}>
      {/* Success/Error Alerts */}
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Email Settings */}
      <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Email Notifications
            </Typography>
          </Box>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                />
              }
              label="Enable Email Alerts"
            />
            <TextField
              label="Sender Email Address"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              fullWidth
              disabled={!emailAlerts}
            />
            <Button
              variant="outlined"
              onClick={() => setOpenTemplate(true)}
              sx={{ alignSelf: "flex-start" }}
              disabled={!emailAlerts}
            >
              Edit Email Template
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      {/* <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SmsIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              SMS Notifications
            </Typography>
          </Box>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                />
              }
              label="Enable SMS Alerts"
            />
            {smsAlerts && (
              <>
                <FormControl fullWidth>
                  <InputLabel>SMS Provider</InputLabel>
                  <Select
                    value={smsProvider}
                    onChange={(e) => setSmsProvider(e.target.value)}
                    label="SMS Provider"
                  >
                    <MenuItem value="twilio">Twilio</MenuItem>
                    <MenuItem value="africastalking">Africa's Talking</MenuItem>
                    <MenuItem value="vonage">Vonage</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="API Key"
                  value={smsApiKey}
                  onChange={(e) => setSmsApiKey(e.target.value)}
                  fullWidth
                  type="password"
                />
                <TextField
                  label="From Number"
                  value={smsFromNumber}
                  onChange={(e) => setSmsFromNumber(e.target.value)}
                  fullWidth
                  placeholder="+234XXXXXXXXX"
                />
              </>
            )}
          </Stack>
        </CardContent>
      </Card> */}

      {/* Push Notification Settings */}
      <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SmartphoneIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Push Notifications
            </Typography>
          </Box>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                />
              }
              label="Enable Push Notifications"
            />

            {/* {pushAlerts && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Push Provider</InputLabel>
                  <Select
                    value={pushProvider}
                    onChange={(e) => setPushProvider(e.target.value)}
                    label="Push Provider"
                  >
                    <MenuItem value="firebase">
                      Firebase Cloud Messaging
                    </MenuItem>
                    <MenuItem value="onesignal">OneSignal</MenuItem>
                    <MenuItem value="pusher">Pusher</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Notification Categories
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {pushCategories.map((category) => (
                      <Chip
                        key={category}
                        label={
                          category.charAt(0).toUpperCase() + category.slice(1)
                        }
                        onClick={() => handlePushCategoryToggle(category)}
                        color={
                          selectedPushCategories.includes(category)
                            ? "primary"
                            : "default"
                        }
                        variant={
                          selectedPushCategories.includes(category)
                            ? "filled"
                            : "outlined"
                        }
                        clickable
                      />
                    ))}
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => setOpenPushConfig(true)}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Configure{" "}
                  {pushProvider === "firebase" ? "Firebase" : "Provider"}{" "}
                  Settings
                </Button>
              </>
            )} */}
          </Stack>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Test Notifications
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test email notification sent!")}
              disabled={!emailAlerts}
            >
              Test Email
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test SMS notification sent!")}
              disabled={!smsAlerts}
            >
              Test SMS
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test push notification sent!")}
              disabled={!pushAlerts}
            >
              Test Push
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
          size="large"
        >
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </Box>

      {/* Email Template Dialog */}
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

      {/* Push Configuration Dialog */}
      <Dialog
        open={openPushConfig}
        onClose={() => setOpenPushConfig(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Configure {pushProvider === "firebase" ? "Firebase" : "Provider"}{" "}
          Settings
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {pushProvider === "firebase" ? (
              <>
                <TextField
                  label="API Key"
                  value={firebaseConfig.apiKey}
                  onChange={(e) =>
                    handleFirebaseConfigChange("apiKey", e.target.value)
                  }
                  fullWidth
                  type="password"
                />
                <TextField
                  label="Auth Domain"
                  value={firebaseConfig.authDomain}
                  onChange={(e) =>
                    handleFirebaseConfigChange("authDomain", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Project ID"
                  value={firebaseConfig.projectId}
                  onChange={(e) =>
                    handleFirebaseConfigChange("projectId", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Storage Bucket"
                  value={firebaseConfig.storageBucket}
                  onChange={(e) =>
                    handleFirebaseConfigChange("storageBucket", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Messaging Sender ID"
                  value={firebaseConfig.messagingSenderId}
                  onChange={(e) =>
                    handleFirebaseConfigChange(
                      "messagingSenderId",
                      e.target.value
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="App ID"
                  value={firebaseConfig.appId}
                  onChange={(e) =>
                    handleFirebaseConfigChange("appId", e.target.value)
                  }
                  fullWidth
                />
              </>
            ) : (
              <TextField
                label="Provider Configuration"
                multiline
                minRows={4}
                fullWidth
                placeholder="Enter your provider configuration details here..."
              />
            )}

            <TextField
              label="Push Notification Template"
              value={pushTemplate}
              onChange={(e) => setPushTemplate(e.target.value)}
              multiline
              minRows={3}
              fullWidth
              helperText="Use {{title}} and {{body}} as placeholders for notification content."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPushConfig(false)}>Cancel</Button>
          <Button onClick={() => setOpenPushConfig(false)} variant="contained">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
