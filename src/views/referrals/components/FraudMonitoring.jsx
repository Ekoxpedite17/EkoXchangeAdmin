import React, { useState } from 'react';
import {
  Box,
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
  Alert,
  IconButton,
  Tooltip,
  Badge,
  Grid,
  Divider
} from '@mui/material';
import {
  Warning as WarningIcon,
  Security as SecurityIcon,
  Block as BlockIcon,
  CheckCircle as ApproveIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const FraudMonitoring = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState('');

  // Mock data
  const suspiciousCases = [
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      type: 'high_volume',
      riskLevel: 'high',
      referrals: 25,
      timeframe: '24 hours',
      details: 'Unusually high number of referrals in short time',
      notes: 'Investigation in progress',
      status: 'flagged'
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane@example.com',
      type: 'self_referral',
      riskLevel: 'medium',
      referrals: 3,
      timeframe: '1 week',
      details: 'Multiple accounts from same IP address',
      notes: 'Suspicious pattern detected',
      status: 'flagged'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      email: 'mike@example.com',
      type: 'suspicious_pattern',
      riskLevel: 'high',
      referrals: 15,
      timeframe: '48 hours',
      details: 'Referrals from similar email patterns',
      notes: 'Potential bot activity',
      status: 'investigating'
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'high_volume': return 'High Volume';
      case 'self_referral': return 'Self Referral';
      case 'suspicious_pattern': return 'Suspicious Pattern';
      default: return 'Unknown';
    }
  };

  const handleViewDetails = (case_) => {
    setSelectedCase(case_);
    setNote(case_.notes);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCase(null);
    setNote('');
  };

  const handleSaveNote = () => {
    // Handle saving note
    console.log('Saving note:', note);
    setOpenDialog(false);
  };

  const handleBlockUser = (case_) => {
    // Handle blocking user
    console.log('Blocking user:', case_.user);
  };

  const handleApproveUser = (case_) => {
    // Handle approving user
    console.log('Approving user:', case_.user);
  };

  return (
    <Box>
      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Badge badgeContent={suspiciousCases.length} color="error">
                    <WarningIcon color="error" sx={{ fontSize: 40 }} />
                  </Badge>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                      {suspiciousCases.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Flagged Cases
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <SecurityIcon color="warning" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      {suspiciousCases.filter(c => c.riskLevel === 'high').length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      High Risk Cases
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <PersonIcon color="info" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'info.main' }}>
                      {suspiciousCases.filter(c => c.type === 'self_referral').length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Self Referrals
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Suspicious Cases Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Fraud Monitoring
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Referrals</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suspiciousCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {case_.user.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {case_.user}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {case_.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getTypeLabel(case_.type)} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={case_.riskLevel.toUpperCase()} 
                        size="small" 
                        color={getRiskColor(case_.riskLevel)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {case_.referrals}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        in {case_.timeframe}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {case_.details}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={case_.status} 
                        size="small" 
                        color={case_.status === 'flagged' ? 'error' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton 
                            onClick={() => handleViewDetails(case_)}
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Block User">
                          <IconButton 
                            onClick={() => handleBlockUser(case_)}
                            color="error"
                            size="small"
                          >
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve User">
                          <IconButton 
                            onClick={() => handleApproveUser(case_)}
                            color="success"
                            size="small"
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Case Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <FlagIcon color="error" />
            <Typography variant="h6">Case Details</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCase && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    User
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedCase.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedCase.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Level
                  </Typography>
                  <Chip 
                    label={selectedCase.riskLevel.toUpperCase()} 
                    color={getRiskColor(selectedCase.riskLevel)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Type
                  </Typography>
                  <Typography variant="body1">
                    {getTypeLabel(selectedCase.type)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Referrals
                  </Typography>
                  <Typography variant="body1">
                    {selectedCase.referrals} in {selectedCase.timeframe}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Details
                  </Typography>
                  <Typography variant="body1">
                    {selectedCase.details}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Admin Notes
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add notes about this case..."
                variant="outlined"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveNote} variant="contained">
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FraudMonitoring; 