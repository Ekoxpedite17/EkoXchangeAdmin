import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { EkoServices_Crypty } from "../../../services";

const RateManagement = () => {
  const [dummrates, setdummrates] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      buyRate: 59200,
      sellRate: 58800,
      lastUpdated: new Date(),
      spread: 0.68,
      source: "Binance",
      overrideUntil: "2024-07-01 12:00",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      buyRate: 3120,
      sellRate: 3080,
      lastUpdated: new Date(),
      spread: 1.29,
      source: "Coinbase",
      overrideUntil: "2024-07-02 09:00",
    },
    {
      name: "USDT",
      symbol: "USDT",
      buyRate: 1.0,
      sellRate: 1.0,
      lastUpdated: new Date(),
      spread: 0.01,
      source: "Kraken",
      overrideUntil: "2024-07-03 18:00",
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rateMethod, setRateMethod] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [editEnabled, setEditEnabled] = useState({});

  // const fetchdummrates = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await EkoServices_Crypty.getdummrates();
  //     if (response) {
  //       setdummrates(response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching dummrates:", error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchdummrates();
  // }, []);

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setOpenDialog(true);
  };

  const handleAddRate = () => {
    setSelectedRate(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRate(null);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Rate Management
        </Typography>
        <Box display="flex" alignItems="center" gap={2}></Box>
      </Box>

      <Card sx={{ borderRadius: 2, bgcolor: "white" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cryptocurrency</TableCell>
                <TableCell>Buy Rate</TableCell>
                <TableCell>Sell Rate</TableCell>
                <TableCell>Spread (%)</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Override Until</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummrates?.map((rate) => (
                <TableRow key={rate?.symbol} hover sx={{ cursor: "default" }}>
                  <TableCell>
                    {rate?.name}{" "}
                    <Typography component="span" color="grey.700">
                      {rate.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell>${rate?.buyRate.toLocaleString()}</TableCell>
                  <TableCell>${rate?.sellRate.toLocaleString()}</TableCell>
                  <TableCell>{rate.spread}</TableCell>
                  <TableCell>{rate.source}</TableCell>
                  <TableCell>{rate.overrideUntil}</TableCell>
                  <TableCell>&lt; 1 min ago</TableCell>
                  <TableCell
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(rate)}
                      sx={{ color: "white", bgcolor: "#1976d2" }}
                      disabled={!editEnabled[rate.symbol]}
                    >
                      Edit
                    </Button>
                    <Switch
                      checked={!!editEnabled[rate.symbol]}
                      onChange={() =>
                        setEditEnabled((prev) => ({
                          ...prev,
                          [rate.symbol]: !prev[rate.symbol],
                        }))
                      }
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Set Buy Rates Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: "white",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Set Buy Rates
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "white" }}>
          <Typography variant="h6" color="black" gutterBottom>
            {selectedRate
              ? `Set Buy Rates for ${selectedRate.name}`
              : "Set Buy Rates"}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={rateMethod}
              onChange={(e) => setRateMethod(e.target.value)}
            >
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label={
                  <Box>
                    <Typography color="black">Manual</Typography>
                    <Box display="flex" gap={2} mt={1}>
                      <TextField
                        size="small"
                        label="USD"
                        value="11.78"
                        sx={{
                          width: 100,
                          input: { color: "black" },
                          label: { color: "grey.700" },
                        }}
                      />
                      <TextField
                        size="small"
                        label="EUR"
                        value="1344"
                        sx={{
                          width: 100,
                          input: { color: "black" },
                          label: { color: "grey.700" },
                        }}
                      />
                    </Box>
                  </Box>
                }
              />
              <FormControlLabel
                value="automatic"
                control={<Radio />}
                label={
                  <Box>
                    <Typography color="black">Automatic</Typography>
                    <Typography variant="body2" color="grey.700">
                      Calculate buy rates dynamically
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="integrated"
                control={<Radio />}
                label={
                  <Box>
                    <Typography color="black">Integrated</Typography>
                    <Typography variant="body2" color="grey.700">
                      Use buy rates from a third-party service
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "white" }}>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RateManagement;
