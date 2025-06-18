import { useState } from 'react';
import { Card, CardContent, Grid, TextField, MenuItem, Button, Box } from '@mui/material';

const TransactionFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    type: 'all',
    status: 'all'
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="date-from"
              label="Date From"
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="date-to"
              label="Date To"
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Transaction Type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="crypto">Crypto</MenuItem>
              <MenuItem value="giftcard">Gift Card</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="flagged">Flagged</MenuItem>
            </TextField>
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
                    type: 'all',
                    status: 'all'
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
