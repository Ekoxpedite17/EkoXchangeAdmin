import { useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import TransactionFeed from "./components/TransactionFeed";
import TransactionFilters from "./components/TransactionFilters";
import TransactionDetails from "./components/TransactionDetails";
import ExportTransactions from "./components/ExportTransactions";
import OrderQueue from "./components/OrderQueue";
import ManualWithdrawal from "../crypto/components/ManualWithdrawal";
import ContentCopy from "@mui/icons-material/ContentCopy";

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
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [tab, setTab] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);

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

  const fetchBuyOrderQueue = async () => {
    const data = await EkoServices_Transactions.getBuyOrderQueue();
    if (data) {
      setBuyOrders(data);
    }
  };

  const fetchSellOrderQueue = async () => {
    const data = await EkoServices_Transactions.getSellOrderQueue({
      skip,
      limit,
    });
    if (data) {
      setSellOrders(data);
    }
  };

  useEffect(() => {
    fetchTransactions();

    if (tab === 0) {
      fetchBuyOrderQueue();
    } else if (tab === 1) {
      fetchSellOrderQueue();
    }
  }, [tab]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...transactions];

    if (newFilters.cryptocurrency !== "all") {
      filtered = filtered.filter((item) =>
        item.transactions.some((t) => t.symbol === newFilters.cryptocurrency)
      );
    }

    if (newFilters.fromAddress) {
      filtered = filtered.filter((item) =>
        item.transactions.some((t) =>
          t.from.toLowerCase().includes(newFilters.fromAddress.toLowerCase())
        )
      );
    }

    if (newFilters.toAddress) {
      filtered = filtered.filter((item) =>
        item.transactions.some((t) =>
          t.to.toLowerCase().includes(newFilters.toAddress.toLowerCase())
        )
      );
    }

    if (newFilters.dateFrom) {
      filtered = filtered.filter((item) =>
        item.transactions.some(
          (t) => new Date(t.blockTimestamp) >= new Date(newFilters.dateFrom)
        )
      );
    }

    if (newFilters.dateTo) {
      filtered = filtered.filter((item) =>
        item.transactions.some(
          (t) => new Date(t.blockTimestamp) <= new Date(newFilters.dateTo)
        )
      );
    }

    setTransactions(filtered);
  };

  const getWalletAddress = (order) => {
    if (!order.createdBy) return null;

    const { tokenSymbol } = order;
    const user = order.createdBy;

    switch (tokenSymbol?.toUpperCase()) {
      case "BTC":
        return user.bitcoinAddress;
      case "ETH":
        return user.ethereumAddress;
      case "SOL":
        return user.solanaAddress;
      case "TRX":
        return user.tronAddress;
      default:
        return null;
    }
  };

  const handleOrderClick = (order) => {
    const walletAddress = getWalletAddress(order);
    setSelectedOrder({ ...order, walletAddress });
    setOrderModalOpen(true);
  };

  const handleOrderModalClose = () => {
    setOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setImagePreviewOpen(true);
  };

  const handleImagePreviewClose = () => {
    setImagePreviewOpen(false);
    setPreviewImage(null);
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleAcceptOrder = async (id) => {
    const data = await EkoServices_Transactions.updateBuyOrderQueue(id, {
      status: "completed",
    });
    if (data) {
      fetchTransactions();
      fetchBuyOrderQueue();
      setOrderModalOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item size={12}>
          <OrderQueue
            sellOrders={sellOrders}
            onOrderClick={handleOrderClick}
            buyOrders={buyOrders}
            setTab={setTab}
            tab={tab}
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

      {/* Background Overlay */}
      {(selectedTransaction || orderModalOpen) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1100,
            cursor: "pointer",
          }}
          onClick={() => {
            if (selectedTransaction) setSelectedTransaction(null);
            if (orderModalOpen) {
              setOrderModalOpen(false);
              setSelectedOrder(null);
            }
          }}
        />
      )}

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

      <Box>
        {tab === 0 && selectedOrder && (
          <Grid
            sx={{
              position: "fixed",
              alignSelf: "flex-end",
              bottom: 30,
              width: "950px",
              transform: orderModalOpen ? "translateX(0)" : "translateX(100%)",
              zIndex: 1400,
              right: 250,
              height: "100vh",
            }}
            container
            justifyContent="center"
          >
            <Grid item size={8} alignContent={"flex-end"}>
              <ManualWithdrawal />
            </Grid>
          </Grid>
        )}

        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100vh",
            backgroundColor: "background.paper",
            boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.1)",
            transform: orderModalOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
            overflowY: "auto",
            zIndex: 1400,
            p: 2,
          }}
        >
          {selectedOrder && (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                zIndex={1500}
              >
                <Typography variant="h3">Order Details</Typography>
                <IconButton onClick={handleOrderModalClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                    >
                      {selectedOrder.tokenSymbol?.charAt(0) || "O"}
                    </Avatar>
                    <Typography variant="h5">
                      {selectedOrder.tokenName} ({selectedOrder.tokenSymbol})
                    </Typography>
                  </Stack>

                  <Typography variant="subtitle1" gutterBottom>
                    Order Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Order ID"
                        secondary={selectedOrder.id}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Unit Price (NGN)"
                        secondary={formatNaira(selectedOrder.unitPrice)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="USD Price"
                        secondary={`$${selectedOrder.usdPrice}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Amount to Pay (NGN)"
                        secondary={formatNaira(selectedOrder.amountToPay)}
                      />
                    </ListItem>

                    <ListItem sx={{}}>
                      <ListItemText
                        primary="Wallet Address"
                        secondary={selectedOrder.walletAddress || "N/A"}
                      />
                      <Tooltip style={{}} title="Copy address">
                        <ContentCopy
                          fontSize="small"
                          sx={{
                            cursor: "pointer",
                            color: "text.secondary",
                            mt: 0.5,
                            "&:hover": {
                              color: "primary.main",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                              selectedOrder.walletAddress
                            );
                          }}
                        />
                      </Tooltip>
                    </ListItem>

                    <ListItem>
                      <ListItemText
                        primary="Status"
                        secondary={selectedOrder.status}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Created At"
                        secondary={new Date(
                          selectedOrder.createdAt
                        ).toLocaleString()}
                      />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Bank Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Bank Name"
                        secondary={selectedOrder.bankName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Account Name"
                        secondary={selectedOrder.accountName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Account Number"
                        secondary={selectedOrder.accountNumber}
                      />
                    </ListItem>
                  </List>

                  {tab === 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        Transaction Receipt
                      </Typography>
                      <List
                        dense
                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                      >
                        <ListItem>
                          <ListItemText
                            primary="Status"
                            secondary={
                              selectedOrder.transactionReceipt
                                ? "Uploaded"
                                : "Not uploaded"
                            }
                          />
                        </ListItem>
                        {selectedOrder.transactionReceipt && (
                          <ListItem>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleImagePreview(
                                  selectedOrder.transactionReceipt
                                )
                              }
                              sx={{ mt: 1 }}
                            >
                              Preview Image
                            </Button>
                          </ListItem>
                        )}
                      </List>
                    </>
                  )}
                </CardContent>
              </Card>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  onClick={() => handleAcceptOrder(selectedOrder.id)}
                >
                  Complete
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  fullWidth
                  onClick={handleOrderModalClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
        open={imagePreviewOpen}
        onClose={handleImagePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Transaction Receipt Preview
          <IconButton
            onClick={handleImagePreviewClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewImage && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                component="img"
                src={previewImage}
                alt="Transaction Receipt"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  boxShadow: 2,
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImagePreviewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionManagement;
