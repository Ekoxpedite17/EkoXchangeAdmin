import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import TransactionFeed from "./components/TransactionFeed";
import TransactionFilters from "./components/TransactionFilters";
import TransactionDetails from "./components/TransactionDetails";
import ExportTransactions from "./components/ExportTransactions";
import OrderQueue from "./components/OrderQueue";
import { mockTransactions } from "./data/mockData";
import { EkoServices_Transactions } from "../../services";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    type: "all",
    status: "all",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use mock data for buy and sell orders, including user and transaction details
  const buyOrders = [
    {
      id: 1,
      amount: "0.5 BTC",
      date: "2023-11-20T09:30:00Z",
      user: { username: "johndoe", email: "john.doe@example.com" },
      transactionId: "TRX-001",
      transactionType: "crypto",
      transactionStatus: "pending",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      evidence: "https://example.com/evidence/001.jpg",
    },
    {
      id: 2,
      amount: "1.2 ETH",
      date: "2023-11-20T10:00:00Z",
      user: { username: "mikebrown", email: "mike.brown@example.com" },
      transactionId: "TRX-003",
      transactionType: "crypto",
      transactionStatus: "pending",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      evidence: "https://example.com/evidence/003.jpg",
    },
    {
      id: 3,
      amount: "$500 Amazon Card",
      date: "2023-11-20T10:30:00Z",
      user: { username: "janedoe", email: "jane.doe@example.com" },
      transactionId: "TRX-002",
      transactionType: "giftcard",
      transactionStatus: "pending",
      walletAddress: "N/A",
      evidence: "https://example.com/evidence/002.jpg",
    },
  ];
  const sellOrders = [
    {
      id: 4,
      amount: "0.3 BTC",
      date: "2023-11-20T11:00:00Z",
      user: { username: "johndoe", email: "john.doe@example.com" },
      transactionId: "TRX-001",
      transactionType: "crypto",
      transactionStatus: "pending",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      accountNumber: "1234567890",
      evidence: "https://example.com/evidence/001.jpg",
    },
    {
      id: 5,
      amount: "$300 iTunes Card",
      date: "2023-11-20T11:30:00Z",
      user: { username: "janedoe", email: "jane.doe@example.com" },
      transactionId: "TRX-002",
      transactionType: "giftcard",
      transactionStatus: "pending",
      walletAddress: "N/A",
      accountNumber: "9876543210",
      evidence: "https://example.com/evidence/002.jpg",
    },
    {
      id: 6,
      amount: "2.0 ETH",
      date: "2023-11-20T12:00:00Z",
      user: { username: "mikebrown", email: "mike.brown@example.com" },
      transactionId: "TRX-003",
      transactionType: "crypto",
      transactionStatus: "pending",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      accountNumber: "1122334455",
      evidence: "https://example.com/evidence/003.jpg",
    },
  ];

  const fetchTransactions = async () => {
    setLoading(true);
    const response = await EkoServices_Transactions.getTransactionList();
    if (response) {
      setLoading(false);
      setTransactions(response);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...transactions];
    
    if (newFilters.cryptocurrency !== 'all') {
      filtered = filtered.filter(item => 
        item.transactions.some(t => t.symbol === newFilters.cryptocurrency)
      );
    }

    if (newFilters.fromAddress) {
      filtered = filtered.filter(item =>
        item.transactions.some(t => 
          t.from.toLowerCase().includes(newFilters.fromAddress.toLowerCase())
        )
      );
    }

    if (newFilters.toAddress) {
      filtered = filtered.filter(item =>
        item.transactions.some(t => 
          t.to.toLowerCase().includes(newFilters.toAddress.toLowerCase())
        )
      );
    }

    if (newFilters.dateFrom) {
      filtered = filtered.filter(item =>
        item.transactions.some(t => 
          new Date(t.blockTimestamp) >= new Date(newFilters.dateFrom)
        )
      );
    }

    if (newFilters.dateTo) {
      filtered = filtered.filter(item =>
        item.transactions.some(t => 
          new Date(t.blockTimestamp) <= new Date(newFilters.dateTo)
        )
      );
    }

    setTransactions(filtered);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };
  const handleOrderModalClose = () => {
    setOrderModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item size={12}>
          <OrderQueue
            buyOrders={buyOrders}
            sellOrders={sellOrders}
            onOrderClick={handleOrderClick}
          />
        </Grid>
      </Grid>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        sx={{ flexGrow: 1 }}
      >
        <Grid
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          item
          xs={12}
        >
          <TransactionFilters onFilterChange={handleFilterChange} />
          <ExportTransactions transactions={transactions} />
        </Grid>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TransactionFeed
              transactionFeed={transactions || []}
              onSelectTransaction={(transaction) =>
                setSelectedTransaction(transaction)
              }
            />
          </Grid>
        </Grid>
      </Box>

      {/* Overlay Sidebar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100vh",
          backgroundColor: "background.paper",
          boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.1)",
          transform: selectedTransaction ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 1200,
          p: 2,
        }}
      >
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      </Box>

      <Dialog
        open={orderModalOpen}
        onClose={handleOrderModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 1 }}>
              <Box
                component={"div"}
                sx={{
                  background: "#fafbfc",
                  borderRadius: 2,
                  boxShadow: 1,
                  p: 3,
                  mb: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Order Information
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">
                    <strong>Order ID:</strong> {selectedOrder.id}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Amount:</strong> {selectedOrder.amount}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Date:</strong>{" "}
                    {selectedOrder.date
                      ? new Date(selectedOrder.date).toLocaleString()
                      : ""}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Transaction ID:</strong>{" "}
                    {selectedOrder.transactionId}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Type:</strong> {selectedOrder.transactionType}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>User:</strong> {selectedOrder.user?.username} (
                    {selectedOrder.user?.email})
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Wallet Address:</strong>{" "}
                    {selectedOrder.walletAddress}
                  </Typography>
                  {selectedOrder.accountNumber && (
                    <Typography variant="subtitle2">
                      <strong>Account Number:</strong>{" "}
                      {selectedOrder.accountNumber}
                    </Typography>
                  )}
                </Box>
                {selectedOrder.evidence && (
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <strong>Payment Evidence:</strong>
                    </Typography>
                    <Box
                      component="img"
                      src={selectedOrder.evidence}
                      alt="Payment Evidence"
                      sx={{
                        maxWidth: "100%",
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        boxShadow: 2,
                        mb: 1,
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            variant="contained"
            onClick={handleOrderModalClose}
          >
            Accept
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleOrderModalClose}
          >
            Reject
          </Button>
          <Button onClick={handleOrderModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionManagement;
