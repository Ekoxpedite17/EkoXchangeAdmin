import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Checkbox,
  Chip,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

// Mocked user role (replace with real auth logic)
const userRole = "admin"; // or "viewer"

const initialFees = [
  {
    id: 1,
    transactionType: "Buy",
    asset: "USDT",
    network: "TRC20",
    feeType: "Percentage",
    feeValue: 1.5,
    appliedTo: ["Basic", "Verified"],
    lastModified: "2024-07-01 10:00",
    status: "Active",
  },
  {
    id: 2,
    transactionType: "Sell",
    asset: "BTC",
    network: "BEP20",
    feeType: "Fixed",
    feeValue: 100,
    appliedTo: ["Verified"],
    lastModified: "2024-07-02 12:30",
    status: "Active",
  },
];

const userLevels = ["Basic", "Verified", "VIP"];
const assets = ["BTC", "ETH", "USDT", "BNB"];
const networks = ["ERC20", "TRC20", "BEP20"];
const transactionTypes = ["Buy", "Sell", "Send", "Receive", "Swap"];
const feeTypes = ["Fixed", "Percentage"];
const statusOptions = ["Active", "Inactive"];

export default function FeeManagement() {
  const [fees, setFees] = useState(initialFees);
  const [filter, setFilter] = useState({
    transactionType: "",
    asset: "",
    network: "",
    feeType: "",
    status: "",
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [editFee, setEditFee] = useState(null);
  const [openHistory, setOpenHistory] = useState(false);
  const [historyFee, setHistoryFee] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [exporting, setExporting] = useState(false);

  // Filtering logic
  const filteredFees = fees.filter((fee) => {
    return (
      (!filter.transactionType ||
        fee.transactionType === filter.transactionType) &&
      (!filter.asset || fee.asset === filter.asset) &&
      (!filter.network || fee.network === filter.network) &&
      (!filter.feeType || fee.feeType === filter.feeType) &&
      (!filter.status || fee.status === filter.status)
    );
  });

  // Export to CSV (mocked)
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setSnackbar({
        open: true,
        message: "Exported to CSV (mock)",
        severity: "success",
      });
    }, 1000);
  };

  // Add/Edit Fee logic (scaffold)
  const handleOpenEdit = (fee = null) => {
    setEditFee(fee);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditFee(null);
  };
  const handleSaveFee = () => {
    setOpenConfirm(true);
  };
  const handleConfirmSave = () => {
    setOpenConfirm(false);
    setOpenEdit(false);
    setSnackbar({
      open: true,
      message: "Fee settings updated successfully",
      severity: "success",
    });
    // Add real save logic here
  };

  // History logic (scaffold)
  const handleOpenHistory = (fee) => {
    setHistoryFee(fee);
    setOpenHistory(true);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
    setHistoryFee(null);
  };

  // Role-based access
  const canEdit = userRole === "admin";

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Fee Management
        </Typography>
        <Box display="flex" gap={2}>
          {canEdit && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenEdit()}
            >
              Add Fee
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={exporting}
          >
            Export CSV
          </Button>
        </Box>
      </Box>
      {/* Filter Bar */}
      <Card sx={{ mb: 2, p: 2, bgcolor: "white", borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item size={1.5} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={filter.transactionType}
                label="Transaction Type"
                onChange={(e) =>
                  setFilter((f) => ({ ...f, transactionType: e.target.value }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {transactionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={1.5} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Asset</InputLabel>
              <Select
                value={filter.asset}
                label="Asset"
                onChange={(e) =>
                  setFilter((f) => ({ ...f, asset: e.target.value }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {assets.map((asset) => (
                  <MenuItem key={asset} value={asset}>
                    {asset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={1.5} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Network</InputLabel>
              <Select
                value={filter.network}
                label="Network"
                onChange={(e) =>
                  setFilter((f) => ({ ...f, network: e.target.value }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {networks.map((net) => (
                  <MenuItem key={net} value={net}>
                    {net}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={1.5} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Fee Type</InputLabel>
              <Select
                value={filter.feeType}
                label="Fee Type"
                onChange={(e) =>
                  setFilter((f) => ({ ...f, feeType: e.target.value }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {feeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={1.5} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filter.status}
                label="Status"
                onChange={(e) =>
                  setFilter((f) => ({ ...f, status: e.target.value }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      {/* Fee Table */}
      <Card sx={{ borderRadius: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Crypto Asset</TableCell>
                <TableCell>Network</TableCell>
                <TableCell>Fee Type</TableCell>
                <TableCell>Current Value</TableCell>
                <TableCell>Applied To</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No fee settings found.
                  </TableCell>
                </TableRow>
              )}
              {filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.transactionType}</TableCell>
                  <TableCell>{fee.asset}</TableCell>
                  <TableCell>{fee.network}</TableCell>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>
                    {fee.feeType === "Fixed"
                      ? `NGN ${fee.feeValue}`
                      : `${fee.feeValue}%`}
                  </TableCell>
                  <TableCell>
                    {fee.appliedTo.map((level) => (
                      <Chip
                        key={level}
                        label={level}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{fee.lastModified}</TableCell>
                  <TableCell>{fee.status}</TableCell>
                  <TableCell>
                    <Tooltip title="View History">
                      <IconButton onClick={() => handleOpenHistory(fee)}>
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {canEdit && (
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                        onClick={() => handleOpenEdit(fee)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {/* Add/Edit Fee Dialog (scaffold) */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>{editFee ? "Edit Fee" : "Add Fee"}</DialogTitle>
        <DialogContent>
          {/* Form fields go here (scaffold) */}
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth size="small">
              <InputLabel>Transaction Type</InputLabel>
              <Select
                label="Transaction Type"
                value={editFee?.transactionType || ""}
              >
                {transactionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Crypto Asset</InputLabel>
              <Select label="Crypto Asset" value={editFee?.asset || ""}>
                {assets.map((asset) => (
                  <MenuItem key={asset} value={asset}>
                    {asset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Network</InputLabel>
              <Select label="Network" value={editFee?.network || ""}>
                {networks.map((net) => (
                  <MenuItem key={net} value={net}>
                    {net}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset">
              <RadioGroup row value={editFee?.feeType || ""}>
                {feeTypes.map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <TextField
              label={
                editFee?.feeType === "Fixed"
                  ? "Fee Value (NGN)"
                  : "Fee Value (%)"
              }
              type="number"
              value={editFee?.feeValue || ""}
              fullWidth
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Applied To (User Level)</InputLabel>
              <Select
                multiple
                value={editFee?.appliedTo || []}
                renderValue={(selected) => selected.join(", ")}
              >
                {userLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={editFee?.appliedTo?.includes(level)} />
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Effective From (optional)"
              type="datetime-local"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveFee}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Modal (scaffold) */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Fee Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to apply these fee settings?
          </Typography>
          {/* Show summary here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmSave}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Fee History Modal (scaffold) */}
      <Dialog
        open={openHistory}
        onClose={handleCloseHistory}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Fee History</DialogTitle>
        <DialogContent>
          {/* Mocked history table */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Admin</TableCell>
                <TableCell>Change Summary</TableCell>
                <TableCell>Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>admin1</TableCell>
                <TableCell>
                  Buy Fee USDT/TRC20 changed from 1% to 1.5%
                </TableCell>
                <TableCell>2024-07-01 10:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>admin2</TableCell>
                <TableCell>
                  Sell Fee BTC/BEP20 changed from NGN 50 to NGN 100
                </TableCell>
                <TableCell>2024-07-02 12:30</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistory}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
