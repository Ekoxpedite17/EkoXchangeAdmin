import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ListAltIcon from "@mui/icons-material/ListAlt";

// Mock data
const kpiData = {
  revenue: 1250000,
  volume: 75000000,
  usersToday: 150,
};
const kycPending = 8;
const disputesOpen = 3;
const highValueAlert = { amount: 800000, type: "Buy", time: "25 mins ago" };
const failedTrades = 5;
const topAssets = [
  { label: "BFC", value: 40, color: "#1976d2" },
  { label: "ETH", value: 30, color: "#43a047" },
  { label: "USPT", value: 20, color: "#fbc02d" },
  { label: "Other", value: 10, color: "#9e9e9e" },
];
const liveTrades = [
  { name: "Robert Johnson", asset: "NGN", amount: "5,000", type: "Buy" },
  { name: "Mary Smith", asset: "BTC", amount: "50 USDT", type: "Buy" },
  { name: "John Doe", asset: "BTC", amount: "1 BTC", type: "Sold" },
  { name: "Jane Adams", asset: "BTC", amount: "0.05 BTC", type: "Buy" },
  { name: "Michael Brown", asset: "BTC", amount: "0.2 BTC", type: "Buy" },
];
const giftCards = [
  { name: "2 - Amazon", time: "25 mins ago" },
  { name: "1 iTunes", time: "1 hr ago" },
  { name: "2 Google Play", time: "3 hrs ago" },
];
const systemHealth = [
  { label: "API", status: "healthy" },
  { label: "Service", status: "healthy" },
  { label: "DB", status: "healthy" },
];
const apiStatus = { errors: 0, lastCheck: "3 hr ago" };

function StatCard({ icon, label, value, accent }) {
  return (
    <Card sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: accent, color: "white" }}>{icon}</Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function DonutChartCard() {
  // Placeholder donut chart using colored chips
  return (
    <Card
      sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 3, height: "100%" }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Top Assets Traded
        </Typography>
        <Box gap={4}>
          {topAssets.map((asset) => (
            <Chip
              key={asset.label}
              label={asset.label}
              sx={{ bgcolor: asset.color, color: "white", mb: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function LiveTradesFeedCard() {
  return (
    <Card sx={{ bgcolor: 'white', boxShadow: 1, borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>Live Trades Feed</Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Asset</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liveTrades.map((trade, idx) => (
                <TableRow key={idx}>
                  <TableCell>{trade.name}</TableCell>
                  <TableCell>{trade.asset}</TableCell>
                  <TableCell>{trade.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={trade.type}
                      color={trade.type === 'Buy' ? 'success' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function GiftCardsCard() {
  return (
    <Card
      sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 3, height: "100%" }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Gift Cards
        </Typography>
        {giftCards.map((card, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="body2">{card.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {card.time}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function SystemHealthCard() {
  return (
    <Card
      sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 3, height: "100%" }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          System Health
        </Typography>
        <Box display="flex" gap={1}>
          {systemHealth.map((item, idx) => (
            <Chip
              key={item.label}
              label={item.label}
              color={item.status === "healthy" ? "success" : "error"}
              size="small"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function ApiStatusCard() {
  return (
    <Card
      sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 3, height: "100%" }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          API Errors
        </Typography>
        <Typography
          variant="h6"
          color={apiStatus.errors === 0 ? "success.main" : "error.main"}
        >
          {apiStatus.errors === 0 ? "No Errors" : `${apiStatus.errors} Errors`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          API Health Check Completed {apiStatus.lastCheck}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Top Row */}
        <Grid item size={3} md={3}>
          <StatCard
            icon={<TrendingUpIcon />}
            label="Total Revenue"
            value={`₦${kpiData.revenue.toLocaleString()}`}
            accent="#1976d2"
          />
        </Grid>
        <Grid item size={3} md={3}>
          <StatCard
            icon={<PieChartOutlineIcon />}
            label="Total Volume"
            value={`₦${kpiData.volume.toLocaleString()}`}
            accent="#43a047"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<VerifiedUserIcon />}
            label="KYC Pending"
            value={kycPending}
            accent="#1976d2"
          />
        </Grid>
        <Grid item size={3} md={3}>
          <StatCard
            icon={<PeopleAltIcon />}
            label="Users Today"
            value={kpiData.usersToday}
            accent="#fbc02d"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Second Row */}
        <Grid item size={3} md={3}>
          <StatCard
            icon={<ReportProblemIcon />}
            label="Disputes Open"
            value={disputesOpen}
            accent="#e57373"
          />
        </Grid>
        <Grid item size={3} md={3}>
          <StatCard
            icon={<WarningAmberIcon />}
            label="High-Value Alerts"
            value={`₦${highValueAlert.amount.toLocaleString()}`}
            accent="#ff9800"
          />
        </Grid>
        <Grid item size={3} md={3}>
          <StatCard
            icon={<ErrorOutlineIcon />}
            label="Failed Trades"
            value={failedTrades}
            accent="#9e9e9e"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DonutChartCard />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Row 3: Live Trades Feed & Gift Cards */}
        <Grid item size={6} md={6}>
          <LiveTradesFeedCard />
        </Grid>
        <Grid item size={6} md={6}>
          <GiftCardsCard />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Row 4: System Health & API Status */}
        <Grid item size={6} md={6}>
          <SystemHealthCard />
        </Grid>
        <Grid item size={6} md={6}>
          <ApiStatusCard />
        </Grid>
      </Grid>
    </Box>
  );
}
