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
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Code as CodeIcon
} from '@mui/icons-material';

const UserReferralTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      referredBy: 'Sarah Wilson',
      referralCode: 'JOHN123',
      successfulInvites: 12,
      totalEarnings: 600.00,
      earningsHistory: [
        { date: '2024-06-15', amount: 50.00, referral: 'Mike Smith' },
        { date: '2024-06-10', amount: 50.00, referral: 'Lisa Brown' },
        { date: '2024-06-05', amount: 50.00, referral: 'Tom Wilson' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      referredBy: 'David Brown',
      referralCode: 'JANE456',
      successfulInvites: 8,
      totalEarnings: 400.00,
      earningsHistory: [
        { date: '2024-06-12', amount: 50.00, referral: 'Alex Johnson' },
        { date: '2024-06-08', amount: 50.00, referral: 'Emma Davis' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      referredBy: 'John Doe',
      referralCode: 'MIKE789',
      successfulInvites: 15,
      totalEarnings: 750.00,
      earningsHistory: [
        { date: '2024-06-18', amount: 50.00, referral: 'Chris Lee' },
        { date: '2024-06-14', amount: 50.00, referral: 'Anna White' },
        { date: '2024-06-09', amount: 50.00, referral: 'Bob Green' }
      ]
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <Box>
      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by name, email, or referral code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            User Referral Tracking
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Referred By</TableCell>
                  <TableCell>Referral Code</TableCell>
                  <TableCell>Successful Invites</TableCell>
                  <TableCell>Total Earnings</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.referredBy} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CodeIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {user.referralCode}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon fontSize="small" color="success" />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {user.successfulInvites}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MoneyIcon fontSize="small" color="warning" />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ${user.totalEarnings.toLocaleString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton 
                          onClick={() => handleViewDetails(user)}
                          color="primary"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {selectedUser?.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedUser?.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedUser?.email}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Referred By
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedUser.referredBy}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Referral Code
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {selectedUser.referralCode}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Successful Invites
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedUser.successfulInvites}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Earnings
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                    ${selectedUser.totalEarnings.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Earnings History
              </Typography>
              
              <List>
                {selectedUser.earningsHistory.map((earning, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`$${earning.amount.toLocaleString()} - ${earning.referral}`}
                        secondary={earning.date}
                      />
                      <Chip 
                        label="Completed" 
                        color="success" 
                        size="small"
                      />
                    </ListItem>
                    {index < selectedUser.earningsHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserReferralTracking; 