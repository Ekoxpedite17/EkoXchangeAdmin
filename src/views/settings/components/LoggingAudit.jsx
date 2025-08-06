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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  Tooltip,
  Badge,
  InputAdornment,
} from "@mui/material";
import {
  FilterList,
  Download,
  Refresh,
  Info,
  Warning,
  Error as ErrorIcon,
  Search,
  Person,
  Settings,
  Visibility,
  Close,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

const mockActivityLogs = [
  {
    id: 1,
    action: "Updated KYC status to Verified",
    timestamp: "2025-08-02T10:45:21.000Z",
    admin: "admin@example.com",
    ipAddress: "105.203.12.45",
    userAgent: "Chrome 120.0.0 / MacOS",
    status: "success",
    details: {
      entity: "User",
      entityId: "user_123",
      changes: [
        { field: "kycStatus", oldValue: "pending", newValue: "verified" },
      ],
    },
  },
  {
    id: 2,
    action: "Approved withdrawal request",
    timestamp: "2025-08-02T09:30:15.000Z",
    admin: "finance@example.com",
    ipAddress: "105.203.12.46",
    userAgent: "Firefox 119.0 / Windows",
    status: "success",
    details: {
      entity: "Withdrawal",
      entityId: "txn_456",
      changes: [
        { field: "status", oldValue: "pending", newValue: "approved" },
        {
          field: "approvedBy",
          oldValue: null,
          newValue: "finance@example.com",
        },
      ],
    },
  },
  {
    id: 3,
    action: "Failed to update user role",
    timestamp: "2025-08-01T16:22:45.000Z",
    admin: "support@example.com",
    ipAddress: "105.203.12.47",
    userAgent: "Safari 17.0 / iOS",
    status: "failed",
    details: {
      entity: "User",
      entityId: "user_789",
      error: "Insufficient permissions",
    },
  },
  {
    id: 4,
    action: "Changed system setting: Default Currency",
    timestamp: "2025-08-01T14:10:33.000Z",
    admin: "admin@example.com",
    ipAddress: "105.203.12.45",
    userAgent: "Chrome 120.0.0 / MacOS",
    status: "success",
    details: {
      entity: "SystemSetting",
      entityId: "currency",
      changes: [{ field: "defaultCurrency", oldValue: "USD", newValue: "NGN" }],
    },
  },
  {
    id: 5,
    action: "Assigned role 'Finance Manager' to user",
    timestamp: "2025-07-31T11:05:27.000Z",
    admin: "admin@example.com",
    ipAddress: "105.203.12.45",
    userAgent: "Chrome 120.0.0 / MacOS",
    status: "success",
    details: {
      entity: "User",
      entityId: "user_321",
      changes: [
        {
          field: "role",
          oldValue: "Support Agent",
          newValue: "Finance Manager",
        },
      ],
    },
  },
];

const mockLoginLogs = [
  {
    id: 1,
    admin: "admin@example.com",
    loginTimestamp: "2025-08-02T10:45:21.000Z",
    logoutTimestamp: "2025-08-02T11:30:45.000Z",
    ipAddress: "105.203.12.45",
    userAgent: "Chrome 120.0.0 / MacOS",
    status: "success",
    sessionDuration: "45m 24s",
  },
  {
    id: 2,
    admin: "finance@example.com",
    loginTimestamp: "2025-08-02T09:30:15.000Z",
    logoutTimestamp: "2025-08-02T10:15:22.000Z",
    ipAddress: "105.203.12.46",
    userAgent: "Firefox 119.0 / Windows",
    status: "success",
    sessionDuration: "45m 07s",
  },
  {
    id: 3,
    admin: "unknown@example.com",
    loginTimestamp: "2025-08-01T16:22:45.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.47",
    userAgent: "Safari 17.0 / iOS",
    status: "failed",
    failureReason: "Invalid credentials",
  },
  {
    id: 4,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T14:10:33.000Z",
    logoutTimestamp: "2025-08-01T14:45:12.000Z",
    ipAddress: "105.203.12.48",
    userAgent: "Edge 120.0 / Windows",
    status: "success",
    sessionDuration: "34m 39s",
  },
  {
    id: 5,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T13:05:27.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.49",
    userAgent: "Chrome 120.0.0 / Android",
    status: "failed",
    failureReason: "2FA required but not provided",
  },
  {
    id: 6,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T13:06:27.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.49",
    userAgent: "Chrome 120.0.0 / Android",
    status: "failed",
    failureReason: "2FA required but not provided",
  },
  {
    id: 7,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T13:07:27.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.49",
    userAgent: "Chrome 120.0.0 / Android",
    status: "failed",
    failureReason: "2FA required but not provided",
  },
  {
    id: 8,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T13:08:27.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.49",
    userAgent: "Chrome 120.0.0 / Android",
    status: "failed",
    failureReason: "2FA required but not provided",
  },
  {
    id: 9,
    admin: "support@example.com",
    loginTimestamp: "2025-08-01T13:09:27.000Z",
    logoutTimestamp: null,
    ipAddress: "105.203.12.49",
    userAgent: "Chrome 120.0.0 / Android",
    status: "failed",
    failureReason: "Account auto-locked after 5 failed attempts",
  },
];

const mockSystemChanges = [
  {
    id: 1,
    setting: "Default Currency",
    oldValue: "USD",
    newValue: "NGN",
    changedBy: "admin@example.com",
    timestamp: "2025-08-02T10:50:12.000Z",
    category: "General",
  },
  {
    id: 2,
    setting: "2FA Requirement",
    oldValue: "Optional",
    newValue: "Required",
    changedBy: "admin@example.com",
    timestamp: "2025-08-01T15:30:45.000Z",
    category: "Security",
  },
  {
    id: 3,
    setting: "Price Feed Source",
    oldValue: "CoinGecko",
    newValue: "Binance",
    changedBy: "admin@example.com",
    timestamp: "2025-07-31T09:15:22.000Z",
    category: "API Integrations",
  },
  {
    id: 4,
    setting: "Maintenance Mode",
    oldValue: "Off",
    newValue: "On",
    changedBy: "admin@example.com",
    timestamp: "2025-07-30T18:05:33.000Z",
    category: "System",
  },
  {
    id: 5,
    setting: "Email Notifications",
    oldValue: "All Users",
    newValue: "Verified Users Only",
    changedBy: "admin@example.com",
    timestamp: "2025-07-29T11:40:19.000Z",
    category: "Notifications",
  },
];

export default function LoggingAudit() {
  // State for tab management
  const [activeTab, setActiveTab] = useState(0);

  // State for activity logs
  const [activityLogs, setActivityLogs] = useState(mockActivityLogs);
  const [activityFilter, setActivityFilter] = useState({
    keyword: "",
    admin: "",
    dateRange: {
      start: null,
      end: null,
    },
    status: "",
  });
  const [activityFilterOpen, setActivityFilterOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // State for login logs
  const [loginLogs, setLoginLogs] = useState(mockLoginLogs);
  const [loginFilter, setLoginFilter] = useState({
    admin: "",
    dateRange: {
      start: null,
      end: null,
    },
    status: "",
    ipAddress: "",
  });
  const [loginFilterOpen, setLoginFilterOpen] = useState(false);
  const [selectedLogin, setSelectedLogin] = useState(null);

  // State for system changes
  const [systemChanges, setSystemChanges] = useState(mockSystemChanges);
  const [systemFilter, setSystemFilter] = useState({
    setting: "",
    admin: "",
    dateRange: {
      start: null,
      end: null,
    },
    category: "",
  });
  const [systemFilterOpen, setSystemFilterOpen] = useState(false);
  const [selectedChange, setSelectedChange] = useState(null);

  // State for settings
  const [settings, setSettings] = useState({
    alertSuspicious: true,
    alertMethod: "email",
    retentionPeriod: 180,
    archiveOldLogs: true,
  });

  // State for export operations
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleString("en-NG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  };

  // Handle settings save
  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("Logging & audit settings saved!");
    }, 1000);
  };

  // Handle log export
  const handleExportLogs = (type) => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      // Here you would trigger log export based on type
      alert(`${type} logs exported to CSV!`);
    }, 1500);
  };

  // Filter activity logs
  const getFilteredActivityLogs = () => {
    return activityLogs.filter((log) => {
      // Filter by keyword
      if (
        activityFilter.keyword &&
        !log.action.toLowerCase().includes(activityFilter.keyword.toLowerCase())
      ) {
        return false;
      }

      // Filter by admin
      if (
        activityFilter.admin &&
        !log.admin.toLowerCase().includes(activityFilter.admin.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (activityFilter.status && log.status !== activityFilter.status) {
        return false;
      }

      // Filter by date range
      if (
        activityFilter.dateRange.start &&
        new Date(log.timestamp) < new Date(activityFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        activityFilter.dateRange.end &&
        new Date(log.timestamp) > new Date(activityFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

  // Filter login logs
  const getFilteredLoginLogs = () => {
    return loginLogs.filter((log) => {
      // Filter by admin
      if (
        loginFilter.admin &&
        !log.admin.toLowerCase().includes(loginFilter.admin.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (loginFilter.status && log.status !== loginFilter.status) {
        return false;
      }

      // Filter by IP address
      if (
        loginFilter.ipAddress &&
        !log.ipAddress.includes(loginFilter.ipAddress)
      ) {
        return false;
      }

      // Filter by date range
      if (
        loginFilter.dateRange.start &&
        new Date(log.loginTimestamp) < new Date(loginFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        loginFilter.dateRange.end &&
        new Date(log.loginTimestamp) > new Date(loginFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

  // Filter system changes
  const getFilteredSystemChanges = () => {
    return systemChanges.filter((change) => {
      // Filter by setting
      if (
        systemFilter.setting &&
        !change.setting
          .toLowerCase()
          .includes(systemFilter.setting.toLowerCase())
      ) {
        return false;
      }

      // Filter by admin
      if (
        systemFilter.admin &&
        !change.changedBy
          .toLowerCase()
          .includes(systemFilter.admin.toLowerCase())
      ) {
        return false;
      }

      // Filter by category
      if (systemFilter.category && change.category !== systemFilter.category) {
        return false;
      }

      // Filter by date range
      if (
        systemFilter.dateRange.start &&
        new Date(change.timestamp) < new Date(systemFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        systemFilter.dateRange.end &&
        new Date(change.timestamp) > new Date(systemFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

  // Reset filters
  const resetFilters = (type) => {
    switch (type) {
      case "activity":
        setActivityFilter({
          keyword: "",
          admin: "",
          dateRange: { start: null, end: null },
          status: "",
        });
        break;
      case "login":
        setLoginFilter({
          admin: "",
          dateRange: { start: null, end: null },
          status: "",
          ipAddress: "",
        });
        break;
      case "system":
        setSystemFilter({
          setting: "",
          admin: "",
          dateRange: { start: null, end: null },
          category: "",
        });
        break;
      default:
        break;
    }
  };

  // Render status chip
  const renderStatusChip = (status) => {
    let color = "default";
    let icon = null;

    switch (status) {
      case "success":
        color = "success";
        break;
      case "failed":
        color = "error";
        icon = <ErrorIcon fontSize="small" />;
        break;
      case "warning":
        color = "warning";
        icon = <Warning fontSize="small" />;
        break;
      default:
        break;
    }

    return (
      <Chip
        size="small"
        color={color}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        icon={icon}
      />
    );
  };

  // Render activity logs tab
  const renderActivityLogsTab = () => {
    const filteredLogs = getFilteredActivityLogs();

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Activity Logs
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Search actions..."
              size="small"
              value={activityFilter.keyword}
              onChange={(e) =>
                setActivityFilter({
                  ...activityFilter,
                  keyword: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title="Advanced Filters">
              <IconButton
                onClick={() => setActivityFilterOpen(!activityFilterOpen)}
              >
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={
                    !activityFilter.admin &&
                    !activityFilter.status &&
                    !activityFilter.dateRange.start
                  }
                >
                  <FilterList />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <IconButton
                onClick={() => handleExportLogs("Activity")}
                disabled={exporting}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {activityFilterOpen && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Admin Email"
                  size="small"
                  fullWidth
                  value={activityFilter.admin}
                  onChange={(e) =>
                    setActivityFilter({
                      ...activityFilter,
                      admin: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="From Date"
                    value={activityFilter.dateRange.start}
                    onChange={(date) =>
                      setActivityFilter({
                        ...activityFilter,
                        dateRange: { ...activityFilter.dateRange, start: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="To Date"
                    value={activityFilter.dateRange.end}
                    onChange={(date) =>
                      setActivityFilter({
                        ...activityFilter,
                        dateRange: { ...activityFilter.dateRange, end: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={activityFilter.status}
                    label="Status"
                    onChange={(e) =>
                      setActivityFilter({
                        ...activityFilter,
                        status: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button onClick={() => resetFilters("activity")} sx={{ mr: 1 }}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setActivityFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", bgcolor: "transparent" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell align="center">
                      {renderStatusChip(log.status)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedActivity(log)}
                      >
                        <Info fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No activity logs found matching the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Render login logs tab
  const renderLoginLogsTab = () => {
    const filteredLogs = getFilteredLoginLogs();

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Login History
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Search by email..."
              size="small"
              value={loginFilter.admin}
              onChange={(e) =>
                setLoginFilter({ ...loginFilter, admin: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title="Advanced Filters">
              <IconButton onClick={() => setLoginFilterOpen(!loginFilterOpen)}>
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={
                    !loginFilter.ipAddress &&
                    !loginFilter.status &&
                    !loginFilter.dateRange.start
                  }
                >
                  <FilterList />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <IconButton
                onClick={() => handleExportLogs("Login")}
                disabled={exporting}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {loginFilterOpen && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="IP Address"
                  size="small"
                  fullWidth
                  value={loginFilter.ipAddress}
                  onChange={(e) =>
                    setLoginFilter({
                      ...loginFilter,
                      ipAddress: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="From Date"
                    value={loginFilter.dateRange.start}
                    onChange={(date) =>
                      setLoginFilter({
                        ...loginFilter,
                        dateRange: { ...loginFilter.dateRange, start: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="To Date"
                    value={loginFilter.dateRange.end}
                    onChange={(date) =>
                      setLoginFilter({
                        ...loginFilter,
                        dateRange: { ...loginFilter.dateRange, end: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={loginFilter.status}
                    label="Status"
                    onChange={(e) =>
                      setLoginFilter({ ...loginFilter, status: e.target.value })
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button onClick={() => resetFilters("login")} sx={{ mr: 1 }}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setLoginFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", bgcolor: "transparent" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Admin</TableCell>
                <TableCell>Login Time</TableCell>
                <TableCell>Logout Time</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Device</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>{formatDate(log.loginTimestamp)}</TableCell>
                    <TableCell>{formatDate(log.logoutTimestamp)}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{log.userAgent}</TableCell>
                    <TableCell align="center">
                      {renderStatusChip(log.status)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedLogin(log)}
                      >
                        <Info fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No login logs found matching the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Render system changes tab
  const renderSystemChangesTab = () => {
    const filteredChanges = getFilteredSystemChanges();

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            System Change Tracker
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Search settings..."
              size="small"
              value={systemFilter.setting}
              onChange={(e) =>
                setSystemFilter({ ...systemFilter, setting: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Settings fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title="Advanced Filters">
              <IconButton
                onClick={() => setSystemFilterOpen(!systemFilterOpen)}
              >
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={
                    !systemFilter.admin &&
                    !systemFilter.category &&
                    !systemFilter.dateRange.start
                  }
                >
                  <FilterList />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <IconButton
                onClick={() => handleExportLogs("System Changes")}
                disabled={exporting}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {systemFilterOpen && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Changed By"
                  size="small"
                  fullWidth
                  value={systemFilter.admin}
                  onChange={(e) =>
                    setSystemFilter({ ...systemFilter, admin: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="From Date"
                    value={systemFilter.dateRange.start}
                    onChange={(date) =>
                      setSystemFilter({
                        ...systemFilter,
                        dateRange: { ...systemFilter.dateRange, start: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="To Date"
                    value={systemFilter.dateRange.end}
                    onChange={(date) =>
                      setSystemFilter({
                        ...systemFilter,
                        dateRange: { ...systemFilter.dateRange, end: date },
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={systemFilter.category}
                    label="Category"
                    onChange={(e) =>
                      setSystemFilter({
                        ...systemFilter,
                        category: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Security">Security</MenuItem>
                    <MenuItem value="API Integrations">
                      API Integrations
                    </MenuItem>
                    <MenuItem value="System">System</MenuItem>
                    <MenuItem value="Notifications">Notifications</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button onClick={() => resetFilters("system")} sx={{ mr: 1 }}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSystemFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", bgcolor: "transparent" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Setting</TableCell>
                <TableCell>Old Value</TableCell>
                <TableCell>New Value</TableCell>
                <TableCell>Changed By</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredChanges.length > 0 ? (
                filteredChanges.map((change) => (
                  <TableRow key={change.id} hover>
                    <TableCell>{change.setting}</TableCell>
                    <TableCell>{change.oldValue}</TableCell>
                    <TableCell>{change.newValue}</TableCell>
                    <TableCell>{change.changedBy}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={change.category}
                        color={
                          change.category === "Security" ? "error" : "default"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{formatDate(change.timestamp)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedChange(change)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No system changes found matching the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Render settings tab
  const renderSettingsTab = () => {
    return (
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
          Audit Log Settings
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Suspicious Activity Alerts
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.alertSuspicious}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    alertSuspicious: e.target.checked,
                  })
                }
              />
            }
            label="Enable alerts for suspicious activities"
          />

          {settings.alertSuspicious && (
            <Box sx={{ mt: 2, ml: 4 }}>
              <FormControl fullWidth size="small" sx={{ maxWidth: 300 }}>
                <InputLabel>Alert Method</InputLabel>
                <Select
                  value={settings.alertMethod}
                  label="Alert Method"
                  onChange={(e) =>
                    setSettings({ ...settings, alertMethod: e.target.value })
                  }
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="both">Both Email & SMS</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Alerts will be sent for: failed login attempts, IP blocks,
                unusual login locations, and critical setting changes.
              </Typography>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Log Retention
          </Typography>

          <TextField
            label="Log Retention Period (days)"
            type="number"
            value={settings.retentionPeriod}
            onChange={(e) =>
              setSettings({
                ...settings,
                retentionPeriod: Number(e.target.value),
              })
            }
            inputProps={{ min: 30, max: 3650 }}
            fullWidth
            sx={{ maxWidth: 300, mb: 2 }}
            size="small"
            helperText="Minimum: 30 days, Maximum: 10 years (3650 days)"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.archiveOldLogs}
                onChange={(e) =>
                  setSettings({ ...settings, archiveOldLogs: e.target.checked })
                }
              />
            }
            label="Archive logs older than retention period (instead of deleting)"
          />

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Archived logs can be retrieved on request but won't appear in the
            regular log views.
          </Typography>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Logging & Audit
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="audit log tabs"
          >
            <Tab label="Activity Logs" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Login History" id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="System Changes" id="tab-2" aria-controls="tabpanel-2" />
            <Tab label="Settings" id="tab-3" aria-controls="tabpanel-3" />
          </Tabs>
        </Box>

        <Box
          role="tabpanel"
          hidden={activeTab !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
        >
          {activeTab === 0 && renderActivityLogsTab()}
        </Box>
        <Box
          role="tabpanel"
          hidden={activeTab !== 1}
          id="tabpanel-1"
          aria-labelledby="tab-1"
        >
          {activeTab === 1 && renderLoginLogsTab()}
        </Box>
        <Box
          role="tabpanel"
          hidden={activeTab !== 2}
          id="tabpanel-2"
          aria-labelledby="tab-2"
        >
          {activeTab === 2 && renderSystemChangesTab()}
        </Box>
        <Box
          role="tabpanel"
          hidden={activeTab !== 3}
          id="tabpanel-3"
          aria-labelledby="tab-3"
        >
          {activeTab === 3 && renderSettingsTab()}
        </Box>
      </CardContent>

      {/* Activity Log Details Dialog */}
      <Dialog
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Activity Log Details
          <IconButton onClick={() => setSelectedActivity(null)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedActivity && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Action</Typography>
                <Typography variant="body2">
                  {selectedActivity.action}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography variant="body2">
                  {formatDate(selectedActivity.timestamp)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Admin</Typography>
                <Typography variant="body2">
                  {selectedActivity.admin}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">IP Address</Typography>
                <Typography variant="body2">
                  {selectedActivity.ipAddress}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">User Agent</Typography>
                <Typography variant="body2">
                  {selectedActivity.userAgent}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography variant="body2">
                  {renderStatusChip(selectedActivity.status)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">Details</Typography>
                {selectedActivity.status === "failed" ? (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Error: {selectedActivity.details.error}
                  </Alert>
                ) : (
                  <TableContainer
                    component={Paper}
                    sx={{ mt: 1, boxShadow: "none" }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Field</TableCell>
                          <TableCell>Old Value</TableCell>
                          <TableCell>New Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedActivity.details.changes?.map(
                          (change, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{change.field}</TableCell>
                              <TableCell>{change.oldValue || "--"}</TableCell>
                              <TableCell>{change.newValue || "--"}</TableCell>
                            </TableRow>
                          )
                        ) || (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              No changes recorded
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Log Details Dialog */}
      <Dialog
        open={!!selectedLogin}
        onClose={() => setSelectedLogin(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Login Session Details
          <IconButton onClick={() => setSelectedLogin(null)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedLogin && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Admin</Typography>
                <Typography variant="body2">{selectedLogin.admin}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography variant="body2">
                  {renderStatusChip(selectedLogin.status)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Login Time</Typography>
                <Typography variant="body2">
                  {formatDate(selectedLogin.loginTimestamp)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Logout Time</Typography>
                <Typography variant="body2">
                  {formatDate(selectedLogin.logoutTimestamp) || "--"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">IP Address</Typography>
                <Typography variant="body2">
                  {selectedLogin.ipAddress}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Device / User Agent</Typography>
                <Typography variant="body2">
                  {selectedLogin.userAgent}
                </Typography>
              </Grid>
              {selectedLogin.status === "success" && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Session Duration</Typography>
                  <Typography variant="body2">
                    {selectedLogin.sessionDuration || "--"}
                  </Typography>
                </Grid>
              )}
              {selectedLogin.status === "failed" && (
                <Grid item xs={12}>
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Failure Reason: {selectedLogin.failureReason}
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      {/* System Change Details Dialog */}
      <Dialog
        open={!!selectedChange}
        onClose={() => setSelectedChange(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          System Change Details
          <IconButton onClick={() => setSelectedChange(null)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedChange && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Setting</Typography>
                <Typography variant="body2">
                  {selectedChange.setting}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Category</Typography>
                <Typography variant="body2">
                  <Chip
                    size="small"
                    label={selectedChange.category}
                    color={
                      selectedChange.category === "Security"
                        ? "error"
                        : "default"
                    }
                    variant="outlined"
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Changed By</Typography>
                <Typography variant="body2">
                  {selectedChange.changedBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography variant="body2">
                  {formatDate(selectedChange.timestamp)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">Change Details</Typography>
                <TableContainer
                  component={Paper}
                  sx={{ mt: 1, boxShadow: "none" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Setting</TableCell>
                        <TableCell>Old Value</TableCell>
                        <TableCell>New Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedChange.setting}</TableCell>
                        <TableCell>{selectedChange.oldValue}</TableCell>
                        <TableCell>{selectedChange.newValue}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {selectedChange.category === "Security" && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Security-related setting changes require additional
                    verification and are logged with high priority.
                  </Alert>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
