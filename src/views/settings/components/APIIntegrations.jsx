import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Alert,
  Tooltip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ContentCopy,
  Add,
  Delete,
  Refresh,
  ExpandMore,
  Send,
  Warning,
  CheckCircle,
  Error,
} from "@mui/icons-material";

export default function APIIntegrations() {
  // API Key Management
  const [apiKeys, setApiKeys] = useState([
    { 
      id: "key1",
      name: "Partner App V1", 
      key: "sk_live_************", 
      active: true, 
      createdAt: "2023-10-15T14:30:00Z",
      createdBy: "admin@example.com",
      scope: "full-access",
      lastUsed: "2023-11-01T09:15:22Z"
    },
  ]);
  const [newKeyDialog, setNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState("full-access");
  const [generatedKey, setGeneratedKey] = useState("");
  const [showGeneratedKey, setShowGeneratedKey] = useState(false);
  const [revokeKeyDialog, setRevokeKeyDialog] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState(null);
  
  // Crypto Price Feed Source
  const [priceSource, setPriceSource] = useState("CoinGecko");
  const [priceInterval, setPriceInterval] = useState("60");
  const [lastSyncTime, setLastSyncTime] = useState("2023-11-05T10:30:45Z");
  const [syncStatus, setSyncStatus] = useState("success"); // success, warning, error
  
  // Fraud Detection API
  const [fraudApiEnabled, setFraudApiEnabled] = useState(true);
  const [fraudApiProvider, setFraudApiProvider] = useState("Chainalysis");
  const [fraudApiToken, setFraudApiToken] = useState("fd_live_************");
  const [showFraudApiToken, setShowFraudApiToken] = useState(false);
  const [fraudApiTimeout, setFraudApiTimeout] = useState("2");
  const [fraudApiHealth, setFraudApiHealth] = useState("healthy"); // healthy, degraded, down
  
  // Webhook Configuration
  const [webhooks, setWebhooks] = useState([
    { 
      id: "wh1",
      event: "order.completed", 
      url: "https://partner.example.com/webhooks/orders",
      authToken: "wh_token_************",
      retries: 3,
      retryInterval: 30,
      active: true,
      lastDelivery: {
        status: "success",
        timestamp: "2023-11-04T16:45:12Z",
        responseCode: 200
      }
    },
  ]);
  const [webhookDialog, setWebhookDialog] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [newWebhook, setNewWebhook] = useState({
    event: "",
    url: "",
    authToken: "",
    retries: 3,
    retryInterval: 30,
    active: true
  });
  const [testWebhookDialog, setTestWebhookDialog] = useState(false);
  const [webhookToTest, setWebhookToTest] = useState(null);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testWebhookResult, setTestWebhookResult] = useState(null);
  
  // General
  const [saving, setSaving] = useState(false);

  // Mock function to generate a new API key
  const generateApiKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk_live_';
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Handle creating a new API key
  const handleCreateKey = () => {
    const newKey = generateApiKey();
    setGeneratedKey(newKey);
    
    const newKeyObj = {
      id: `key${apiKeys.length + 1}`,
      name: newKeyName,
      key: newKey,
      active: true,
      createdAt: new Date().toISOString(),
      createdBy: "current_admin@example.com",
      scope: newKeyScope,
      lastUsed: null
    };
    
    setApiKeys([...apiKeys, newKeyObj]);
    setShowGeneratedKey(true);
  };

  // Handle revoking an API key
  const handleRevokeKey = () => {
    if (keyToRevoke) {
      const updatedKeys = apiKeys.map(key => 
        key.id === keyToRevoke.id ? { ...key, active: false } : key
      );
      setApiKeys(updatedKeys);
      setRevokeKeyDialog(false);
      setKeyToRevoke(null);
    }
  };

  // Handle adding or updating a webhook
  const handleSaveWebhook = () => {
    if (editingWebhook) {
      // Update existing webhook
      const updatedWebhooks = webhooks.map(webhook => 
        webhook.id === editingWebhook.id ? { ...newWebhook, id: editingWebhook.id } : webhook
      );
      setWebhooks(updatedWebhooks);
    } else {
      // Add new webhook
      const webhookObj = {
        id: `wh${webhooks.length + 1}`,
        ...newWebhook,
        lastDelivery: null
      };
      setWebhooks([...webhooks, webhookObj]);
    }
    setWebhookDialog(false);
    setEditingWebhook(null);
    setNewWebhook({
      event: "",
      url: "",
      authToken: "",
      retries: 3,
      retryInterval: 30,
      active: true
    });
  };

  // Handle testing a webhook
  const handleTestWebhook = () => {
    setTestingWebhook(true);
    // Simulate webhook test
    setTimeout(() => {
      setTestingWebhook(false);
      setTestWebhookResult({
        success: true,
        statusCode: 200,
        response: "{ \"status\": \"received\" }",
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  // Handle saving all settings
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // Here you would call your API to save settings
      alert("API integration settings saved!");
    }, 1000);
  };

  // Simulate price feed sync
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncTime(new Date().toISOString());
    }, parseInt(priceInterval) * 1000);
    return () => clearInterval(interval);
  }, [priceInterval]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* API Key Management Section */}
      <Card sx={{ bgcolor: "white", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              1. API Key Management
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => setNewKeyDialog(true)}
            >
              Generate New API Key
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage API keys for third-party services or partner platforms. Keys are shown only once upon creation for security.
          </Typography>
          
          <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>API Key</TableCell>
                  <TableCell>Scope</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.key.substring(0, 8)}{'*'.repeat(16)}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.scope} 
                        size="small" 
                        color={item.scope === 'full-access' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell>
                      <Chip 
                        label={item.active ? 'Active' : 'Revoked'} 
                        size="small" 
                        color={item.active ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      {item.active && (
                        <Button 
                          variant="outlined" 
                          color="error" 
                          size="small"
                          onClick={() => {
                            setKeyToRevoke(item);
                            setRevokeKeyDialog(true);
                          }}
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Crypto Price Feed Source Section */}
      <Card sx={{ bgcolor: "white", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            2. Crypto Price Feed Source
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select your preferred provider for real-time cryptocurrency pricing data.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Price Data Provider"
                value={priceSource}
                onChange={(e) => setPriceSource(e.target.value)}
                fullWidth
                helperText="Select the source for cryptocurrency price data"
              >
                {["CoinGecko", "CoinMarketCap", "Binance", "CryptoCompare"].map((src) => (
                  <MenuItem key={src} value={src}>
                    {src}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Sync Interval (seconds)"
                type="number"
                value={priceInterval}
                onChange={(e) => setPriceInterval(e.target.value)}
                fullWidth
                helperText="How often to refresh price data (in seconds)"
                InputProps={{
                  endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2">Last Successful Sync</Typography>
                    <Typography variant="body2">
                      {new Date(lastSyncTime).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      icon={syncStatus === 'success' ? <CheckCircle /> : <Warning />}
                      label={syncStatus === 'success' ? 'Healthy' : 'Issues Detected'} 
                      color={syncStatus === 'success' ? 'success' : 'warning'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton size="small" onClick={() => setLastSyncTime(new Date().toISOString())}>
                      <Refresh />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Fraud Detection API Section */}
      <Card sx={{ bgcolor: "white", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              3. Fraud Detection API
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={fraudApiEnabled} 
                  onChange={(e) => setFraudApiEnabled(e.target.checked)} 
                  color="primary"
                />
              }
              label={fraudApiEnabled ? "Enabled" : "Disabled"}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure integration with third-party fraud detection services to screen transactions and wallet addresses.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Fraud Detection Provider"
                value={fraudApiProvider}
                onChange={(e) => setFraudApiProvider(e.target.value)}
                fullWidth
                disabled={!fraudApiEnabled}
              >
                {["Chainalysis", "Elliptic", "TRM Labs"].map((provider) => (
                  <MenuItem key={provider} value={provider}>
                    {provider}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="API Timeout (seconds)"
                type="number"
                value={fraudApiTimeout}
                onChange={(e) => setFraudApiTimeout(e.target.value)}
                fullWidth
                disabled={!fraudApiEnabled}
                helperText="Maximum time to wait for API response"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="API Token"
                type={showFraudApiToken ? "text" : "password"}
                value={fraudApiToken}
                onChange={(e) => setFraudApiToken(e.target.value)}
                fullWidth
                disabled={!fraudApiEnabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowFraudApiToken((v) => !v)}
                        edge="end"
                      >
                        {showFraudApiToken ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">API Health Status</Typography>
                  <Chip 
                    icon={
                      fraudApiHealth === 'healthy' ? <CheckCircle /> : 
                      fraudApiHealth === 'degraded' ? <Warning /> : <Error />
                    }
                    label={
                      fraudApiHealth === 'healthy' ? 'Healthy' : 
                      fraudApiHealth === 'degraded' ? 'Degraded Performance' : 'Down'
                    } 
                    color={
                      fraudApiHealth === 'healthy' ? 'success' : 
                      fraudApiHealth === 'degraded' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Webhook Configuration Section */}
      <Card sx={{ bgcolor: "white", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              4. Webhook Configuration
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => {
                setEditingWebhook(null);
                setNewWebhook({
                  event: "",
                  url: "",
                  authToken: "",
                  retries: 3,
                  retryInterval: 30,
                  active: true
                });
                setWebhookDialog(true);
              }}
            >
              Add Webhook
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure outbound webhook endpoints for triggering real-time notifications to external systems.
          </Typography>
          
          <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event</TableCell>
                  <TableCell>Endpoint URL</TableCell>
                  <TableCell>Retry Policy</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Delivery</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>{webhook.event}</TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {webhook.url}
                    </TableCell>
                    <TableCell>{webhook.retries} retries, {webhook.retryInterval}s interval</TableCell>
                    <TableCell>
                      <Chip 
                        label={webhook.active ? 'Active' : 'Inactive'} 
                        size="small" 
                        color={webhook.active ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      {webhook.lastDelivery ? (
                        <Tooltip title={new Date(webhook.lastDelivery.timestamp).toLocaleString()}>
                          <Chip 
                            label={webhook.lastDelivery.status} 
                            size="small" 
                            color={
                              webhook.lastDelivery.status === 'success' ? 'success' : 
                              webhook.lastDelivery.status === 'failed' ? 'error' : 'warning'
                            }
                          />
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" color="text.secondary">Never sent</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => {
                            setEditingWebhook(webhook);
                            setNewWebhook({
                              event: webhook.event,
                              url: webhook.url,
                              authToken: webhook.authToken,
                              retries: webhook.retries,
                              retryInterval: webhook.retryInterval,
                              active: webhook.active
                            });
                            setWebhookDialog(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          size="small"
                          onClick={() => {
                            setWebhookToTest(webhook);
                            setTestWebhookDialog(true);
                            setTestWebhookResult(null);
                          }}
                        >
                          Test
                        </Button>
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => {
                            setWebhooks(webhooks.filter(w => w.id !== webhook.id));
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </Box>

      {/* New API Key Dialog */}
      <Dialog open={newKeyDialog} onClose={() => setNewKeyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Create a new API key for third-party integrations. The key will only be shown once for security reasons.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Key Name"
            fullWidth
            variant="outlined"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="e.g., Partner App V2"
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Access Scope</InputLabel>
            <Select
              value={newKeyScope}
              onChange={(e) => setNewKeyScope(e.target.value)}
              label="Access Scope"
            >
              <MenuItem value="full-access">Full Access</MenuItem>
              <MenuItem value="read-only">Read Only</MenuItem>
              <MenuItem value="write-only">Write Only</MenuItem>
            </Select>
          </FormControl>
          
          {generatedKey && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Your API Key (copy it now, it won't be shown again):</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showGeneratedKey ? "text" : "password"}
                  value={generatedKey}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowGeneratedKey(!showGeneratedKey)}>
                          {showGeneratedKey ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <IconButton onClick={() => navigator.clipboard.writeText(generatedKey)}>
                          <ContentCopy />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewKeyDialog(false)}>Cancel</Button>
          {!generatedKey ? (
            <Button onClick={handleCreateKey} variant="contained" color="primary" disabled={!newKeyName}>
              Generate Key
            </Button>
          ) : (
            <Button onClick={() => setNewKeyDialog(false)} variant="contained" color="primary">
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Revoke API Key Dialog */}
      <Dialog open={revokeKeyDialog} onClose={() => setRevokeKeyDialog(false)}>
        <DialogTitle>Revoke API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to revoke the API key "{keyToRevoke?.name}"? This action cannot be undone, and any services using this key will no longer have access.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRevokeKeyDialog(false)}>Cancel</Button>
          <Button onClick={handleRevokeKey} variant="contained" color="error">
            Revoke Key
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Webhook Dialog */}
      <Dialog open={webhookDialog} onClose={() => setWebhookDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingWebhook ? "Edit Webhook" : "Add New Webhook"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Event Type"
                fullWidth
                value={newWebhook.event}
                onChange={(e) => setNewWebhook({...newWebhook, event: e.target.value})}
              >
                {[
                  "order.created", 
                  "order.completed", 
                  "order.cancelled", 
                  "user.verified", 
                  "transaction.confirmed",
                  "wallet.funded"
                ].map((event) => (
                  <MenuItem key={event} value={event}>{event}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={newWebhook.active} 
                    onChange={(e) => setNewWebhook({...newWebhook, active: e.target.checked})} 
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Webhook URL"
                fullWidth
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                placeholder="https://your-service.com/webhook"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Authentication Token (optional)"
                fullWidth
                value={newWebhook.authToken}
                onChange={(e) => setNewWebhook({...newWebhook, authToken: e.target.value})}
                placeholder="Bearer token or API key for webhook authentication"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Retry Attempts"
                type="number"
                fullWidth
                value={newWebhook.retries}
                onChange={(e) => setNewWebhook({...newWebhook, retries: parseInt(e.target.value)})}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Retry Interval (seconds)"
                type="number"
                fullWidth
                value={newWebhook.retryInterval}
                onChange={(e) => setNewWebhook({...newWebhook, retryInterval: parseInt(e.target.value)})}
                InputProps={{ inputProps: { min: 5, max: 300 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWebhookDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveWebhook} 
            variant="contained" 
            color="primary"
            disabled={!newWebhook.event || !newWebhook.url}
          >
            {editingWebhook ? "Update" : "Add"} Webhook
          </Button>
        </DialogActions>
      </Dialog>

      {/* Test Webhook Dialog */}
      <Dialog open={testWebhookDialog} onClose={() => setTestWebhookDialog(false)}>
        <DialogTitle>Test Webhook</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Send a test payload to the webhook endpoint for event: <strong>{webhookToTest?.event}</strong>
          </DialogContentText>
          
          {testingWebhook ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : testWebhookResult ? (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={testWebhookResult.success ? <CheckCircle /> : <Error />}
                    label={testWebhookResult.success ? "Success" : "Failed"} 
                    color={testWebhookResult.success ? "success" : "error"}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography>
                    Status: {testWebhookResult.statusCode}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2">Response:</Typography>
                <Paper sx={{ p: 1, bgcolor: '#f5f5f5', mt: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                    {testWebhookResult.response}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Timestamp: {new Date(testWebhookResult.timestamp).toLocaleString()}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestWebhookDialog(false)}>
            Close
          </Button>
          <Button 
            onClick={handleTestWebhook} 
            variant="contained" 
            color="primary"
            disabled={testingWebhook}
            startIcon={<Send />}
          >
            {testingWebhook ? "Sending..." : "Send Test"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
