import React, { useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemButton } from '@mui/material';

const OrderQueue = ({ buyOrders, sellOrders, onOrderClick }) => {
  const [tab, setTab] = useState(0);
  const orders = tab === 0 ? buyOrders : sellOrders;

  return (
    <Card sx={{ background: 'white', borderRadius: 2, boxShadow: 1 }}>
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
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No orders</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} hover sx={{ cursor: 'pointer' }} onClick={() => onOrderClick(order)}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.date ? new Date(order.date).toLocaleString() : ''}</TableCell>
                    <TableCell>{order.user?.username}</TableCell>
                    <TableCell>{order.transactionType}</TableCell>
                    <TableCell>{order.walletAddress}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default OrderQueue; 