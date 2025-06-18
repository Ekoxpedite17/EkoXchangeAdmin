import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { mockProviders } from '../data/mockData';

const ProviderManagement = () => {
  const [providers, setProviders] = useState(mockProviders);
  const [addDialog, setAddDialog] = useState(false);
  const [newProvider, setNewProvider] = useState({ name: '', apiKey: '', active: true });

  const handleAdd = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/giftcard/providers', {
        method: 'POST',
        body: JSON.stringify(newProvider)
      });
      const data = await response.json();

      setProviders([...providers, data]);
      setAddDialog(false);
      setNewProvider({ name: '', apiKey: '', active: true });
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  const handleDelete = async (providerId) => {
    try {
      // Replace with actual API call
      await fetch(`/api/giftcard/providers/${providerId}`, {
        method: 'DELETE'
      });

      setProviders(providers.filter((p) => p.id !== providerId));
    } catch (error) {
      console.error('Error deleting provider:', error);
    }
  };

  const handleToggleActive = async (provider) => {
    try {
      // Replace with actual API call
      await fetch(`/api/giftcard/providers/${provider.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !provider.active })
      });

      setProviders(providers.map((p) => (p.id === provider.id ? { ...p, active: !p.active } : p)));
    } catch (error) {
      console.error('Error updating provider:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className='titlerow'>
          <Typography variant="h3" gutterBottom>
            Gift Card Providers
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ mb: 2 }}>
            Add Provider
          </Button>
        </div>

        <List>
          {providers.map((provider) => (
            <ListItem key={provider.id}>
              <ListItemText primary={provider.name} secondary={`API Status: ${provider.active ? 'Active' : 'Inactive'}`} />
              <ListItemSecondaryAction>
                <Switch edge="end" checked={provider.active} onChange={() => handleToggleActive(provider)} />
                <IconButton edge="end" color="error" onClick={() => handleDelete(provider.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
          <DialogTitle>Add New Provider</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Provider Name"
              value={newProvider.name}
              onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="API Key"
              value={newProvider.apiKey}
              onChange={(e) => setNewProvider({ ...newProvider, apiKey: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAdd} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProviderManagement;
