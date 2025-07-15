import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  FormControlLabel
} from "@mui/material";

const initialPairs = [
  {
    pair: "BTC/USDT",
    min: 100,
    max: 10000,
    active: true,
  },
  {
    pair: "ETH/USDT",
    min: 50,
    max: 5000,
    active: true,
  },
  {
    pair: "BNB/USDT",
    min: 25,
    max: 2500,
    active: false,
  },
  {
    pair: "SOL/USDT",
    min: 10,
    max: 1000,
    active: true,
  },
  {
    pair: "XRP/USDT",
    min: 100,
    max: 10000,
    active: true,
  },
];

export default function TradePairControl() {
  const [pairs, setPairs] = useState(initialPairs);
  const [editIdx, setEditIdx] = useState(null);
  const [editMin, setEditMin] = useState(0);
  const [editMax, setEditMax] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditMin(pairs[idx].min);
    setEditMax(pairs[idx].max);
  };

  const handleSave = () => {
    if (editMin < 0 || editMax < 0) {
      setSnackbar({ open: true, message: 'Min/Max cannot be negative', severity: 'error' });
      return;
    }
    if (editMin >= editMax) {
      setSnackbar({ open: true, message: 'Min must be less than Max', severity: 'error' });
      return;
    }
    setPairs(pairs => pairs.map((p, i) => i === editIdx ? { ...p, min: editMin, max: editMax } : p));
    setEditIdx(null);
    setSnackbar({ open: true, message: 'Limits updated successfully', severity: 'success' });
  };

  const handleSwitch = (idx) => {
    setPairs(pairs => pairs.map((p, i) => i === idx ? { ...p, active: !p.active } : p));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Trade Pair Control</Typography>
      <Grid container spacing={2}>
        {pairs.map((pair, idx) => (
          <Grid item xs={12} sm={6} md={4} key={pair.pair}>
            <Card sx={{ borderRadius: 2, bgcolor: 'white', border: '1px solid #eee', display: 'flex', alignItems: 'center', p: 2 }}>
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{pair.pair}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Min: ${pair.min} | Max: ${pair.max}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{ mx: 2, borderColor: '#a259e6', color: '#a259e6' }}
                onClick={() => handleEdit(idx)}
              >
                Edit Limits
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    checked={pair.active}
                    onChange={() => handleSwitch(idx)}
                    color="secondary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#a259e6',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#a259e6',
                      },
                    }}
                  />
                }
                label={pair.active ? 'Active' : 'Inactive'}
                labelPlacement="end"
                sx={{ ml: 2, color: pair.active ? '#a259e6' : 'text.secondary', fontWeight: 500 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={editIdx !== null} onClose={() => setEditIdx(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Limits</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Min Value"
              type="number"
              value={editMin}
              onChange={e => setEditMin(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Max Value"
              type="number"
              value={editMax}
              onChange={e => setEditMax(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIdx(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 