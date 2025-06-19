import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import debounce from "lodash/debounce";

import { EkoServices_Crypty } from "../../../services";

const RateManagement = () => {
  const [rates, setRates] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [autoSync, setAutoSync] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    try {
      const [ratesResult] = await Promise.allSettled([
        EkoServices_Crypty.getRates(),
      ]);

      if (ratesResult.status === "fulfilled") {
        setRates(ratesResult.value);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const showConfirmDialog = useCallback(
    debounce(() => {
      setConfirmDialog(true);
    }, 500),
    []
  );

  const handleRateChange = ({ pair, type, rate }) => {
    const newRates = {
      ...rates,
      [`${type}Rate`]: Number(rate),
    };

    setRates(newRates);
    setSelectedRate({
      pair,
      type,
      rate: Number(rate),
      id: rates?._id,
    });

    showConfirmDialog();
  };

  useEffect(() => {
    return () => {
      showConfirmDialog.cancel();
    };
  }, [showConfirmDialog]);

  const handleConfirm = async () => {
    try {
      const payload = {
        _id: rates._id,
        buyRate: rates.buyRate,
        sellRate: rates.sellRate,
      };

      const response = await EkoServices_Crypty.updateRates(payload);
      if (response) {
        setConfirmDialog(false);
      }
    } catch (error) {
      console.error("Error updating rate:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Rate Management</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
              />
            }
            label="Auto Sync"
          />
        </Box>

        <Grid container spacing={2}>
          {/* Rate input fields */}
          <Grid item xs={12}>
            <TextField
              label="NGN/USD Buy Rate"
              type="number"
              value={rates?.buyRate || 0}
              fullWidth
              onChange={(e) =>
                handleRateChange({
                  pair: "NGN/USD",
                  type: "buy",
                  rate: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="NGN/USD Sell Rate"
              type="number"
              value={rates?.sellRate || 0}
              fullWidth
              onChange={(e) =>
                handleRateChange({
                  pair: "NGN/USD",
                  type: "sell",
                  rate: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>

        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>Confirm Rate Change</DialogTitle>
          <DialogContent>
            Are you sure you want to update the {selectedRate?.pair}{" "}
            {selectedRate?.type} rate?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button
              loading={loading}
              onClick={handleConfirm}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RateManagement;
