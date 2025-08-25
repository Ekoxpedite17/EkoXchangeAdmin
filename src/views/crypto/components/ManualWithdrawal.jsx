import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { mockWithdrawals, mockWithdrawalLimits } from "../data/mockData";
import {
  EkoServices_Crypty,
  EkoServices_Transactions,
} from "../../../services";

const ManualWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [limits] = useState(mockWithdrawalLimits);
  const [withdrawal, setWithdrawal] = useState({
    currency: "",
    amount: "",
    address: "",
    reason: "",
    tokenAddress: "",
    chain: "",
  });
  const [confirmDialog, setConfirmDialog] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  // const [approvals, setApprovals] = useState([]);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedBalances, setProcessedBalances] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchDatas = async () => {
    try {
      const [balancesResult] = await Promise.allSettled([
        EkoServices_Crypty.refreshWalletBalances(),
      ]);

      if (balancesResult.status === "fulfilled") {
        const response = balancesResult.value;
        const mappedBalances = response.balances.map((item) => ({
          currency: item.symbol,
          amount: item.balance,
          chain: item?.chain,
          usdValue: item.usdValue,
          tokenAddress: item?.tokenAddress,
          status: parseFloat(item.balance) > 0 ? "healthy" : "empty",
        }));
        setBalances(mappedBalances);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // const steps = [
  //   "Initial Request",
  //   "First Admin Approval",
  //   "Second Admin Approval",
  // ];

  const handleWithdrawal = () => {
    setConfirmDialog(true);
  };

  // const handleApproval = async () => {
  //   try {
  //     await fetch("/api/crypto/withdrawals/approve", {
  //       method: "POST",
  //       body: JSON.stringify({ ...withdrawal, adminId: "current_admin" }),
  //     });
  //
  //     setApprovals([...approvals, "current_admin"]);
  //     setActiveStep(activeStep + 1);
  //
  //     if (activeStep === 1) {
  //       setConfirmDialog(false);
  //     }
  //   } catch (error) {
  //     console.error("Error approving withdrawal:", error);
  //   }
  // };

  const handleExecute = async () => {
    const payload = {
      chain: withdrawal.chain,
      tokenAddress: withdrawal.tokenAddress,
      recipient: withdrawal.address,
      amount: withdrawal.amount,
      decimals: 6,
    };

    setLoading(true);
    const response =
      await EkoServices_Transactions.executeManualTransaction(payload);
    if (response) {
      setLoading(false);
      fetchDatas();
      setWithdrawal({
        address: "",
        amount: "",
        chain: "",
        currency: "",
        reason: "",
        tokenAddress: "",
      });
      setSuccess("Withdrawal executed successfully!");
    } else {
      setLoading(false);
      setError("Failed to execute withdrawal. Please try again.");
    }
  };

  const processBalances = (balances) => {
    const counts = {};

    return balances.map((balance) => {
      if (!counts[balance.currency]) {
        counts[balance.currency] = 1;
        return { ...balance, displayName: balance.currency };
      } else {
        counts[balance.currency]++;
        return {
          ...balance,
          displayName: `${balance.currency} (${counts[balance.currency]})`,
        };
      }
    });
  };

  useEffect(() => {
    if (balances) {
      setProcessedBalances(processBalances(balances));
    }
  }, [balances]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Manual Withdrawal
        </Typography>

        <Grid container spacing={2}>
          <Grid item size={3}>
            <FormControl fullWidth required>
              <InputLabel id="token-label">Select a token</InputLabel>
              <Select
                value={withdrawal.tokenAddress}
                labelId="token-label"
                label="Select a token"
                onChange={(e) => {
                  const selectedTokenAddress = e.target.value;
                  const matched = processedBalances?.find(
                    (b) => b.tokenAddress === selectedTokenAddress
                  );
                  setWithdrawal({
                    ...withdrawal,
                    currency: matched?.currency || "",
                    tokenAddress: selectedTokenAddress || "",
                    chain: matched?.chain || "",
                  });
                }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) return "Select a token";
                  const balance = processedBalances?.find(
                    (b) => b.tokenAddress === selected
                  );
                  return balance
                    ? `${balance.currency} (${balance.amount} - $${balance.usdValue})`
                    : selected;
                }}
              >
                {processedBalances?.map((balance) => (
                  <MenuItem
                    key={balance.displayName}
                    value={balance.tokenAddress}
                  >
                    {balance.displayName} ({balance.amount} - $
                    {balance.usdValue})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              required
              value={withdrawal.amount}
              onChange={(e) =>
                setWithdrawal({ ...withdrawal, amount: e.target.value })
              }
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Wallet Address"
              fullWidth
              required
              value={withdrawal.address}
              onChange={(e) =>
                setWithdrawal({ ...withdrawal, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason"
              multiline
              rows={4}
              fullWidth
              required
              value={withdrawal.reason}
              onChange={(e) =>
                setWithdrawal({ ...withdrawal, reason: e.target.value })
              }
            />
          </Grid>
        </Grid>

        {/**
         * Approval stages commented out
         * <Box mt={3}>
         *   <Stepper activeStep={activeStep}>
         *     {steps.map((label) => (
         *       <Step key={label}>
         *         <StepLabel>{label}</StepLabel>
         *       </Step>
         *     ))}
         *   </Stepper>
         * </Box>
         */}

        <Box mt={3}>
          <Button
            variant="contained"
            loading={loading}
            color="primary"
            onClick={() => handleExecute()}
          >
            Execute Transfer
          </Button>
        </Box>

        {/**
         * Approval dialog commented out
         * <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
         *   <DialogTitle>Confirm Withdrawal</DialogTitle>
         *   <DialogContent>
         *     <Alert severity="warning" sx={{ mb: 2 }}>
         *       This action requires approval from two administrators
         *     </Alert>
         *     <Typography>
         *       Please confirm the withdrawal details:
         *     </Typography>
         *   </DialogContent>
         *   <DialogActions>
         *     <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
         *     <Button
         *       onClick={handleApproval}
         *       variant="contained"
         *       color="primary"
         *     >
         *       Approve
         *     </Button>
         *   </DialogActions>
         * </Dialog>
         */}
      </CardContent>
    </Card>
  );
};

export default ManualWithdrawal;
