import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { gridSpacing } from "../../store/constant";
import { EkoServices_Crypty } from "../../services";

import WalletBalances from "./components/WalletBalances";
import RateManagement from "./components/RateManagement";
import FeeManagement from "./components/FeeManagement";

const CryptoManagement = () => {
  const [networkList, setNetworkList] = useState([]);
  const [tokenList, setTokenList] = useState([]);

  const fetchNetworkList = async () => {
    const data = await EkoServices_Crypty.getNetworkList(0, 30);
    setNetworkList(data);
  };

  const fetchTokenList = async () => {
    const data = await EkoServices_Crypty.getTokenList(0, 30);
    setTokenList(data);
  };

  useEffect(() => {
    fetchNetworkList();
    fetchTokenList();
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Grid container spacing={gridSpacing}>
        <Grid item size={12}>
          <WalletBalances />
        </Grid>

        <Grid item size={12} md={6}>
          <FeeManagement networks={networkList} />
        </Grid>

        <Grid item size={12} md={6}>
          <RateManagement tokens={tokenList} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CryptoManagement;
