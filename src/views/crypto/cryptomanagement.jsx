import { Box, Grid } from "@mui/material";
import { gridSpacing } from "../../store/constant";

import WalletBalances from "./components/WalletBalances";
import RateManagement from "./components/RateManagement";
import FeeManagement from "./components/FeeManagement";

const CryptoManagement = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Grid container spacing={gridSpacing}>
        <Grid item size={12}>
          <WalletBalances />
        </Grid>

        <Grid item size={12} md={6}>
          <FeeManagement />
        </Grid>

        <Grid item size={12} md={6}>
          <RateManagement />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CryptoManagement;
