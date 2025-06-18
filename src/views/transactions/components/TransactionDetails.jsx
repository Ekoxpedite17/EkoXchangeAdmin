import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Button, Box, Chip, Stack,   IconButton, } from '@mui/material';
import { statusColors } from '../data/mockData';
import CloseIcon from '@mui/icons-material/Close';

const TransactionDetails = ({ transaction, onClose }) => {
  if (!transaction) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="textSecondary" align="center">
            Select a transaction to view details
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Transaction Details</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Transaction Details</Typography>
            <Chip label={transaction.status} color={statusColors[transaction.status]} />
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            Transaction Info
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="ID" secondary={transaction.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date" secondary={new Date(transaction.date).toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Amount" secondary={transaction.amount} />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            User Information
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Username" secondary={transaction.user.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={transaction.user.email} />
            </ListItem>
          </List>

          {transaction.evidence && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Payment Evidence
              </Typography>
              <Box sx={{ my: 2 }}>
                <img src={transaction.evidence} alt="Payment Evidence" style={{ maxWidth: '100%', borderRadius: '4px' }} />
              </Box>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Trade History
          </Typography>
          <List dense>
            {transaction.tradeHistory.map((trade) => (
              <ListItem key={trade.id}>
                <ListItemText primary={`${trade.type} - ${trade.amount}`} secondary={new Date(trade.date).toLocaleString()} />
              </ListItem>
            ))}
          </List>

          {transaction.status === 'flagged' && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" color="error" gutterBottom>
                Flag Reason
              </Typography>
              <Typography variant="body2" color="error">
                {transaction.flagReason}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="success" fullWidth sx={{ mb: 1 }}>
                  Approve Transaction
                </Button>
                <Button variant="contained" color="error" fullWidth>
                  Reject Transaction
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionDetails;
