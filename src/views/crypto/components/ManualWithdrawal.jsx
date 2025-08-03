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
  Stepper,
  Step,
  StepLabel,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { mockWithdrawals, mockWithdrawalLimits } from "../data/mockData";
import { EkoServices_Crypty } from "../../../services";

const ManualWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [limits] = useState(mockWithdrawalLimits);
  const [withdrawal, setWithdrawal] = useState({
    currency: "NGN",
    amount: "",
    address: "",
    reason: "",
  });
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [approvals, setApprovals] = useState([]);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processedBalances, setProcessedBalances] = useState([]);

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

  const steps = [
    "Initial Request",
    "First Admin Approval",
    "Second Admin Approval",
  ];

  const handleWithdrawal = () => {
    setConfirmDialog(true);
  };

  const handleApproval = async () => {
    try {
      await fetch("/api/crypto/withdrawals/approve", {
        method: "POST",
        body: JSON.stringify({ ...withdrawal, adminId: "current_admin" }),
      });

      setApprovals([...approvals, "current_admin"]);
      setActiveStep(activeStep + 1);

      if (activeStep === 1) {
        setConfirmDialog(false);
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
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
            <FormControl fullWidth>
              <InputLabel>Available Tokens</InputLabel>
              <Select
                value={withdrawal.currency}
                label="Available Tokens"
                onChange={(e) =>
                  setWithdrawal({ ...withdrawal, currency: e.target.value })
                }
                displayEmpty
                placeholder="Select a token"
              >
                <MenuItem disabled value="">
                  Select a token
                </MenuItem>
                {processedBalances?.map((balance) => (
                  // <MenuItem
                  //   key={balance.displayName}
                  //   value={balance.displayName}
                  // >
                  //   {balance.displayName} ({balance.amount} - $
                  //   {balance.usdValue})
                  // </MenuItem>
                  <></>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={withdrawal.amount}
              onChange={(e) =>
                setWithdrawal({ ...withdrawal, amount: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Wallet Address"
              fullWidth
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
              value={withdrawal.reason}
              onChange={(e) =>
                setWithdrawal({ ...withdrawal, reason: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWithdrawal}
            disabled={activeStep === 2}
          >
            {activeStep === 0 ? "Request Withdrawal" : "Approve Withdrawal"}
          </Button>
        </Box>

        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>Confirm Withdrawal</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              This action requires approval from two administrators
            </Alert>
            <Typography>
              Please confirm the withdrawal details:
              {/* Display withdrawal details */}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button
              onClick={handleApproval}
              variant="contained"
              color="primary"
            >
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ManualWithdrawal;
