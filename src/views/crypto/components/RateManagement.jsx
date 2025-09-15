import { useEffect, useState } from "react";
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
  FormControlLabel,
  FormControl,
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

const RateManagement = ({ tokens = [] }) => {
  const [rates, setRates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [editEnabled, setEditEnabled] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);

  const ratesResponse = {
    data: [
      {
        _id: "68c7c34bf43f90a0386d631c",
        cryptoAsset: {
          _id: "68c55c83af691313b565c0e0",
          chain: {
            _id: "68c55a7baf691313b565c0db",
            name: "Tron",
            explorerUrl: "https://tronscan.org",
            isActive: true,
            nativeToken: "TRX",
          },
          symbol: "USDT",
          contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
          decimals: 6,
          isActive: true,
          name: "Tether USD",
          tokenType: "TRC20",
        },
        __v: 0,
        buyRate: 1530,
        createdAt: 1757922122792,
        createdBy: "6839cfc05d3ccd8b35eb1e55",
        description: "Money must be made",
        endDate: 1759190400000,
        id: "e24fde74-4374-4e8f-91be-a7c6831a0517",
        sellRate: 0,
        startDate: 1757894400000,
        status: "Active",
        updatedAt: 1757922122792,
        updatedBy: "6839cfc05d3ccd8b35eb1e55",
      },
      {
        _id: "68c7c379f43f90a0386d631d",
        id: "68c7c34bf43f90a0386d631c",
        __v: 0,
        buyRate: 1530,
        createdAt: 1757922168161,
        createdBy: "6839cfc05d3ccd8b35eb1e55",
        cryptoAsset: {
          _id: "68c55c83af691313b565c0e0",
          chain: {
            _id: "68c55a7baf691313b565c0db",
            name: "Tron",
            explorerUrl: "https://tronscan.org",
            isActive: true,
            nativeToken: "TRX",
          },
          symbol: "USDT",
          contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
          decimals: 6,
          isActive: true,
          name: "Tether USD",
          tokenType: "TRC20",
        },
        description: "Money must be made",
        endDate: 1759190400000,
        sellRate: 1800,
        startDate: 1757894400000,
        status: "Active",
        updatedAt: 1757922168161,
        updatedBy: "6839cfc05d3ccd8b35eb1e55",
      },
      {
        _id: "68c7c408f43f90a0386d631e",
        id: "68c7c379f43f90a0386d631d",
        __v: 0,
        buyRate: 1520,
        createdAt: 1757922311299,
        createdBy: "6839cfc05d3ccd8b35eb1e55",
        cryptoAsset: {
          _id: "68c55c83af691313b565c0e0",
          chain: {
            _id: "68c55a7baf691313b565c0db",
            name: "Tron",
            explorerUrl: "https://tronscan.org",
            isActive: true,
            nativeToken: "TRX",
          },
          symbol: "USDT",
          contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
          decimals: 6,
          isActive: true,
          name: "Tether USD",
          tokenType: "TRC20",
        },
        description: "Money must be made",
        endDate: 1759190400000,
        sellRate: 1800,
        startDate: 1757894400000,
        status: "Active",
        updatedAt: 1757922311299,
        updatedBy: "6839cfc05d3ccd8b35eb1e55",
      },
    ],
    total: 3,
  };

  const [rateForm, setRateForm] = useState({
    cryptoAsset: "",
    network: "",
    transactionType: "buy_sell",
    buyRate: "",
    sellRate: "",
    startDate: "",
    endDate: "",
    isActive: true,
    description: "",
  });

  const transactionTypes = [
    { value: "buy_only", label: "Buy Only" },
    { value: "sell_only", label: "Sell Only" },
  ];

  const fetchRates = async () => {
    const data = await EkoServices_Crypty.getRates(skip, limit);
    if (data) {
      // Filter out duplicates based on cryptoAsset ID and date ranges
      const uniqueRates = removeDuplicateRates(data?.data || []);
      setRates(uniqueRates);
    }
  };
  
  // Function to remove duplicate rates
  const removeDuplicateRates = (ratesArray) => {
    // Create a map to track seen items by their unique identifiers
    const seenMap = new Map();
    
    // First pass: group by asset ID and date range
    ratesArray.forEach(rate => {
      const assetId = rate.cryptoAsset?._id;
      const startDate = rate.startDate ? new Date(rate.startDate).toISOString().split('T')[0] : 'no-start';
      const endDate = rate.endDate ? new Date(rate.endDate).toISOString().split('T')[0] : 'no-end';
      
      // Create a composite key for uniqueness check
      const key = `${assetId}-${startDate}-${endDate}`;
      
      // If we've seen this key before, keep the one with the most recent updatedAt
      if (seenMap.has(key)) {
        const existingRate = seenMap.get(key);
        // Compare updatedAt timestamps and keep the most recent one
        if (rate.updatedAt > existingRate.updatedAt) {
          seenMap.set(key, rate);
        }
      } else {
        seenMap.set(key, rate);
      }
    });
    
    // Return the unique rates (most recently updated for each key)
    return Array.from(seenMap.values());
  };
  
  // Apply the same filtering to the mock data in ratesResponse
  useEffect(() => {
    if (ratesResponse && ratesResponse.data) {
      const uniqueRates = removeDuplicateRates(ratesResponse.data);
      setRates(uniqueRates);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, []);

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setRateForm({
      cryptoAsset: rate.cryptoAsset?._id || "",
      network: rate.cryptoAsset?.chain?._id || "",
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
      cryptoAsset: "",
      network: "",
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
      cryptoAsset: "",
      network: "",
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

  const handleSaveRate = async () => {
    try {
      setLoading(true);
      setError("");

      if (!rateForm.cryptoAsset) {
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

      const createRatePayload = {
        cryptoAsset: rateForm.cryptoAsset,
        buyRate:
          rateForm.transactionType !== "sell_only"
            ? parseFloat(rateForm.buyRate)
            : 0,
        sellRate:
          rateForm.transactionType !== "buy_only"
            ? parseFloat(rateForm.sellRate)
            : 0,
        startDate: dayjs(rateForm.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(rateForm.endDate).format("YYYY-MM-DD"),
        description: rateForm.description,
      };

      const updateRatePayload = {
        cryptoAsset: rateForm.cryptoAsset,
        buyRate:
          rateForm.transactionType !== "sell_only"
            ? parseFloat(rateForm.buyRate)
            : selectedRate?.buyRate || 0,
        sellRate:
          rateForm.transactionType !== "buy_only"
            ? parseFloat(rateForm.sellRate)
            : selectedRate?.sellRate || 0,
        startDate: dayjs(rateForm.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(rateForm.endDate).format("YYYY-MM-DD"),
        description: rateForm.description,
      };

      const rateData = selectedRate ? updateRatePayload : createRatePayload;

      if (selectedRate) {
        await EkoServices_Crypty.updateRates(
          {
            ...rateData,
          },
          selectedRate._id
        );
        setSuccess("Rate updated successfully!");
      } else {
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

                const token = rate.cryptoAsset;
                const chainName = token?.chain?.name || "Unknown";

                return (
                  <TableRow key={rate?._id} hover sx={{ cursor: "default" }}>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {token?.name || "Unknown"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {token?.symbol || ""}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={chainName}
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
                value={rateForm.cryptoAsset}
                onChange={(e) => {
                  const token = tokens.find((t) => t._id === e.target.value);
                  setRateForm({
                    ...rateForm,
                    cryptoAsset: token._id,
                    network: token.chain?._id || "",
                  });
                }}
              >
                {tokens.map((token) => (
                  <MenuItem key={token._id} value={token._id}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        width={20}
                        height={20}
                        style={{ borderRadius: "50%" }}
                      />
                      {token.name} ({token.symbol})
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Network Type */}
            <FormControl fullWidth>
              <InputLabel>Select Network</InputLabel>
              <Select
                value={rateForm.network}
                onChange={(e) =>
                  setRateForm({ ...rateForm, network: e.target.value })
                }
              >
                {tokens
                  .map((t) => t.chain) // extract chain from tokens
                  .filter(
                    (c, i, arr) =>
                      c && arr.findIndex((x) => x._id === c._id) === i
                  ) // unique
                  .map((chain) => (
                    <MenuItem key={chain._id} value={chain._id}>
                      {chain.name}
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
            onClick={() => handleSaveRate()}
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
          {selectedRate &&
            (() => {
              // Now token is the nested object, not a lookup by ID
              const token = selectedRate.cryptoAsset;
              const chainName = token?.chain?.name || "Unknown";
              return (
                <Stack spacing={2} sx={{ mt: 1 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cryptocurrency
                    </Typography>
                    <Typography variant="body1">
                      {token?.name || "Unknown"} ({token?.symbol || ""})
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Network
                    </Typography>
                    <Typography variant="body1">{chainName}</Typography>
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
                      {dayjs(selectedRate.updatedAt).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </Typography>
                  </Box>
                </Stack>
              );
            })()}
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
            {(() => {
              // Now token is the nested object, not a lookup by ID
              const token = selectedRate?.cryptoAsset;
              return (
                <>
                  Are you sure you want to delete the rate for{" "}
                  {token?.name || "Unknown"}
                  {token?.symbol ? ` (${token.symbol})` : ""}?
                </>
              );
            })()}
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
