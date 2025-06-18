import { Box, Typography, Grid, Paper } from '@mui/material';

const TransactionDetails = ({ transaction }) => {
  if (!transaction) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transaction Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Transaction ID</Typography>
          <Typography variant="body1">{transaction.id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Amount</Typography>
          <Typography variant="body1">${transaction.amount}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Date</Typography>
          <Typography variant="body1">{transaction.date}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Status</Typography>
          <Typography variant="body1">{transaction.status}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Description</Typography>
          <Typography variant="body1">{transaction.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransactionDetails;
