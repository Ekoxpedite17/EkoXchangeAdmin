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
} from "@mui/material";
import dayjs from "dayjs";

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
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Wallet Address</TableCell>
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
                paginatedOrders.map((order) => (
                  <TableRow
                    key={order.id || order._id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => onOrderClick(order)}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: "12px",
                            bgcolor: "primary.main",
                            color: "white",
                            border: 1,
                            borderColor: "primary.main",
                          }}
                        >
                          {getTokenIcon(order.tokenSymbol)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {order.tokenName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.tokenSymbol}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(order.unitPrice)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        USD: ${order.usdPrice}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {dayjs(order.createdAt).format("YYYY-MM-DD")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {/* {formatCurrency(order.amountToPay)} */}
                        User data not listed as part of object
                      </Typography>
                    </TableCell>

                    <TableCell>
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
                    </TableCell>

                    <TableCell>
                      <Box>
                        {/* <Typography variant="body2" fontWeight="medium">
                          {order.bankName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.accountName}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {order.accountNumber}
                        </Typography> */}
                        Wallet Address not listed as part of object
                      </Box>
                    </TableCell>

                    {/* <TableCell>
                      <Typography variant="body2">
                        {formatDate(order.createdAt)}
                      </Typography>
                    </TableCell> */}
                  </TableRow>
                ))
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
