import { useState } from 'react';
import { Card, CardContent, Grid, TextField, MenuItem, Button, Box } from '@mui/material';

const TransactionFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    cryptocurrency: 'all',
    fromAddress: '',
    toAddress: ''
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="date-from"
              label="Date From"
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="date-to"
              label="Date To"
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Cryptocurrency"
              value={filters.cryptocurrency}
              onChange={(e) => handleFilterChange('cryptocurrency', e.target.value)}
            >
              <MenuItem value="all">All Cryptocurrencies</MenuItem>
              <MenuItem value="BTC">Bitcoin (BTC)</MenuItem>
              <MenuItem value="TRX">Tron (TRX)</MenuItem>
              <MenuItem value="SOL">Solana (SOL)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="From Address"
              value={filters.fromAddress}
              onChange={(e) => handleFilterChange('fromAddress', e.target.value)}
              placeholder="Enter sender address"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="To Address"
              value={filters.toAddress}
              onChange={(e) => handleFilterChange('toAddress', e.target.value)}
              placeholder="Enter recipient address"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Box display="flex" gap={1}>
              <Button variant="contained" color="primary" fullWidth>
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  setFilters({
                    dateFrom: null,
                    dateTo: null,
                    cryptocurrency: 'all',
                    fromAddress: '',
                    toAddress: ''
                  })
                }
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TransactionFilters;
