import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Divider
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  Pending as PendingIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ReferralEarnings = () => {
  const [selectedEarning, setSelectedEarning] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [commissionRate, setCommissionRate] = useState(5);

  // Mock data
  const pendingEarnings = [
    {
      id: 1,
      referrer: 'John Doe',
      referredUser: 'Mike Smith',
      amount: 50.00,
      date: '2024-06-20',
      status: 'pending',
      reason: 'Awaiting verification'
    },
    {
      id: 2,
      referrer: 'Jane Smith',
      referredUser: 'Lisa Brown',
      amount: 50.00,
      date: '2024-06-19',
      status: 'pending',
      reason: 'Manual review required'
    },
    {
      id: 3,
      referrer: 'Mike Johnson',
      referredUser: 'Tom Wilson',
      amount: 50.00,
      date: '2024-06-18',
      status: 'pending',
      reason: 'Suspicious activity detected'
    }
  ];

  const approvedEarnings = [
    {
      id: 4,
      referrer: 'Sarah Wilson',
      referredUser: 'Alex Johnson',
      amount: 50.00,
      date: '2024-06-15',
      status: 'approved',
      reason: 'Verified referral'
    },
    {
      id: 5,
      referrer: 'David Brown',
      referredUser: 'Emma Davis',
      amount: 50.00,
      date: '2024-06-14',
      status: 'approved',
      reason: 'Verified referral'
    }
  ];

  const handleApprove = (earning) => {
    // Handle approval logic
    console.log('Approved:', earning);
  };

  const handleReject = (earning) => {
    // Handle rejection logic
    console.log('Rejected:', earning);
  };

  const handleEditCommission = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveCommission = () => {
    // Handle commission rate update
    console.log('New commission rate:', commissionRate);
    setOpenDialog(false);
  };

  return (
    <Box>
      {/* Commission Rate Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Commission Rate
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current rate: {commissionRate}% per successful referral
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditCommission}
            >
              Edit Rate
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Pending vs Approved Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <PendingIcon color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {pendingEarnings.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pending Rewards
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <ApproveIcon color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {approvedEarnings.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Approved Rewards
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Earnings Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Pending Rewards
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referrer</TableCell>
                  <TableCell>Referred User</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingEarnings.map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {earning.referrer.charAt(0)}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {earning.referrer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {earning.referredUser}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                        ${earning.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {earning.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label="Pending" 
                        color="warning" 
                        size="small"
                        icon={<PendingIcon />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<ApproveIcon />}
                          onClick={() => handleApprove(earning)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<RejectIcon />}
                          onClick={() => handleReject(earning)}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Approved Earnings Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Approved Rewards
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referrer</TableCell>
                  <TableCell>Referred User</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedEarnings.map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {earning.referrer.charAt(0)}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {earning.referrer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {earning.referredUser}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                        ${earning.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {earning.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label="Approved" 
                        color="success" 
                        size="small"
                        icon={<ApproveIcon />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Commission Rate Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Edit Commission Rate</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Changing the commission rate will only affect new referrals. Existing pending rewards will use the previous rate.
            </Alert>
            
            <FormControl fullWidth>
              <InputLabel>Commission Rate (%)</InputLabel>
              <Select
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                label="Commission Rate (%)"
              >
                <MenuItem value={1}>1%</MenuItem>
                <MenuItem value={2}>2%</MenuItem>
                <MenuItem value={3}>3%</MenuItem>
                <MenuItem value={4}>4%</MenuItem>
                <MenuItem value={5}>5%</MenuItem>
                <MenuItem value={6}>6%</MenuItem>
                <MenuItem value={7}>7%</MenuItem>
                <MenuItem value={8}>8%</MenuItem>
                <MenuItem value={9}>9%</MenuItem>
                <MenuItem value={10}>10%</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                This means referrers will earn ${commissionRate} for every $100 their referrals spend.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCommission} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReferralEarnings; 