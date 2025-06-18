import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { mockValidationHistory } from '../data/mockData';

const ValidationOverride = () => {
  const [cardCode, setCardCode] = useState('');
  const [reason, setReason] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [status, setStatus] = useState(null);

  const handleOverride = async () => {
    try {
      // Simulate API call with mock data
      const newOverride = {
        id: mockValidationHistory.length + 1,
        cardCode,
        originalStatus: 'Failed',
        overrideDate: new Date().toISOString(),
        adminUser: 'current_user',
        reason,
        newStatus: 'Approved'
      };

      setStatus({ type: 'success', message: 'Card validation successfully overridden' });
      setCardCode('');
      setReason('');
      setConfirmDialog(false);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to override card validation' });
      console.error('Error overriding validation:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Manual Validation Override
        </Typography>

        {status && (
          <Alert severity={status.type} onClose={() => setStatus(null)} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <Box component="form" noValidate autoComplete="off">
          <TextField fullWidth label="Card Code" value={cardCode} onChange={(e) => setCardCode(e.target.value)} margin="normal" />
          <TextField
            fullWidth
            label="Override Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="warning" onClick={() => setConfirmDialog(true)} disabled={!cardCode || !reason} sx={{ mt: 2 }}>
            Override Validation
          </Button>
        </Box>

        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>Confirm Override</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to override the validation for this gift card? This action will be logged and cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleOverride} color="warning" variant="contained">
              Confirm Override
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ValidationOverride;
