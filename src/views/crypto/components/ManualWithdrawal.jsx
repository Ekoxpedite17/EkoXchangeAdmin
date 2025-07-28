import { useState } from 'react';
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
  Box
} from '@mui/material';
import { mockWithdrawals, mockWithdrawalLimits } from '../data/mockData';

const ManualWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [limits] = useState(mockWithdrawalLimits);
  const [withdrawal, setWithdrawal] = useState({
    currency: '',
    amount: '',
    address: '',
    reason: ''
  });
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [approvals, setApprovals] = useState([]);

  const steps = ['Initial Request', 'First Admin Approval', 'Second Admin Approval'];

  const handleWithdrawal = () => {
    setConfirmDialog(true);
  };

  const handleApproval = async () => {
    try {
      // Replace with actual API call
      await fetch('/api/crypto/withdrawals/approve', {
        method: 'POST',
        body: JSON.stringify({ ...withdrawal, adminId: 'current_admin' })
      });
      
      setApprovals([...approvals, 'current_admin']);
      setActiveStep(activeStep + 1);
      
      if (activeStep === 1) {
        setConfirmDialog(false);
      }
    } catch (error) {
      console.error('Error approving withdrawal:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Manual Withdrawal
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Currency"
              fullWidth
              value={withdrawal.currency}
              onChange={(e) => setWithdrawal({ ...withdrawal, currency: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={withdrawal.amount}
              onChange={(e) => setWithdrawal({ ...withdrawal, amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Wallet Address"
              fullWidth
              value={withdrawal.address}
              onChange={(e) => setWithdrawal({ ...withdrawal, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason"
              multiline
              rows={4}
              fullWidth
              value={withdrawal.reason}
              onChange={(e) => setWithdrawal({ ...withdrawal, reason: e.target.value })}
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
            {activeStep === 0 ? 'Request Withdrawal' : 'Approve Withdrawal'}
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
            <Button onClick={handleApproval} variant="contained" color="primary">
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ManualWithdrawal;