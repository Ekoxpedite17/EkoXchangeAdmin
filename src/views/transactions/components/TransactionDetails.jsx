import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Box, Stack, IconButton, Avatar } from '@mui/material';
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
        <Typography variant="h3">Transaction Details</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar src={transaction.logo} sx={{ width: 40, height: 40 }} />
            <Typography variant="h5">
              {transaction.name} ({transaction.symbol})
            </Typography>
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            Transaction Info
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Balance" 
                secondary={`${transaction.balance} ${transaction.symbol}`} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Token Address" 
                secondary={transaction.tokenAddress} 
                secondaryTypographyProps={{
                  sx: { wordBreak: 'break-all' }
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Timestamp" 
                secondary={new Date(transaction.blockTimestamp).toLocaleString()} 
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Transaction Details
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="From Address" 
                secondary={transaction.from}
                secondaryTypographyProps={{
                  sx: { wordBreak: 'break-all' }
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="To Address" 
                secondary={transaction.to}
                secondaryTypographyProps={{
                  sx: { wordBreak: 'break-all' }
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Decimals" 
                secondary={transaction.decimals} 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionDetails;
