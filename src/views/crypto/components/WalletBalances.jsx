import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Stack,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import { EkoServices_Crypty } from "../../../services";

const WalletBalances = () => {
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openOnboarding, setOpenOnboarding] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [openNetworkModal, setOpenNetworkModal] = useState(false);

  const fetchDatas = async () => {
    try {
      const [ratesResult, balancesResult] = await Promise.allSettled([
        EkoServices_Crypty.getRates(0, 30),
        EkoServices_Crypty.refreshWalletBalances(),
      ]);

      if (balancesResult.status === "fulfilled") {
        const response = balancesResult.value;
        const mappedBalances = response.balances.map((item) => ({
          currency: item.symbol,
          amount: item.balance,
          usdValue: item.usdValue,
          status: parseFloat(item.balance) > 0 ? "healthy" : "empty",
        }));
        setBalances(mappedBalances);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleOpenOnboarding = () => {
    setOpenOnboarding(true);
    setError("");
    setSuccess("");
  };

  const handleCloseOnboarding = () => {
    setOpenOnboarding(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

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

      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5">Wallet Balances</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenOnboarding}
                sx={{ color: "white" }}
              >
                Add New Crypto
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenNetworkModal(true)}
              >
                Add Network
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {balances?.map((balance) => (
              <Grid item xs={12} sm={6} md={4} key={balance.currency}>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">{balance.currency}</Typography>
                      <Chip
                        label={balance.status}
                        color={
                          balance.status === "healthy" ? "success" : "error"
                        }
                        size="small"
                      />
                    </Box>
                    <Typography variant="h4">{balance.amount}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ≈ ${balance.usdValue}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <CryptoOnboardingModal
        open={openOnboarding}
        onClose={handleCloseOnboarding}
        onSuccess={() => {
          setSuccess("Crypto asset onboarded successfully!");
          fetchDatas();
          setTimeout(() => setSuccess(""), 3000);
        }}
      />

      <NetworkModal
        open={openNetworkModal}
        onClose={() => setOpenNetworkModal(false)}
        onSave={(data) => {
          console.log("Collected payload:", data);
        }}
      />
    </Box>
  );
};

function NetworkModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    nativeToken: "",
    explorerUrl: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Network Name is required";
    if (!form.nativeToken) newErrors.nativeToken = "Native Token is required";
    if (!form.explorerUrl) newErrors.explorerUrl = "Explorer URL is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await EkoServices_Crypty.createNetwork(form);
      onSave(response);
      onClose();
      setForm({
        name: "",
        nativeToken: "",
        explorerUrl: "",
        isActive: true,
      });
      setErrors({});
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Failed to create network. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    if (!loading) {
      onClose();
      setForm({
        name: "",
        nativeToken: "",
        explorerUrl: "",
        isActive: true,
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add Network</Typography>
          <IconButton onClick={handleDialogClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
          <TextField
            label="Network Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            placeholder="e.g., Ethereum"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Native Token"
            name="nativeToken"
            value={form.nativeToken}
            onChange={handleChange}
            fullWidth
            required
            placeholder="e.g., ETH"
            error={!!errors.nativeToken}
            helperText={errors.nativeToken}
          />
          <TextField
            label="Explorer URL"
            name="explorerUrl"
            value={form.explorerUrl}
            onChange={handleChange}
            fullWidth
            required
            placeholder="https://etherscan.io"
            error={!!errors.explorerUrl}
            helperText={errors.explorerUrl}
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.isActive}
                onChange={handleChange}
                name="isActive"
                color="primary"
              />
            }
            label="Active"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WalletBalances;

// CryptoOnboardingModal component
function CryptoOnboardingModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    tokenName: "",
    tokenSymbol: "",
    network: "",
    contractAddress: "",
    decimals: 18,
    minTransactionAmount: "",
    maxTransactionAmount: "",
    buyEnabled: true,
    sellEnabled: true,
    description: "",
    logoUrl: "",
    websiteUrl: "",
    explorerUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Networks state
  const [networks, setNetworks] = useState([]);
  const [networksLoading, setNetworksLoading] = useState(false);
  const [networksError, setNetworksError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({
        tokenName: "",
        tokenSymbol: "",
        network: "",
        contractAddress: "",
        decimals: 18,
        minTransactionAmount: "",
        maxTransactionAmount: "",
        buyEnabled: true,
        sellEnabled: true,
        description: "",
        logoUrl: "",
        websiteUrl: "",
        explorerUrl: "",
      });
      setErrors({});
      setLoading(false);
      setNetworksError("");
    }
  }, [open]);

  // Fetch networks when modal opens
  useEffect(() => {
    let ignore = false;
    const fetchNetworks = async () => {
      setNetworksLoading(true);
      setNetworksError("");
      try {
        const data = await EkoServices_Crypty.getNetworkList(0, 50);
        // The API response shape is assumed to be { chains: [...] }
        const arr = Array.isArray(data?.chains)
          ? data.chains
          : Array.isArray(data)
            ? data
            : [];
        const mapped = arr.map((network) => ({
          value: network._id || network.id || network.value || network.name,
          label: network.name || network.label || "",
        }));
        if (!ignore) {
          setNetworks(mapped);
        }
      } catch (err) {
        if (!ignore) {
          setNetworks([]);
          setNetworksError("Failed to load networks.");
        }
      } finally {
        if (!ignore) setNetworksLoading(false);
      }
    };
    if (open) {
      fetchNetworks();
    }
    return () => {
      ignore = true;
    };
  }, [open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      general: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.tokenName) newErrors.tokenName = "Token name is required";
    if (!form.tokenSymbol) newErrors.tokenSymbol = "Token symbol is required";
    if (!form.network) newErrors.network = "Please select a network";
    if (!form.buyEnabled && !form.sellEnabled)
      newErrors.general =
        "At least one transaction type (buy or sell) must be enabled";
    return newErrors;
  };

  const handleOnboard = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    const payload = {
      name: form.tokenName,
      symbol: form.tokenSymbol,
      tokenType: form.contractAddress ? "ERC20" : "Native",
      logo: form.logoUrl,
      minimumTransaction: Number(form.minTransactionAmount) || 0,
      maximumTransaction: Number(form.maxTransactionAmount) || 0,
      enableBuy: form.buyEnabled,
      enableSell: form.sellEnabled,
      contractAddress: form.contractAddress || null,
      decimals: form.decimals,
      isActive: true,
      chain: form.network,
    };
    try {
      await EkoServices_Crypty.createToken(payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      let msg =
        e?.response?.data?.message ||
        "Failed to onboard crypto asset. Please try again.";
      setErrors({
        general: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Onboard New Crypto Asset</Typography>
          <IconButton onClick={handleDialogClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
          {/* Basic Information */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Token Name"
                  value={form.tokenName}
                  onChange={(e) => handleChange("tokenName", e.target.value)}
                  fullWidth
                  required
                  placeholder="e.g., Bitcoin, Ethereum"
                  error={!!errors.tokenName}
                  helperText={errors.tokenName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Token Symbol"
                  value={form.tokenSymbol}
                  onChange={(e) =>
                    handleChange("tokenSymbol", e.target.value.toUpperCase())
                  }
                  fullWidth
                  required
                  placeholder="e.g., BTC, ETH"
                  error={!!errors.tokenSymbol}
                  helperText={errors.tokenSymbol}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Network Configuration */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Network Configuration
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.network}>
                  <InputLabel>Network</InputLabel>
                  <Select
                    value={form.network}
                    onChange={(e) => handleChange("network", e.target.value)}
                    label="Network"
                    disabled={networksLoading}
                  >
                    {networksLoading ? (
                      <MenuItem value="">
                        <em>
                          <CircularProgress size={16} sx={{ mr: 1 }} />{" "}
                          Loading...
                        </em>
                      </MenuItem>
                    ) : networksError ? (
                      <MenuItem value="">
                        <em>{networksError}</em>
                      </MenuItem>
                    ) : networks.length === 0 ? (
                      <MenuItem value="">
                        <em>No networks available</em>
                      </MenuItem>
                    ) : (
                      networks.map((network) => (
                        <MenuItem key={network.value} value={network.value}>
                          {network.label}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {errors.network && (
                    <Typography color="error" variant="caption">
                      {errors.network}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contract Address (Optional)"
                  value={form.contractAddress}
                  onChange={(e) =>
                    handleChange("contractAddress", e.target.value)
                  }
                  fullWidth
                  placeholder="0x..."
                  helperText="Required for ERC-20 tokens"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Decimals"
                  type="number"
                  value={form.decimals}
                  onChange={(e) =>
                    handleChange("decimals", parseInt(e.target.value) || 18)
                  }
                  fullWidth
                  inputProps={{ min: 0, max: 18 }}
                  helperText="Number of decimal places (default: 18)"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Transaction Limits */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Transaction Limits
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Minimum Transaction Amount"
                  type="number"
                  value={form.minTransactionAmount}
                  onChange={(e) =>
                    handleChange("minTransactionAmount", e.target.value)
                  }
                  fullWidth
                  inputProps={{ min: 0, step: 0.000001 }}
                  placeholder="0.001"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Maximum Transaction Amount"
                  type="number"
                  value={form.maxTransactionAmount}
                  onChange={(e) =>
                    handleChange("maxTransactionAmount", e.target.value)
                  }
                  fullWidth
                  inputProps={{ min: 0, step: 0.000001 }}
                  placeholder="1000"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Transaction Types */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Transaction Types
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.buyEnabled}
                    onChange={(e) =>
                      handleChange("buyEnabled", e.target.checked)
                    }
                  />
                }
                label="Enable Buy"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.sellEnabled}
                    onChange={(e) =>
                      handleChange("sellEnabled", e.target.checked)
                    }
                  />
                }
                label="Enable Sell"
              />
            </Stack>
          </Box>

          {/* Additional Information */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Additional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Brief description of the crypto asset"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Logo URL"
                  value={form.logoUrl}
                  onChange={(e) => handleChange("logoUrl", e.target.value)}
                  fullWidth
                  placeholder="https://example.com/logo.png"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Website URL"
                  value={form.websiteUrl}
                  onChange={(e) => handleChange("websiteUrl", e.target.value)}
                  fullWidth
                  placeholder="https://example.com"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Explorer URL"
                  value={form.explorerUrl}
                  onChange={(e) => handleChange("explorerUrl", e.target.value)}
                  fullWidth
                  placeholder="https://etherscan.io/token/..."
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleOnboard}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Onboarding..." : "Onboard Crypto"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
