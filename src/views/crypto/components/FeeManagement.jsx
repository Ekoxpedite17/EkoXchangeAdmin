import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete"; // import delete icon
import { EkoServices_Crypty } from "../../../services";
import FeeModal from "./FeeModal";
import EditFeeStandalone from "./EditFee";

const userRole = "admin";

export default function FeeManagement({ networks = [] }) {
  const [fees, setFees] = useState([]);
  const [filter, setFilter] = useState({
    transactionType: "",
    asset: "",
    network: "",
    feeType: "",
    status: "",
  });
  const [openHistory, setOpenHistory] = useState(false);
  const [historyFee, setHistoryFee] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editFee, setEditFee] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [exporting, setExporting] = useState(false);

  const transactionTypes = ["Buy", "Sell", "Send", "Receive", "Swap"];
  const feeTypes = ["Fixed", "Percentage"];
  const statusOptions = ["Active", "Inactive"];

  const assetOptions = Array.isArray(networks)
    ? networks.flatMap((n) =>
        Array.isArray(n.tokens)
          ? n.tokens.map((token) => ({
              value: token._id,
              label: `${token.name} (${token.symbol})`,
            }))
          : []
      )
    : [];

  const networkOptions = Array.isArray(networks)
    ? networks.map((n) => ({
        value: n._id,
        label: n.name,
      }))
    : [];

  const userLevels = ["Basic", "Verified", "Vip"];

  const filteredFees = fees.filter((fee) => {
    return (
      (!filter.transactionType ||
        fee.transactionType === filter.transactionType) &&
      (!filter.asset || fee.cryptoAsset?._id === filter.asset) &&
      (!filter.network || fee.cryptoAsset?.chain?._id === filter.network) &&
      (!filter.feeType ||
        (filter.feeType === "Percentage"
          ? fee.isPercentage
          : !fee.isPercentage)) &&
      (!filter.status || (fee.status || "Active") === filter.status)
    );
  });

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

  const handleOpenAdd = () => {
    setSelectedFee(null);
    setOpenAdd(true);
  };

  const handleOpenEdit = (fee) => {
    setSelectedFee(fee);
    setOpenEdit(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedFee(null);
  };

  const handleSaveFee = async (updatedFee) => {
    let response;
    const payload = {
      transactionType: updatedFee.transactionType,
      cryptoAsset: updatedFee?.network._id,
      isPercentage: updatedFee.feeType === "Percentage",
      percentageAmount:
        updatedFee.feeType === "Percentage" ? updatedFee.feeValue : 0,
      fixedAmount: updatedFee.feeType === "Fixed" ? updatedFee.feeValue : 0,
      threshold: 1000,
      userLevel: updatedFee.appliedTo[0],
      effectiveDate: updatedFee.effectiveFrom
        ? new Date(updatedFee.effectiveFrom).toISOString().split("T")[0]
        : null,
    };

    if (selectedFee) {
      response = await EkoServices_Crypty.updateFee(selectedFee._id, payload);
    } else {
      response = await EkoServices_Crypty.createFee(payload);
    }
    if (response) {
      getFees();
      selectedFee(null);
      setOpenEdit(false);
      setOpenAdd(false);
    } else {
      setSnackbar({
        open: true,
        message: "Failed to save fee settings",
        severity: "error",
      });
    }
  };

  const handleOpenHistory = (fee) => {
    setHistoryFee(fee);
    setOpenHistory(true);
  };

  const handleCloseHistory = () => {
    setOpenHistory(false);
    setHistoryFee(null);
  };

  const handleDeleteFee = async (fee) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fee?"
    );
    if (!confirmed) return;

    const response = await EkoServices_Crypty.deleteFee(fee._id);
    if (response) {
      getFees();
      setSnackbar({
        open: true,
        message: "Fee deleted successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to delete fee.",
        severity: "error",
      });
    }
  };

  const canEdit = userRole === "admin";

  const getFees = async () => {
    const response = await EkoServices_Crypty.feeList(0, 10);
    if (response) {
      setFees(response?.data);
    } else {
      setSnackbar({
        open: true,
        message: "Failed to fetch fees",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getFees();
  }, []);

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
              onClick={() => handleOpenAdd()}
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
          <Grid item xs={12} sm={2}>
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
          <Grid item xs={12} sm={2}>
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
                {assetOptions.map((asset) => (
                  <MenuItem key={asset.value} value={asset.value}>
                    {asset.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
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
                {networkOptions.map((net) => (
                  <MenuItem key={net.value} value={net.value}>
                    {net.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
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
          <Grid item xs={12} sm={2}>
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
              {filteredFees?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No fee settings found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.transactionType}</TableCell>
                    <TableCell>
                      {fee.cryptoAsset?.name} ({fee.cryptoAsset?.symbol})
                    </TableCell>
                    <TableCell>{fee.cryptoAsset?.chain?.name}</TableCell>
                    <TableCell>
                      {fee.isPercentage ? "Percentage" : "Fixed"}
                    </TableCell>
                    <TableCell>
                      {fee.isPercentage
                        ? `${fee.percentageAmount}%`
                        : `NGN ${fee.fixedAmount}`}
                    </TableCell>
                    <TableCell>{fee.userLevel}</TableCell>
                    <TableCell>
                      {new Date(fee.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{fee.status || "Active"}</TableCell>
                    <TableCell>
                      {/* <Tooltip title="View History">
                        <IconButton onClick={() => handleOpenHistory(fee)}>
                          <HistoryIcon fontSize="small" />
                        </IconButton>
                      </Tooltip> */}
                      {canEdit && (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ ml: 1 }}
                            onClick={() => handleOpenEdit(fee)}
                          >
                            Edit
                          </Button>

                          <DeleteIcon color="red" onClick={() => handleDeleteFee(fee)} />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <EditFeeStandalone
          transactionTypes={transactionTypes}
          assets={networks}
          feeTypes={feeTypes}
          userLevels={userLevels}
          initialData={selectedFee}
          onSave={(updatedFee) => {
            console.log("Fee to be saved from EditFeeStandalone:", updatedFee);
            handleSaveFee(updatedFee);
            handleCloseAdd();
          }}
        />
      </Dialog>

      <FeeModal
        open={openAdd}
        transactionTypes={transactionTypes}
        assets={networks}
        networks={networks.flatMap((n) => n.tokens)}
        feeTypes={feeTypes}
        userLevels={userLevels}
        onClose={handleCloseAdd}
        onSave={(updatedFee) => {
          handleSaveFee(updatedFee);
        }}
      />

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
