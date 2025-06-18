import { useState } from "react";
import { Box, Grid } from "@mui/material";

import TransactionFeed from "./components/TransactionFeed";
import TransactionFilters from "./components/TransactionFilters";
import TransactionDetails from "./components/TransactionDetails";
import ExportTransactions from "./components/ExportTransactions";
import { mockTransactions } from "./data/mockData";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    type: "all",
    status: "all",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...mockTransactions];
    if (newFilters.type !== "all") {
      filtered = filtered.filter((t) => t.type === newFilters.type);
    }
    if (newFilters.status !== "all") {
      filtered = filtered.filter((t) => t.status === newFilters.status);
    }
    if (newFilters.dateFrom) {
      filtered = filtered.filter(
        (t) => new Date(t.date) >= newFilters.dateFrom
      );
    }
    if (newFilters.dateTo) {
      filtered = filtered.filter((t) => new Date(t.date) <= newFilters.dateTo);
    }
    setTransactions(filtered);
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
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
              transactions={transactions}
              onSelectTransaction={setSelectedTransaction}
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
    </Box>
  );
};

export default TransactionManagement;
