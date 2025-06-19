import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

import { EkoServices_Crypty } from "../../../services";

const WalletBalances = () => {
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Wallet Balances
        </Typography>
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
                      color={balance.status === "healthy" ? "success" : "error"}
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
  );
};

export default WalletBalances;
