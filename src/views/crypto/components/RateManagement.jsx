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
import dayjs from "dayjs";

const RateManagement = () => {
  const [rates, setRates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rateMethod, setRateMethod] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [editEnabled, setEditEnabled] = useState({});
  const [rateForm, setRateForm] = useState({
    buyRate: "",
    sellRate: "",
  });

  const fetchRates = async () => {
    const data = await EkoServices_Crypty.getRates();
    if (data) {
      setRates(data);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setRateForm({
      buyRate: rate.buyRate.toString(),
      sellRate: rate.sellRate.toString(),
    });
    setOpenDialog(true);
  };

  const handleAddRate = () => {
    setSelectedRate(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRate(null);
    setRateForm({ buyRate: "", sellRate: "" });
  };

  const handleSaveRate = async () => {
    if (selectedRate && rateForm.buyRate && rateForm.sellRate) {
      try {
        setLoading(true);

        await EkoServices_Crypty.updateRates({
          tokenName: selectedRate.tokenName.toUpperCase(),
          buyRate: parseFloat(rateForm.buyRate),
          sellRate: parseFloat(rateForm.sellRate),
        });

        fetchRates();

        handleCloseDialog();
      } catch (error) {
        console.error("Error updating rate:", error);
      } finally {
        setLoading(false);
      }
    }
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
                <TableCell>Buy Rate (NGN)</TableCell>
                <TableCell>Sell Rate (NGN)</TableCell>
                <TableCell>Spread (%)</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates?.map((rate) => {
                const spread = (
                  ((rate.sellRate - rate.buyRate) / rate.buyRate) *
                  100
                ).toFixed(2);
                const lastUpdated = dayjs(rate.updatedAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                );

                return (
                  <TableRow key={rate?._id} hover sx={{ cursor: "default" }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {rate.tokenName.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        ₦{rate?.buyRate.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        ₦{rate?.sellRate.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={spread > 2 ? "error.main" : "success.main"}
                        fontWeight="medium"
                      >
                        {spread}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {lastUpdated}
                      </Typography>
                    </TableCell>
                    <TableCell
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(rate)}
                        sx={{ color: "white", bgcolor: "#1976d2" }}
                        disabled={!editEnabled[rate.tokenName]}
                      >
                        Edit
                      </Button>
                      <Switch
                        checked={!!editEnabled[rate.tokenName]}
                        onChange={() =>
                          setEditEnabled((prev) => ({
                            ...prev,
                            [rate.tokenName]: !prev[rate.tokenName],
                          }))
                        }
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

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
          Set Buy / Sell Rates
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "white" }}>
          <Typography variant="h6" color="black" gutterBottom>
            {selectedRate
              ? `Set Buy Rates for ${selectedRate.tokenName.toUpperCase()}`
              : "Set Buy Rates"}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={rateMethod}
              onChange={(e) => setRateMethod(e.target.value)}
              style={{ gap: 15 }}
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
                        label="Buy Rate (NGN)"
                        value={rateForm.buyRate}
                        onChange={(e) =>
                          setRateForm({ ...rateForm, buyRate: e.target.value })
                        }
                        type="number"
                        sx={{
                          width: 150,
                          input: { color: "black" },
                          label: { color: "grey.700" },
                        }}
                      />
                      <TextField
                        size="small"
                        label="Sell Rate (NGN)"
                        value={rateForm.sellRate}
                        onChange={(e) =>
                          setRateForm({ ...rateForm, sellRate: e.target.value })
                        }
                        type="number"
                        sx={{
                          width: 150,
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveRate}
            disabled={loading || !rateForm.buyRate || !rateForm.sellRate}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RateManagement;
