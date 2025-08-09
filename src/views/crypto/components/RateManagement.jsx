import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Alert,
  Stack,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { EkoServices_Crypty } from "../../../services";
import dayjs from "dayjs";

const RateManagement = () => {
  const [rates, setRates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rateMethod, setRateMethod] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [editEnabled, setEditEnabled] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [rateForm, setRateForm] = useState({
    tokenName: "",
    tokenSymbol: "",
    networkType: "mainnet",
    transactionType: "buy_sell",
    buyRate: "",
    sellRate: "",
    startDate: "",
    endDate: "",
    isActive: true,
    description: "",
  });

  // Available cryptocurrencies
  const availableCryptos = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Solana", symbol: "SOL" },
    { name: "Cardano", symbol: "ADA" },
    { name: "Polkadot", symbol: "DOT" },
    { name: "Chainlink", symbol: "LINK" },
    { name: "Polygon", symbol: "MATIC" },
    { name: "Avalanche", symbol: "AVAX" },
  ];

  const transactionTypes = [
    { value: "buy_sell", label: "Buy & Sell" },
    { value: "buy_only", label: "Buy Only" },
    { value: "sell_only", label: "Sell Only" },
  ];

  const networkTypes = [
    { value: "mainnet", label: "Mainnet" },
    { value: "testnet", label: "Testnet" },
    { value: "bsc", label: "Binance Smart Chain (BSC)" },
    { value: "polygon", label: "Polygon" },
    { value: "arbitrum", label: "Arbitrum" },
    { value: "optimism", label: "Optimism" },
    { value: "avalanche", label: "Avalanche" },
    { value: "fantom", label: "Fantom" },
  ];

  const fetchRates = async () => {
    const data = await EkoServices_Crypty.getRates();
    if (data) {
      setRates(data);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setRateForm({
      tokenName: rate.tokenName || "",
      tokenSymbol: rate.tokenSymbol || "",
      networkType: rate.networkType || "mainnet",
      transactionType: rate.transactionType || "buy_sell",
      buyRate: rate.buyRate?.toString() || "",
      sellRate: rate.sellRate?.toString() || "",
      startDate: rate.startDate
        ? dayjs(rate.startDate).format("YYYY-MM-DD")
        : "",
      endDate: rate.endDate ? dayjs(rate.endDate).format("YYYY-MM-DD") : "",
      isActive: rate.isActive !== undefined ? rate.isActive : true,
      description: rate.description || "",
    });
    setOpenDialog(true);
  };

  const handleView = (rate) => {
    setSelectedRate(rate);
    setViewDialog(true);
  };

  const handleDelete = (rate) => {
    setSelectedRate(rate);
    setDeleteDialog(true);
  };

  const handleAddRate = () => {
    setSelectedRate(null);
    setRateForm({
      tokenName: "",
      tokenSymbol: "",
      networkType: "mainnet",
      transactionType: "buy_sell",
      buyRate: "",
      sellRate: "",
      startDate: "",
      endDate: "",
      isActive: true,
      description: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewDialog(false);
    setDeleteDialog(false);
    setSelectedRate(null);
    setRateForm({
      tokenName: "",
      tokenSymbol: "",
      networkType: "mainnet",
      transactionType: "buy_sell",
      buyRate: "",
      sellRate: "",
      startDate: "",
      endDate: "",
      isActive: true,
      description: "",
    });
    setError("");
  };

  const handleCryptoChange = (crypto) => {
    setRateForm((prev) => ({
      ...prev,
      tokenName: crypto.name,
      tokenSymbol: crypto.symbol,
    }));
  };

  const handleSaveRate = async () => {
    try {
      setLoading(true);
      setError("");

      // Validation
      if (!rateForm.tokenName || !rateForm.tokenSymbol) {
        setError("Please select a cryptocurrency");
        return;
      }

      if (rateForm.transactionType !== "sell_only" && !rateForm.buyRate) {
        setError("Buy rate is required");
        return;
      }

      if (rateForm.transactionType !== "buy_only" && !rateForm.sellRate) {
        setError("Sell rate is required");
        return;
      }

      if (
        rateForm.startDate &&
        rateForm.endDate &&
        new Date(rateForm.startDate) >= new Date(rateForm.endDate)
      ) {
        setError("End date must be after start date");
        return;
      }

      const rateData = {
        tokenName: rateForm.tokenName,
        tokenSymbol: rateForm.tokenSymbol,
        networkType: rateForm.networkType,
        transactionType: rateForm.transactionType,
        buyRate:
          rateForm.transactionType !== "sell_only"
            ? parseFloat(rateForm.buyRate)
            : null,
        sellRate:
          rateForm.transactionType !== "buy_only"
            ? parseFloat(rateForm.sellRate)
            : null,
        startDate: rateForm.startDate
          ? new Date(rateForm.startDate).toISOString()
          : null,
        endDate: rateForm.endDate
          ? new Date(rateForm.endDate).toISOString()
          : null,
        isActive: rateForm.isActive,
        description: rateForm.description,
      };

      if (selectedRate) {
        // Update existing rate
        await EkoServices_Crypty.updateRates({
          id: selectedRate._id,
          ...rateData,
        });
        setSuccess("Rate updated successfully!");
      } else {
        // Create new rate
        await EkoServices_Crypty.createRate(rateData);
        setSuccess("Rate created successfully!");
      }

      fetchRates();
      handleCloseDialog();

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error saving rate:", error);
      setError("Failed to save rate. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRate = async () => {
    try {
      setLoading(true);
      setError("");

      await EkoServices_Crypty.deleteRate(selectedRate._id);

      setSuccess("Rate deleted successfully!");
      fetchRates();
      handleCloseDialog();

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting rate:", error);
      setError("Failed to delete rate. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Rate Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRate}
          sx={{ color: "white" }}
        >
          Add New Rate
        </Button>
      </Box>

      <Card sx={{ borderRadius: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cryptocurrency</TableCell>
                <TableCell>Network</TableCell>
                <TableCell>Buy Rate (NGN)</TableCell>
                <TableCell>Sell Rate (NGN)</TableCell>
                <TableCell>Spread (%)</TableCell>
                <TableCell>Date Range</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates?.map((rate) => {
                const spread =
                  rate.buyRate && rate.sellRate
                    ? (
                        ((rate.sellRate - rate.buyRate) / rate.buyRate) *
                        100
                      ).toFixed(2)
                    : "N/A";
                const lastUpdated = dayjs(rate.updatedAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                );
                const startDate = rate.startDate
                  ? dayjs(rate.startDate).format("DD/MM/YYYY")
                  : "No start";
                const endDate = rate.endDate
                  ? dayjs(rate.endDate).format("DD/MM/YYYY")
                  : "No end";

                return (
                  <TableRow key={rate?._id} hover sx={{ cursor: "default" }}>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {rate.tokenName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {rate.tokenSymbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rate.networkType || "Mainnet"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {rate.buyRate
                          ? `₦${rate.buyRate.toLocaleString()}`
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {rate.sellRate
                          ? `₦${rate.sellRate.toLocaleString()}`
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={
                          spread !== "N/A" && spread > 2
                            ? "error.main"
                            : "success.main"
                        }
                        fontWeight="medium"
                      >
                        {spread}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {startDate} - {endDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rate.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={rate.isActive ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {lastUpdated}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleView(rate)}
                            color="primary"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Rate">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(rate)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Rate">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(rate)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Rate Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: "white",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {selectedRate ? "Edit Rate" : "Add New Rate"}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "white" }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Cryptocurrency Selection */}
            <FormControl fullWidth>
              <InputLabel>Select Cryptocurrency</InputLabel>
              <Select
                value={rateForm.tokenSymbol}
                onChange={(e) => {
                  const crypto = availableCryptos.find(
                    (c) => c.symbol === e.target.value
                  );
                  handleCryptoChange(crypto);
                }}
                label="Select Cryptocurrency"
              >
                {availableCryptos.map((crypto) => (
                  <MenuItem key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Network Type */}
            <FormControl fullWidth>
              <InputLabel>Network Type</InputLabel>
              <Select
                value={rateForm.networkType}
                onChange={(e) =>
                  setRateForm({ ...rateForm, networkType: e.target.value })
                }
                label="Network Type"
              >
                {networkTypes.map((network) => (
                  <MenuItem key={network.value} value={network.value}>
                    {network.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Transaction Type */}
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={rateForm.transactionType}
                onChange={(e) =>
                  setRateForm({ ...rateForm, transactionType: e.target.value })
                }
                label="Transaction Type"
              >
                {transactionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Rate Inputs */}
            <Box display="flex" gap={2}>
              {rateForm.transactionType !== "sell_only" && (
                <TextField
                  label="Buy Rate (NGN)"
                  value={rateForm.buyRate}
                  onChange={(e) =>
                    setRateForm({ ...rateForm, buyRate: e.target.value })
                  }
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, step: 0.01 }}
                />
              )}
              {rateForm.transactionType !== "buy_only" && (
                <TextField
                  label="Sell Rate (NGN)"
                  value={rateForm.sellRate}
                  onChange={(e) =>
                    setRateForm({ ...rateForm, sellRate: e.target.value })
                  }
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, step: 0.01 }}
                />
              )}
            </Box>

            {/* Date Range */}
            <Box display="flex" gap={2}>
              <TextField
                label="Start Date"
                type="date"
                value={rateForm.startDate}
                onChange={(e) =>
                  setRateForm({ ...rateForm, startDate: e.target.value })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={rateForm.endDate}
                onChange={(e) =>
                  setRateForm({ ...rateForm, endDate: e.target.value })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Active Status */}
            <FormControlLabel
              control={
                <Switch
                  checked={rateForm.isActive}
                  onChange={(e) =>
                    setRateForm({ ...rateForm, isActive: e.target.checked })
                  }
                />
              }
              label="Active"
            />

            {/* Description */}
            <TextField
              label="Description (Optional)"
              value={rateForm.description}
              onChange={(e) =>
                setRateForm({ ...rateForm, description: e.target.value })
              }
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "white" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveRate}
            disabled={loading}
          >
            {loading ? "Saving..." : selectedRate ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Rate Dialog */}
      <Dialog
        open={viewDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Rate Details
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRate && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Cryptocurrency
                </Typography>
                <Typography variant="body1">
                  {selectedRate.tokenName} ({selectedRate.tokenSymbol})
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Network Type
                </Typography>
                <Typography variant="body1">
                  {networkTypes.find(
                    (n) => n.value === selectedRate.networkType
                  )?.label || selectedRate.networkType || "Mainnet"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Transaction Type
                </Typography>
                <Typography variant="body1">
                  {transactionTypes.find(
                    (t) => t.value === selectedRate.transactionType
                  )?.label || selectedRate.transactionType}
                </Typography>
              </Box>
              {selectedRate.buyRate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Buy Rate
                  </Typography>
                  <Typography variant="body1">
                    ₦{selectedRate.buyRate.toLocaleString()}
                  </Typography>
                </Box>
              )}
              {selectedRate.sellRate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sell Rate
                  </Typography>
                  <Typography variant="body1">
                    ₦{selectedRate.sellRate.toLocaleString()}
                  </Typography>
                </Box>
              )}
              {selectedRate.buyRate && selectedRate.sellRate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Spread
                  </Typography>
                  <Typography variant="body1">
                    {(
                      ((selectedRate.sellRate - selectedRate.buyRate) /
                        selectedRate.buyRate) *
                      100
                    ).toFixed(2)}
                    %
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Date Range
                </Typography>
                <Typography variant="body1">
                  {selectedRate.startDate
                    ? dayjs(selectedRate.startDate).format("DD/MM/YYYY")
                    : "No start"}{" "}
                  -
                  {selectedRate.endDate
                    ? dayjs(selectedRate.endDate).format("DD/MM/YYYY")
                    : "No end"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedRate.isActive ? "Active" : "Inactive"}
                  color={selectedRate.isActive ? "success" : "default"}
                  size="small"
                />
              </Box>
              {selectedRate.description && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedRate.description}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {dayjs(selectedRate.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the rate for{" "}
            {selectedRate?.tokenName} ({selectedRate?.tokenSymbol})?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRate}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RateManagement;
