import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";

const LoadingRow = () => (
  <TableRow>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
        <Skeleton width={150} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton width={100} />
    </TableCell>
    <TableCell>
      <Skeleton width={200} />
    </TableCell>
    <TableCell>
      <Skeleton width={200} />
    </TableCell>
    <TableCell>
      <Skeleton width={150} />
    </TableCell>
  </TableRow>
);

const TransactionRow = ({ transaction, onSelect }) => (
  <TableRow
    hover
    onClick={() => onSelect(transaction)}
    sx={{ cursor: "pointer" }}
  >
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={transaction.logo} sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography>
          {transaction.name} ({transaction.symbol})
        </Typography>
      </Box>
    </TableCell>
    <TableCell>{transaction.balance}</TableCell>
    <TableCell
      sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}
    >
      {transaction.from}
    </TableCell>
    <TableCell
      sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}
    >
      {transaction.to}
    </TableCell>
    <TableCell>
      {new Date(transaction.blockTimestamp).toLocaleString()}
    </TableCell>
  </TableRow>
);

const TransactionFeed = ({
  transactionFeed,
  onSelectTransaction,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Skeleton width={200} />
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <LoadingRow key={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transaction Feed
        </Typography>
        {transactionFeed?.balances?.map((dateGroup, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {dateGroup.date}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dateGroup.transactions.map((transaction, tIndex) => (
                    <TransactionRow
                      key={tIndex}
                      transaction={transaction}
                      onSelect={onSelectTransaction}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionFeed;
