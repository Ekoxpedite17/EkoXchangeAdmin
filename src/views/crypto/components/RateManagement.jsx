import { useState } from 'react';
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
  DialogActions
} from '@mui/material';
import { mockRates } from '../data/mockData';

const RateManagement = () => {
  const [rates, setRates] = useState(mockRates);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [autoSync, setAutoSync] = useState(true);

  const handleRateChange = (rate) => {
    setSelectedRate(rate);
    setConfirmDialog(true);
  };

  const handleConfirm = async () => {
    try {
      // Replace with actual API call
      await fetch('/api/crypto/rates', {
        method: 'PUT',
        body: JSON.stringify(selectedRate)
      });
      setConfirmDialog(false);
    } catch (error) {
      console.error('Error updating rate:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Rate Management</Typography>
          <FormControlLabel control={<Switch checked={autoSync} onChange={(e) => setAutoSync(e.target.checked)} />} label="Auto Sync" />
        </Box>

        <Grid container spacing={2}>
          {/* Rate input fields */}
          <Grid item xs={12}>
            <TextField
              label="BTC/USD Buy Rate"
              type="number"
              fullWidth
              onChange={(e) =>
                handleRateChange({
                  pair: 'BTC/USD',
                  type: 'buy',
                  rate: e.target.value
                })
              }
            />
          </Grid>
          {/* Add more rate fields as needed */}
        </Grid>

        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>Confirm Rate Change</DialogTitle>
          <DialogContent>
            Are you sure you want to update the {selectedRate?.pair} {selectedRate?.type} rate?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RateManagement;
