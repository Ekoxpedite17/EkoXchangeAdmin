import React, { useState, useEffect } from "react";
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
  CircularProgress,
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
import { EkoServices_Settings } from "../../../services";

export default function LoggingAudit() {
  const [activeTab, setActiveTab] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  // State for activity logs
  const [activityLogs, setActivityLogs] = useState([]);
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
  const [loadingActivity, setLoadingActivity] = useState(false);

  // State for login logs
  const [loginLogs, setLoginLogs] = useState([]);
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
  const [loadingLogin, setLoadingLogin] = useState(false);

  // State for system changes
  const [systemChanges, setSystemChanges] = useState([]);
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
  const [loadingSystem, setLoadingSystem] = useState(false);

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

  // Fetch logs data from API
  const fetchLogsData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setLoadingActivity(true);
        setLoadingLogin(true);
        setLoadingSystem(true);
      } else {
        setInitialLoading(true);
      }

      const response = await EkoServices_Settings.getSettingsAudits({
        skip: 0,
        limit: 100,
      });

      if (response && response.logs) {
        const logs = response.logs;

        // Set all logs to all three arrays since they contain the same data structure
        setActivityLogs(logs);
        setLoginLogs(logs);
        setSystemChanges(logs);
      } else {
        console.warn("No logs data received from API");
        // Set empty arrays if no data
        setActivityLogs([]);
        setLoginLogs([]);
        setSystemChanges([]);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      // Set empty arrays on error
      setActivityLogs([]);
      setLoginLogs([]);
      setSystemChanges([]);
    } finally {
      if (isRefresh) {
        setLoadingActivity(false);
        setLoadingLogin(false);
        setLoadingSystem(false);
      } else {
        setInitialLoading(false);
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLogsData(false);
  }, []);

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

  // Handle refresh
  const handleRefresh = () => {
    fetchLogsData(true);
  };

  const getFilteredActivityLogs = () => {
    return activityLogs.filter((log) => {
      if (
        activityFilter.keyword &&
        !log.description
          .toLowerCase()
          .includes(activityFilter.keyword.toLowerCase())
      ) {
        return false;
      }

      if (
        activityFilter.admin &&
        !log.fullName.toLowerCase().includes(activityFilter.admin.toLowerCase())
      ) {
        return false;
      }

      if (activityFilter.status && log.status !== activityFilter.status) {
        return false;
      }

      if (
        activityFilter.dateRange.start &&
        new Date(log.createdAt) < new Date(activityFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        activityFilter.dateRange.end &&
        new Date(log.createdAt) > new Date(activityFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

  const getFilteredLoginLogs = () => {
    return loginLogs.filter((log) => {
      if (
        loginFilter.admin &&
        !log.fullName.toLowerCase().includes(loginFilter.admin.toLowerCase())
      ) {
        return false;
      }

      if (loginFilter.status && log.status !== loginFilter.status) {
        return false;
      }

      if (
        loginFilter.ipAddress &&
        !log.ipAddress.includes(loginFilter.ipAddress)
      ) {
        return false;
      }

      if (
        loginFilter.dateRange.start &&
        new Date(log.createdAt) < new Date(loginFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        loginFilter.dateRange.end &&
        new Date(log.createdAt) > new Date(loginFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

  const getFilteredSystemChanges = () => {
    return systemChanges.filter((change) => {
      if (
        systemFilter.setting &&
        !change.description
          .toLowerCase()
          .includes(systemFilter.setting.toLowerCase())
      ) {
        return false;
      }

      if (
        systemFilter.admin &&
        !change.fullName
          .toLowerCase()
          .includes(systemFilter.admin.toLowerCase())
      ) {
        return false;
      }

      if (systemFilter.category && change.category !== systemFilter.category) {
        return false;
      }

      if (
        systemFilter.dateRange.start &&
        new Date(change.createdAt) < new Date(systemFilter.dateRange.start)
      ) {
        return false;
      }

      if (
        systemFilter.dateRange.end &&
        new Date(change.createdAt) > new Date(systemFilter.dateRange.end)
      ) {
        return false;
      }

      return true;
    });
  };

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
              placeholder="Search descriptions..."
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
              <IconButton onClick={handleRefresh}>
                {loadingActivity ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Refresh />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {activityFilterOpen && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Admin Name"
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
                <TableCell>Description</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingActivity ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={20} />
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log._id} hover>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.fullName}</TableCell>
                    <TableCell>{formatDate(log.createdAt)}</TableCell>
                    <TableCell>{log.createdBy}</TableCell>
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
                  <TableCell colSpan={5} align="center">
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
              placeholder="Search by name..."
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
              <IconButton onClick={handleRefresh}>
                {loadingLogin ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Refresh />
                )}
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
                <TableCell>Description</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingLogin ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={20} />
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log._id} hover>
                    <TableCell>{log.fullName}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{formatDate(log.createdAt)}</TableCell>
                    <TableCell>{log.createdBy}</TableCell>
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
                  <TableCell colSpan={5} align="center">
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
              placeholder="Search descriptions..."
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
              <IconButton onClick={handleRefresh}>
                {loadingSystem ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Refresh />
                )}
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
                <TableCell>Description</TableCell>
                <TableCell>Changed By</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingSystem ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={20} />
                  </TableCell>
                </TableRow>
              ) : filteredChanges.length > 0 ? (
                filteredChanges.map((change) => (
                  <TableRow key={change._id} hover>
                    <TableCell>{change.description}</TableCell>
                    <TableCell>{change.fullName}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          change.description.includes("auth")
                            ? "Security"
                            : change.description.includes("admin")
                              ? "System"
                              : "General"
                        }
                        color={
                          change.description.includes("auth")
                            ? "error"
                            : "default"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{formatDate(change.createdAt)}</TableCell>
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
                  <TableCell colSpan={5} align="center">
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

        {initialLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
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
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body2">
                  {selectedActivity.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography variant="body2">
                  {formatDate(selectedActivity.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Admin</Typography>
                <Typography variant="body2">
                  {selectedActivity.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Created By</Typography>
                <Typography variant="body2">
                  {selectedActivity.createdBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Updated By</Typography>
                <Typography variant="body2">
                  {selectedActivity.updatedBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Record ID</Typography>
                <Typography variant="body2">{selectedActivity.id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">Additional Details</Typography>
                <TableContainer
                  component={Paper}
                  sx={{ mt: 1, boxShadow: "none" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>MongoDB ID</TableCell>
                        <TableCell>{selectedActivity._id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Version</TableCell>
                        <TableCell>{selectedActivity.__v}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Updated At</TableCell>
                        <TableCell>
                          {formatDate(selectedActivity.updatedAt)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
                <Typography variant="body2">
                  {selectedLogin.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body2">
                  {selectedLogin.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography variant="body2">
                  {formatDate(selectedLogin.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Created By</Typography>
                <Typography variant="body2">
                  {selectedLogin.createdBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Updated By</Typography>
                <Typography variant="body2">
                  {selectedLogin.updatedBy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Record ID</Typography>
                <Typography variant="body2">{selectedLogin.id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">Additional Details</Typography>
                <TableContainer
                  component={Paper}
                  sx={{ mt: 1, boxShadow: "none" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>MongoDB ID</TableCell>
                        <TableCell>{selectedLogin._id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Version</TableCell>
                        <TableCell>{selectedLogin.__v}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Updated At</TableCell>
                        <TableCell>
                          {formatDate(selectedLogin.updatedAt)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
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
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body2">
                  {selectedChange.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Category</Typography>
                <Typography variant="body2">
                  <Chip
                    size="small"
                    label={
                      selectedChange.description.includes("auth")
                        ? "Security"
                        : selectedChange.description.includes("admin")
                          ? "System"
                          : "General"
                    }
                    color={
                      selectedChange.description.includes("auth")
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
                  {selectedChange.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography variant="body2">
                  {formatDate(selectedChange.createdAt)}
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
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{selectedChange.description}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Created By</TableCell>
                        <TableCell>{selectedChange.createdBy}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Updated By</TableCell>
                        <TableCell>{selectedChange.updatedBy}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Record ID</TableCell>
                        <TableCell>{selectedChange.id}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {selectedChange.description.includes("auth") && (
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
