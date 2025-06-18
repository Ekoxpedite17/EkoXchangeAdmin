import { Grid } from '@mui/material';
import { gridSpacing } from '../../store/constant';

import GiftCardCategories from './components/GiftCardCategories';
import RedemptionStats from './components/RedemptionStats';
import ProviderManagement from './components/ProviderManagement';
import ValidationOverride from './components/ValidationOverride';

const GiftCardManagement = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item size={6}>
        <RedemptionStats />
      </Grid>
      <Grid item size={6}>
        <ValidationOverride />
      </Grid>
      <Grid item size={12} md={8}>
        <GiftCardCategories />
      </Grid>
      <Grid item size={12}>
        <ProviderManagement />
      </Grid>
    </Grid>
  );
};

export default GiftCardManagement;
