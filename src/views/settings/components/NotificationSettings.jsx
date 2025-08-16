import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  setNotificationSettings,
  setNotificationLoading,
  setNotificationError,
  setNotificationSuccess,
} from "../../../redux/reducers/settings.reducer";

export default function NotificationSettings() {
  const dispatch = useDispatch();
  const { email, sms, push, loading, success, error } = useSelector(
    (state) => state.settings.notifications
  );

  // Local state for dialogs
  const [openTemplate, setOpenTemplate] = React.useState(false);
  const [openPushConfig, setOpenPushConfig] = React.useState(false);

  const handleSave = async () => {
    try {
      dispatch(setNotificationLoading(true));
      dispatch(setNotificationError(""));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(
        setNotificationSuccess("Notification settings saved successfully!")
      );
      setTimeout(() => dispatch(setNotificationSuccess("")), 3000);
    } catch (error) {
      dispatch(
        setNotificationError(
          "Failed to save notification settings. Please try again."
        )
      );
      setTimeout(() => dispatch(setNotificationError("")), 5000);
    } finally {
      dispatch(setNotificationLoading(false));
    }
  };

  const handlePushCategoryToggle = (category) => {
    const newCategories = push.selectedCategories.includes(category)
      ? push.selectedCategories.filter((c) => c !== category)
      : [...push.selectedCategories, category];

    dispatch(
      setNotificationSettings({
        type: "push",
        settings: { selectedCategories: newCategories },
      })
    );
  };

  const handleFirebaseConfigChange = (field, value) => {
    dispatch(
      setNotificationSettings({
        type: "push",
        settings: {
          config: { ...push.config, [field]: value },
        },
      })
    );
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
                  checked={email.enabled}
                  onChange={(e) =>
                    dispatch(
                      setNotificationSettings({
                        type: "email",
                        settings: { enabled: e.target.checked },
                      })
                    )
                  }
                />
              }
              label="Enable Email Alerts"
            />
            <TextField
              label="Sender Email Address"
              value={email.senderEmail}
              onChange={(e) =>
                dispatch(
                  setNotificationSettings({
                    type: "email",
                    settings: { senderEmail: e.target.value },
                  })
                )
              }
              fullWidth
              disabled={!email.enabled}
            />
            <Button
              variant="outlined"
              onClick={() => setOpenTemplate(true)}
              sx={{ alignSelf: "flex-start" }}
              disabled={!email.enabled}
            >
              Edit Email Template
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
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
                  checked={sms.enabled}
                  onChange={(e) =>
                    dispatch(
                      setNotificationSettings({
                        type: "sms",
                        settings: { enabled: e.target.checked },
                      })
                    )
                  }
                />
              }
              label="Enable SMS Alerts"
            />
            {sms.enabled && (
              <>
                <FormControl fullWidth>
                  <InputLabel>SMS Provider</InputLabel>
                  <Select
                    value={sms.provider}
                    onChange={(e) =>
                      dispatch(
                        setNotificationSettings({
                          type: "sms",
                          settings: { provider: e.target.value },
                        })
                      )
                    }
                    label="SMS Provider"
                  >
                    <MenuItem value="twilio">Twilio</MenuItem>
                    <MenuItem value="africastalking">Africa's Talking</MenuItem>
                    <MenuItem value="vonage">Vonage</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="API Key"
                  value={sms.apiKey}
                  onChange={(e) =>
                    dispatch(
                      setNotificationSettings({
                        type: "sms",
                        settings: { apiKey: e.target.value },
                      })
                    )
                  }
                  fullWidth
                  type="password"
                />
                <TextField
                  label="From Number"
                  value={sms.fromNumber}
                  onChange={(e) =>
                    dispatch(
                      setNotificationSettings({
                        type: "sms",
                        settings: { fromNumber: e.target.value },
                      })
                    )
                  }
                  fullWidth
                  placeholder="+234XXXXXXXXX"
                />
              </>
            )}
          </Stack>
        </CardContent>
      </Card>

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
                  checked={push.enabled}
                  onChange={(e) =>
                    dispatch(
                      setNotificationSettings({
                        type: "push",
                        settings: { enabled: e.target.checked },
                      })
                    )
                  }
                />
              }
              label="Enable Push Notifications"
            />

            {push.enabled && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Push Provider</InputLabel>
                  <Select
                    value={push.provider}
                    onChange={(e) =>
                      dispatch(
                        setNotificationSettings({
                          type: "push",
                          settings: { provider: e.target.value },
                        })
                      )
                    }
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
                    {push.categories.map((category) => (
                      <Chip
                        key={category}
                        label={
                          category.charAt(0).toUpperCase() + category.slice(1)
                        }
                        onClick={() => handlePushCategoryToggle(category)}
                        color={
                          push.selectedCategories.includes(category)
                            ? "primary"
                            : "default"
                        }
                        variant={
                          push.selectedCategories.includes(category)
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
                  {push.provider === "firebase" ? "Firebase" : "Provider"}{" "}
                  Settings
                </Button>
              </>
            )}
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
              disabled={!email.enabled}
            >
              Test Email
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test SMS notification sent!")}
              disabled={!sms.enabled}
            >
              Test SMS
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Test push notification sent!")}
              disabled={!push.enabled}
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
          disabled={loading}
          size="large"
        >
          {loading ? "Saving..." : "Save All Settings"}
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
            value={email.template}
            onChange={(e) =>
              dispatch(
                setNotificationSettings({
                  type: "email",
                  settings: { template: e.target.value },
                })
              )
            }
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
          Configure {push.provider === "firebase" ? "Firebase" : "Provider"}{" "}
          Settings
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {push.provider === "firebase" ? (
              <>
                <TextField
                  label="API Key"
                  value={push.config.apiKey}
                  onChange={(e) =>
                    handleFirebaseConfigChange("apiKey", e.target.value)
                  }
                  fullWidth
                  type="password"
                />
                <TextField
                  label="Auth Domain"
                  value={push.config.authDomain}
                  onChange={(e) =>
                    handleFirebaseConfigChange("authDomain", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Project ID"
                  value={push.config.projectId}
                  onChange={(e) =>
                    handleFirebaseConfigChange("projectId", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Storage Bucket"
                  value={push.config.storageBucket}
                  onChange={(e) =>
                    handleFirebaseConfigChange("storageBucket", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Messaging Sender ID"
                  value={push.config.messagingSenderId}
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
                  value={push.config.appId}
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
              value={push.template}
              onChange={(e) =>
                dispatch(
                  setNotificationSettings({
                    type: "push",
                    settings: { template: e.target.value },
                  })
                )
              }
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
