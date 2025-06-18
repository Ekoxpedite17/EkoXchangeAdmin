import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';
import { mockTradePairs } from '../data/mockData';

const TradePairControl = () => {
  const [pairs, setPairs] = useState(mockTradePairs);
  const [editDialog, setEditDialog] = useState({ open: false, pair: null });

  const handleToggle = async (pairId) => {
    try {
      // Replace with actual API call
      const updatedPairs = pairs.map((pair) => (pair.id === pairId ? { ...pair, active: !pair.active } : pair));
      setPairs(updatedPairs);
    } catch (error) {
      console.error('Error toggling pair:', error);
    }
  };

  const handleEdit = (pair) => {
    setEditDialog({ open: true, pair: { ...pair } });
  };

  const handleSave = async () => {
    try {
      // Replace with actual API call
      const updatedPairs = pairs.map((pair) => (pair.id === editDialog.pair.id ? editDialog.pair : pair));
      setPairs(updatedPairs);
      setEditDialog({ open: false, pair: null });
    } catch (error) {
      console.error('Error updating pair:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Trade Pair Control
        </Typography>
        <Grid container spacing={2}>
          {pairs.map((pair) => (
            <Grid item xs={12} key={pair.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2} border="1px solid #eee" borderRadius={1}>
                <Box>
                  <Typography variant="h6">{pair.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Min: ${pair.minAmount} | Max: ${pair.maxAmount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(pair)}>
                    Edit Limits
                  </Button>
                  <FormControlLabel
                    control={<Switch checked={pair.active} onChange={() => handleToggle(pair.id)} color="primary" />}
                    label={pair.active ? 'Active' : 'Inactive'}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, pair: null })}>
          <DialogTitle>Edit Trade Pair Limits</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Minimum Amount"
                  type="number"
                  value={editDialog.pair?.minAmount || ''}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      pair: { ...editDialog.pair, minAmount: Number(e.target.value) }
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Maximum Amount"
                  type="number"
                  value={editDialog.pair?.maxAmount || ''}
                  onChange={(e) =>
                    setEditDialog({
                      ...editDialog,
                      pair: { ...editDialog.pair, maxAmount: Number(e.target.value) }
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, pair: null })}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TradePairControl;
