import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography } from '@mui/material';
import { statusColors, typeIcons } from '../data/mockData';

const TransactionRow = ({ transaction, onSelect }) => {
  return (
    <>
      <TableRow hover onClick={() => onSelect(transaction)} sx={{ cursor: 'pointer' }}>
        <TableCell>{transaction.id}</TableCell>
        <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
        <TableCell>
          <Typography component="span" sx={{ mr: 1 }}>
            {typeIcons[transaction.type]}
          </Typography>
          {transaction.type}
        </TableCell>
        <TableCell>
          <Chip label={transaction.status} color={statusColors[transaction.status]} size="small" />
        </TableCell>
        <TableCell>{transaction.amount}</TableCell>
      </TableRow>
    </>
  );
};

const TransactionFeed = ({ transactions, onSelectTransaction }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transactions
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} onSelect={onSelectTransaction} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionFeed;
