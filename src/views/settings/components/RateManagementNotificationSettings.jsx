import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  Stack,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

const NOTIFICATION_METHODS = [
  {
    label: "Email",
    value: "email",
    description: "Send notifications via email",
  },
  { label: "SMS", value: "sms", description: "Send notifications via SMS" },
  {
    label: "In-App",
    value: "inapp",
    description: "Show notifications within the app",
  },
  {
    label: "Push Notification",
    value: "push",
    description: "Send push notifications to mobile devices",
  },
];

const RECIPIENT_OPTIONS = [
  {
    label: "Admins Only",
    value: "admins",
    description: "Only admin users receive notifications",
  },
  {
    label: "Users Only",
    value: "users",
    description: "Only verified end users receive notifications",
  },
  {
    label: "Both",
    value: "both",
    description: "Both admins and verified users receive notifications",
  },
];

const RateManagementNotificationSettings = () => {
  // State for settings
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [lastChanged, setLastChanged] = useState({
    by: "AdminUser",
    at: dayjs().subtract(1, "day").format("MMM D, YYYY - hh:mm A"),
  });
  const [methods, setMethods] = useState(["email"]);
  const [threshold, setThreshold] = useState(1.0);
  const [recipients, setRecipients] = useState("admins");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State for log details dialog
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [selectedLogEntry, setSelectedLogEntry] = useState(null);

  // Mock log data - replace with API call
  const [log] = useState([
    {
      id: 1,
      timestamp: "2024-08-02 09:45 AM",
      token: "BTC",
      oldRate: 1500,
      newRate: 1545,
      percent: 3.0,
      triggered: true,
      channels: ["email", "push"],
      recipients: "Admins",
      status: "Success",
      deliveryDetails: {
        email: { status: "Success", count: 5 },
        push: { status: "Success", count: 3 },
      },
    },
    {
      id: 2,
      timestamp: "2024-08-01 11:20 AM",
      token: "ETH",
      oldRate: 2000,
      newRate: 2010,
      percent: 0.5,
      triggered: false,
      channels: ["email"],
      recipients: "Users",
      status: "Skipped (Below Threshold)",
      deliveryDetails: null,
    },
    {
      id: 3,
      timestamp: "2024-08-01 08:15 AM",
      token: "SOL",
      oldRate: 1200,
      newRate: 1260,
      percent: 5.0,
      triggered: true,
      channels: ["email", "sms", "push"],
      recipients: "Both",
      status: "Partial Success",
      deliveryDetails: {
        email: { status: "Success", count: 12 },
        sms: { status: "Failed", count: 2, error: "Invalid phone number" },
        push: { status: "Success", count: 8 },
      },
    },
  ]);

  // Handlers
  const handleToggle = async () => {
    try {
      setNotifyEnabled((prev) => !prev);
      setLastChanged({
        by: "AdminUser", // TODO: Replace with actual user from context
        at: dayjs().format("MMM D, YYYY - hh:mm A"),
      });

      // TODO: API call to update setting
      // await updateNotificationSetting({ enabled: !notifyEnabled });

      setSuccess(
        `Rate change notifications ${!notifyEnabled ? "enabled" : "disabled"} successfully`
      );
      setTimeout(() => setSuccess(""), 3000);

      // TODO: Audit log
      // await logAuditEvent({
      //   action: 'UPDATE_NOTIFICATION_SETTING',
      //   oldValue: notifyEnabled,
      //   newValue: !notifyEnabled,
      //   userId: currentUser.id
      // });
    } catch (error) {
      setError("Failed to update notification setting. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleMethodChange = async (method) => {
    try {
      let updated;
      if (methods.includes(method)) {
        updated = methods.filter((m) => m !== method);
      } else {
        updated = [...methods, method];
      }

      if (updated.length === 0) {
        setError("At least one notification method must be selected.");
        return;
      }

      setMethods(updated);
      setError("");

      // TODO: API call to update methods
      // await updateNotificationMethods(updated);

      setSuccess("Notification methods updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to update notification methods. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleThresholdChange = async (e) => {
    try {
      let value = e.target.value;
      if (value === "") {
        setThreshold("");
        setError("");
        return;
      }

      value = parseFloat(value);
      if (isNaN(value) || value < 0.1 || value > 50) {
        setError("Threshold must be between 0.1% and 50%.");
        return;
      }

      setError("");
      setThreshold(value);

      // TODO: API call to update threshold
      // await updateThreshold(value);

      setSuccess(`Threshold updated to ${value}%`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to update threshold. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleRecipientChange = async (e) => {
    try {
      setRecipients(e.target.value);

      // TODO: API call to update recipients
      // await updateRecipients(e.target.value);

      setSuccess("Notification recipients updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to update recipients. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleViewLogDetails = (entry) => {
    setSelectedLogEntry(entry);
    setLogDialogOpen(true);
  };

  const handleExportLog = () => {
    // TODO: Implement CSV export
    console.log("Exporting log data...");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "success";
      case "Failed":
        return "error";
      case "Partial Success":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* Success/Error Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Main Settings Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Rate Change Notification Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              {/* 1. Notify on Rate Change Toggle */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  1. Notify on Rate Change
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifyEnabled}
                      onChange={handleToggle}
                      color="primary"
                      size="large"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {notifyEnabled
                          ? "Rate Change Notification: ENABLED"
                          : "Rate Change Notification: DISABLED"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last updated: {lastChanged.at} by {lastChanged.by}
                      </Typography>
                    </Box>
                  }
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  When enabled, the system tracks live crypto buy/sell price
                  feeds and sends notifications when rates change.
                </Typography>
              </Box>

              {/* 2. Notification Method */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  2. Notification Method
                </Typography>
                <FormGroup row>
                  {NOTIFICATION_METHODS.map((method) => (
                    <FormControlLabel
                      key={method.value}
                      control={
                        <Checkbox
                          checked={methods.includes(method.value)}
                          onChange={() => handleMethodChange(method.value)}
                          disabled={!notifyEnabled}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2">
                            {method.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {method.description}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </FormGroup>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Select one or more channels for sending rate change alerts.
                </Typography>
              </Box>

              {/* 3. Rate Change Threshold */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  3. Rate Change Threshold
                </Typography>
                <TextField
                  type="number"
                  value={threshold}
                  onChange={handleThresholdChange}
                  inputProps={{ min: 0.1, max: 50, step: 0.01 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  helperText="Alert will be triggered if rate changes by this percentage or more. (0.1–50%)"
                  error={!!error && error.includes("Threshold")}
                  disabled={!notifyEnabled}
                  sx={{ maxWidth: 300 }}
                />
              </Box>

              {/* 4. Notification Recipients */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  4. Notification Recipients
                </Typography>
                <FormControl sx={{ minWidth: 300 }} disabled={!notifyEnabled}>
                  <InputLabel>Select Recipients</InputLabel>
                  <Select
                    value={recipients}
                    onChange={handleRecipientChange}
                    label="Select Recipients"
                  >
                    {RECIPIENT_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        <Box>
                          <Typography variant="body2">{opt.label}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {opt.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Define who receives rate change alerts.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Rate Update Log Card */}
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">5. Rate Update Log</Typography>
              <Box>
                <Tooltip title="Export Log">
                  <IconButton onClick={handleExportLog} size="small">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter Log">
                  <IconButton size="small">
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Token</TableCell>
                    <TableCell>Old Rate</TableCell>
                    <TableCell>New Rate</TableCell>
                    <TableCell>% Change</TableCell>
                    <TableCell>Triggered</TableCell>
                    <TableCell>Channels</TableCell>
                    <TableCell>Recipients</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {log.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.timestamp}</TableCell>
                      <TableCell>{entry.token}</TableCell>
                      <TableCell>₦{entry.oldRate.toLocaleString()}</TableCell>
                      <TableCell>₦{entry.newRate.toLocaleString()}</TableCell>
                      <TableCell>{entry.percent}%</TableCell>
                      <TableCell>
                        {entry.triggered ? (
                          <Chip label="Yes" color="success" size="small" />
                        ) : (
                          <Chip label="No" color="default" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {entry.channels.map((channel) => (
                            <Chip
                              key={channel}
                              label={channel}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>{entry.recipients}</TableCell>
                      <TableCell>
                        <Chip
                          label={entry.status}
                          color={getStatusColor(entry.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewLogDetails(entry)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>

      {/* Log Details Dialog */}
      <Dialog
        open={logDialogOpen}
        onClose={() => setLogDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Rate Change Log Details</DialogTitle>
        <DialogContent>
          {selectedLogEntry && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Token
                </Typography>
                <Typography variant="body1">
                  {selectedLogEntry.token}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Rate Change
                </Typography>
                <Typography variant="body1">
                  ₦{selectedLogEntry.oldRate.toLocaleString()} → ₦
                  {selectedLogEntry.newRate.toLocaleString()} (
                  {selectedLogEntry.percent}%)
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Timestamp
                </Typography>
                <Typography variant="body1">
                  {selectedLogEntry.timestamp}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Notification Triggered
                </Typography>
                <Typography variant="body1">
                  {selectedLogEntry.triggered ? "Yes" : "No"}
                  {!selectedLogEntry.triggered && " (Below threshold)"}
                </Typography>
              </Box>
              {selectedLogEntry.deliveryDetails && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Delivery Details
                  </Typography>
                  {Object.entries(selectedLogEntry.deliveryDetails).map(
                    ([channel, details]) => (
                      <Box key={channel} sx={{ mt: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {channel.toUpperCase()}: {details.status}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {details.count} recipients
                          {details.error && ` - ${details.error}`}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RateManagementNotificationSettings;
