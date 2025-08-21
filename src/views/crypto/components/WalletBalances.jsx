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
  Tooltip,
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
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [onboardingForm, setOnboardingForm] = useState({
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

  // Predefined networks
  const networks = [
    { value: "ethereum", label: "Ethereum (ETH)" },
    { value: "binance", label: "Binance Smart Chain (BSC)" },
    { value: "polygon", label: "Polygon (MATIC)" },
    { value: "solana", label: "Solana (SOL)" },
    { value: "tron", label: "Tron (TRX)" },
    { value: "bitcoin", label: "Bitcoin (BTC)" },
    { value: "cardano", label: "Cardano (ADA)" },
    { value: "avalanche", label: "Avalanche (AVAX)" },
  ];

  const fetchDatas = async () => {
    try {
      const [ratesResult, balancesResult] = await Promise.allSettled([
        EkoServices_Crypty.getRates(),
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
    setOnboardingForm({
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
  };

  const handleOnboardCrypto = async () => {
    try {
      setOnboardingLoading(true);
      setError("");

      // Validation
      if (!onboardingForm.tokenName || !onboardingForm.tokenSymbol) {
        setError("Token name and symbol are required");
        return;
      }

      if (!onboardingForm.network) {
        setError("Please select a network");
        return;
      }

      if (!onboardingForm.buyEnabled && !onboardingForm.sellEnabled) {
        setError("At least one transaction type (buy or sell) must be enabled");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess("Crypto asset onboarded successfully!");
      handleCloseOnboarding();
      fetchDatas(); // Refresh balances to show new asset

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error onboarding crypto:", error);
      setError("Failed to onboard crypto asset. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setOnboardingLoading(false);
    }
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenOnboarding}
              sx={{ color: "white" }}
            >
              Add New Crypto
            </Button>
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

      {/* Crypto Onboarding Dialog */}
      <Dialog
        open={openOnboarding}
        onClose={handleCloseOnboarding}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Onboard New Crypto Asset</Typography>
            <IconButton onClick={handleCloseOnboarding}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
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
                    value={onboardingForm.tokenName}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        tokenName: e.target.value,
                      })
                    }
                    fullWidth
                    required
                    placeholder="e.g., Bitcoin, Ethereum"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Token Symbol"
                    value={onboardingForm.tokenSymbol}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        tokenSymbol: e.target.value.toUpperCase(),
                      })
                    }
                    fullWidth
                    required
                    placeholder="e.g., BTC, ETH"
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
                  <FormControl fullWidth required>
                    <InputLabel>Network</InputLabel>
                    <Select
                      value={onboardingForm.network}
                      onChange={(e) =>
                        setOnboardingForm({
                          ...onboardingForm,
                          network: e.target.value,
                        })
                      }
                      label="Network"
                    >
                      {networks.map((network) => (
                        <MenuItem key={network.value} value={network.value}>
                          {network.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contract Address (Optional)"
                    value={onboardingForm.contractAddress}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        contractAddress: e.target.value,
                      })
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
                    value={onboardingForm.decimals}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        decimals: parseInt(e.target.value) || 18,
                      })
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
                    value={onboardingForm.minTransactionAmount}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        minTransactionAmount: e.target.value,
                      })
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
                    value={onboardingForm.maxTransactionAmount}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        maxTransactionAmount: e.target.value,
                      })
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
                      checked={onboardingForm.buyEnabled}
                      onChange={(e) =>
                        setOnboardingForm({
                          ...onboardingForm,
                          buyEnabled: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Enable Buy"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={onboardingForm.sellEnabled}
                      onChange={(e) =>
                        setOnboardingForm({
                          ...onboardingForm,
                          sellEnabled: e.target.checked,
                        })
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
                    value={onboardingForm.description}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        description: e.target.value,
                      })
                    }
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Brief description of the crypto asset"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Logo URL"
                    value={onboardingForm.logoUrl}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        logoUrl: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="https://example.com/logo.png"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Website URL"
                    value={onboardingForm.websiteUrl}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        websiteUrl: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="https://example.com"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Explorer URL"
                    value={onboardingForm.explorerUrl}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        explorerUrl: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="https://etherscan.io/token/..."
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOnboarding} disabled={onboardingLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleOnboardCrypto}
            disabled={onboardingLoading}
            startIcon={
              onboardingLoading ? <CircularProgress size={16} /> : null
            }
          >
            {onboardingLoading ? "Onboarding..." : "Onboard Crypto"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WalletBalances;
