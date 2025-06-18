import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const UserSearchFilter = ({
  searchTerm,
  filterOptions,
  showFilters,
  handleSearchChange,
  handleFilterChange,
  toggleFilters,
  resetFilters
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="search-user">Search Users</InputLabel>
              <OutlinedInput
                id="search-user"
                value={searchTerm}
                onChange={handleSearchChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Search Users"
                placeholder="Email, username..."
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleFilters}
                sx={{ mr: 1 }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              {showFilters && (
                <Button variant="outlined" color="secondary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              )}
            </Box>
          </Grid>
          
          {showFilters && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="kyc-status-label">KYC Status</InputLabel>
                  <Select
                    labelId="kyc-status-label"
                    id="kyc-status"
                    name="kycStatus"
                    value={filterOptions.kycStatus}
                    onChange={handleFilterChange}
                    label="KYC Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Not Submitted">Not Submitted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="account-status-label">Account Status</InputLabel>
                  <Select
                    labelId="account-status-label"
                    id="account-status"
                    name="accountStatus"
                    value={filterOptions.accountStatus}
                    onChange={handleFilterChange}
                    label="Account Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                    <MenuItem value="Locked">Locked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  id="date-from"
                  label="Date From"
                  type="date"
                  name="dateFrom"
                  value={filterOptions.dateFrom}
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
                  value={filterOptions.dateTo}
                  onChange={handleFilterChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserSearchFilter;