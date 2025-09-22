import React, { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Typography,
  Chip,
  TablePagination,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import ContentCopy from "@mui/icons-material/ContentCopy";

const OrderQueue = ({ buyOrders, sellOrders, onOrderClick, tab, setTab }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = tab === 0 ? buyOrders : sellOrders;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getTokenIcon = (symbol) => {
    const icons = {
      BTC: "₿",
      SOL: "◎",
      ETH: "Ξ",
    };
    return icons[symbol] || "●";
  };

  const getWalletAddress = (order) => {
    if (!order.createdBy) return null;

    const tokenSymbol = order?.selectedToken?.chain?.nativeToken;
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

  const getWalletAddressLabel = (tokenSymbol) => {
    switch (tokenSymbol?.toUpperCase()) {
      case "BTC":
        return "Bitcoin Address";
      case "ETH":
        return "Ethereum Address";
      case "SOL":
        return "Solana Address";
      case "TRX":
        return "Tron Address";
      default:
        return "Wallet Address";
    }
  };

  return (
    <Card sx={{ background: "white", borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Buy" />
          <Tab label="Sell" />
        </Tabs>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{tab === 0 ? "Token" : "Asset Sold"}</TableCell>
                <TableCell>
                  {tab === 0 ? "Amount" : "Naira Amount to be Paid"}
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {tab === 0 ? "Status" : "User Bank Details"}
                </TableCell>
                <TableCell>{tab === 0 && "Wallet Address"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => {
                  return (
                    <TableRow
                      key={order.id || order._id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => onOrderClick(order)}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {order.id || order._id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box gap={10}>
                              <Typography
                                variant="button"
                                fontSize={10}
                                fontWeight="medium"
                              >
                                {order.selectedToken?.symbol}
                              </Typography>
                              <Typography fontWeight={"600"}>
                                {order.selectedToken?.name}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: "12px",
                                bgcolor: "secondary.main",
                                color: "white",
                                border: 1,
                                borderColor: "secondary.main",
                              }}
                            >
                              {getTokenIcon(order.tokenSymbol)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {order.tokenName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {order.tokenSymbol}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <>
                            <Typography variant="body2">
                              {formatCurrency(order.unitPrice)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              USD: ${order.usdPrice}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" fontWeight="medium">
                            {formatCurrency(order.amountToPay)}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {order?.createdBy?.firstname &&
                            order?.createdBy?.lastname
                              ? `${order.createdBy.firstname} ${order.createdBy.lastname}`
                              : order?.createdBy?.firstname ||
                                order?.createdBy?.lastname ||
                                "--"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order?.createdBy?.email || "--"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Chip
                            label={order.status}
                            size="small"
                            color={
                              order.status === "pending"
                                ? "warning"
                                : order.status === "completed"
                                  ? "success"
                                  : "default"
                            }
                          />
                        ) : (
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {order.bankName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {order.accountName}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                              sx={{ fontFamily: "monospace" }}
                            >
                              {order.accountNumber}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Box>
                            {(() => {
                              const walletAddress = getWalletAddress(order);
                              const addressLabel = getWalletAddressLabel(
                                order?.selectedToken?.chain?.nativeToken
                              );

                              if (!walletAddress) {
                                return (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    No wallet address
                                  </Typography>
                                );
                              }

                              return (
                                <>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    {addressLabel}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontFamily: "monospace",
                                      fontSize: "0.75rem",
                                      wordBreak: "break-all",
                                      maxWidth: "200px",
                                    }}
                                  >
                                    {walletAddress}
                                  </Typography>
                                  <Tooltip title="Copy address">
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
                                          walletAddress
                                        );
                                      }}
                                    />
                                  </Tooltip>
                                </>
                              );
                            })()}
                          </Box>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
      </CardContent>
    </Card>
  );
};

export default OrderQueue;
