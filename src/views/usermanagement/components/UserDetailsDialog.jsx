import React from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';
import DownloadIcon from '@mui/icons-material/Download';
import KeyIcon from '@mui/icons-material/Key';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import dayjs from 'dayjs';

// Status color mapping
const kycStatusColors = {
  Approved: 'success',
  Pending: 'warning',
  Rejected: 'error',
  'Not Submitted': 'default'
};

const accountStatusColors = {
  Active: 'success',
  Suspended: 'error',
  Locked: 'warning'
};

const UserDetailsDialog = ({
  open,
  onClose,
  user,
  tabValue,
  handleTabChange,
  kycDocuments,
  approvalLogs,
  openConfirmDialog,
  handleSecurityReset,
  handleAccountStatusChange,
  userWalletBalances
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">User Details: {user.username}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="user details tabs">
            <Tab label="Profile" />
            <Tab label="KYC Documents" />
            <Tab label="Approval Logs" />
            <Tab label="Wallet Balances" />
            <Tab label="Account Actions" />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        {tabValue === 0 && (
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Username:</Typography>
              <Typography variant="body1">
                {user.firstname} {user.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Date Registered:</Typography>
              <Typography variant="body1">{dayjs(user.createdAt).format('DD MM, YYYY')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">KYC Status:</Typography>
              <Chip label={'--'} color={kycStatusColors[user.kycStatus]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Account Status:</Typography>
              <Chip
                label={user.isActive === true ? 'Active' : 'InActive'}
                color={accountStatusColors[user.isActive === true ? 'Active' : 'InActive']}
              />
            </Grid>
          </Grid>
        )}

        {/* KYC Documents Tab */}
        {tabValue === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              KYC Documents
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Upload Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kycDocuments.length > 0 ? (
                    kycDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>
                          <Chip label={doc.status} color={kycStatusColors[doc.status]} size="small" />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Download Document">
                              <IconButton size="small" color="primary">
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            {doc.status === 'Pending' && (
                              <>
                                <Tooltip title="Approve">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() =>
                                      openConfirmDialog('Approve Document', `Are you sure you want to approve this ${doc.type}?`, () =>
                                        handleKycAction('approve', doc.id)
                                      )
                                    }
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() =>
                                      openConfirmDialog('Reject Document', `Are you sure you want to reject this ${doc.type}?`, () =>
                                        handleKycAction('reject', doc.id)
                                      )
                                    }
                                  >
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No KYC documents found for this user
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Approval Logs Tab */}
        {tabValue === 2 && (
          <>
            <Typography variant="h6" gutterBottom>
              Approval Logs
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvalLogs.length > 0 ? (
                    approvalLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          <Chip label={log.action} color={log.action === 'Approved' ? 'success' : 'error'} size="small" />
                        </TableCell>
                        <TableCell>{log.adminUser}</TableCell>
                        <TableCell>{log.notes}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No approval logs found for this user
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Wallet Balances Tab */}
        {tabValue === 3 && (
          <>
            <Typography variant="h6" gutterBottom>
              Wallet Balances
            </Typography>
            {userWalletBalances ? (
              userWalletBalances.length > 0 ? (
                <Grid container spacing={2}>
                  {userWalletBalances.map((balance) => (
                    <Grid item xs={12} sm={6} md={4} key={balance.currency}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                              <AccountBalanceWalletIcon color="primary" />
                              {balance.currency}
                            </Typography>
                            <Chip
                              label={balance.status}
                              color={balance.status === 'healthy' ? 'success' : balance.status === 'warning' ? 'warning' : 'error'}
                              size="small"
                            />
                          </Box>
                          <Typography variant="h4" gutterBottom>
                            {parseFloat(balance.amount).toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ≈ ${parseFloat(balance.usdValue).toLocaleString()}
                          </Typography>
                          {balance.lastUpdated && (
                            <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                              Last updated: {dayjs(balance.lastUpdated).format('MMM DD, YYYY HH:mm')}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box display="flex" justifyContent="center" p={3}>
                  <Typography variant="body1" color="textSecondary">
                    No wallet balances found for this user
                  </Typography>
                </Box>
              )
            ) : (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            )}
          </>
        )}

        {/* Account Actions Tab */}
        {tabValue === 4 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Current Status:{' '}
                <Chip
                  label={user.isActive === true ? 'Active' : 'InActive'}
                  color={accountStatusColors[user.isActive === true ? 'Active' : 'InActive']}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={user?.isActive === false}
                  startIcon={<LockIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      'Lock Account',
                      `Are you sure you want to lock ${user.firstname}'s account? They will not be able to log in until the account is unlocked. This action preserves all transaction history.`,
                      () => handleAccountStatusChange('lock')
                    )
                  }
                >
                  Lock Account
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  disabled={user?.isActive === false}
                  startIcon={<BlockIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      'Suspend Account',
                      `Are you sure you want to suspend ${user.firstname}'s account? This will prevent them from using the platform until reactivated.`,
                      () => handleAccountStatusChange('suspend')
                    )
                  }
                >
                  Suspend Account
                </Button>

                <Button
                  variant="outlined"
                  color="success"
                  disabled={user?.isActive === true}
                  startIcon={<RestoreIcon />}
                  onClick={() =>
                    openConfirmDialog('Reactivate Account', `Are you sure you want to reactivate ${user.firstname}'s account?`, () =>
                      handleAccountStatusChange('reactivate')
                    )
                  }
                >
                  Reactivate Account
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<KeyIcon />}
                  onClick={() =>
                    openConfirmDialog('Reset Password', `Are you sure you want to send a password reset link to ${user.email}?`, () =>
                      handleSecurityReset('password')
                    )
                  }
                >
                  Reset Password
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<SecurityIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      'Reset 2FA',
                      `Are you sure you want to reset 2FA for ${user.firstname}? A setup link will be sent to ${user.email}.`,
                      () => handleSecurityReset('2fa')
                    )
                  }
                >
                  Reset 2FA
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
