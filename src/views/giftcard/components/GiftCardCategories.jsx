import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { mockCategories } from '../data/mockData';

const GiftCardCategories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [editDialog, setEditDialog] = useState({ open: false, category: null });

  const handleEdit = (category) => {
    setEditDialog({ open: true, category: { ...category } });
  };

  const handleSave = async () => {
    try {
      // Replace with actual API call
      await fetch(`/api/giftcard/categories/${editDialog.category.id}`, {
        method: 'PUT',
        body: JSON.stringify(editDialog.category)
      });

      // Update local state
      setCategories(categories.map((cat) => (cat.id === editDialog.category.id ? editDialog.category : cat)));

      setEditDialog({ open: false, category: null });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Gift Card Categories
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Rate (USD)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.provider}</TableCell>
                  <TableCell>${category.rate}</TableCell>
                  <TableCell>{category.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(category)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, category: null })}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Rate (USD)"
              type="number"
              value={editDialog.category?.rate || ''}
              onChange={(e) =>
                setEditDialog({
                  ...editDialog,
                  category: { ...editDialog.category, rate: e.target.value }
                })
              }
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, category: null })}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GiftCardCategories;
