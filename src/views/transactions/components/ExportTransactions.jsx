import { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportConfig } from '../data/mockData';

const ExportTransactions = ({ transactions }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      // Convert transactions to CSV format based on exportConfig
      const headers = exportConfig.fields.map((field) => field.label).join(',');
      const rows = transactions.map((transaction) =>
        exportConfig.fields
          .map((field) => {
            const value = field.value.split('.').reduce((obj, key) => obj[key], transaction);
            return `"${value}"`; // Wrap in quotes to handle commas in values
          })
          .join(',')
      );

      const csv = [headers, ...rows].join('\n');

      // Create and download file
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportConfig.fileName}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        startIcon={exporting ? <CircularProgress size={20} /> : <FileDownloadIcon />}
        onClick={handleExport}
        disabled={exporting || !transactions.length}
      >
        {exporting ? 'Exporting...' : 'Export to CSV'}
      </Button>
    </Box>
  );
};

export default ExportTransactions;
