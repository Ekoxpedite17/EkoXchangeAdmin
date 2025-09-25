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
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedBalances, setProcessedBalances] = useState([]);
  const [success, setSuccess] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [error, setError] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);

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

  const fetchTokenList = async () => {
    const data = await EkoServices_Crypty.getTokenList(0, 30);
    setTokenList(data);
  };

  useEffect(() => {
    fetchDatas();
    fetchTokenList();
  }, []);

  const getNamedTokenInAvailableTokens = tokenList.find(
    (value) => value?.name === withdrawal.chain
  );

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

  // console.log(getNamedTokenInAvailableTokens);

  return (
    <Card style={{ zIndex: 1400, position: "relative" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Manual Withdrawal
        </Typography>

        <Grid container spacing={2}>
          <Grid item size={4}>
            <FormControl fullWidth required>
              <select
                id="default-token-select"
                value={withdrawal.tokenAddress}
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
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "14px",
                  borderRadius: 10,
                  borderColor: "",
                }}
              >
                <option value="">Select a token</option>
                {processedBalances?.map((balance) => (
                  <option
                    key={balance.displayName}
                    value={balance.tokenAddress}
                  >
                    {balance.displayName} ({balance.amount} - $
                    {balance.usdValue})
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>

          <Grid item size={4}>
            <FormControl fullWidth required>
              <select
                id="network-select"
                value={withdrawal.chain}
                onChange={(e) => {
                  setWithdrawal({ ...withdrawal, chain: e.target.value });
                  setSelectedToken(e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "14px",
                  borderRadius: 10,
                }}
              >
                <option value="">Select a network</option>
                {tokenList
                  ?.map((t) => t.chain?.name)
                  .filter((c, i, arr) => c && arr.indexOf(c) === i)
                  .map((chainName) => (
                    <option key={chainName} value={chainName}>
                      {chainName}
                    </option>
                  ))}
              </select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Amount in USD"
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
