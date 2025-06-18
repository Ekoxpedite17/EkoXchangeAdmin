import { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Chip, TextField, Box } from '@mui/material';

const TicketList = ({ onSelectTicket, selectedTicket }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call
  const tickets = [
    {
      id: '1',
      title: 'Failed Transaction',
      status: 'Unassigned',
      priority: 'High',
      timestamp: '2024-01-20 10:30'
    }
    // Add more mock tickets
  ];

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {tickets.map((ticket) => (
          <ListItem
            key={ticket.id}
            button
            selected={selectedTicket?.id === ticket.id}
            onClick={() => onSelectTicket(ticket)}
            sx={{
              borderLeft: ticket.status === 'Unassigned' ? '4px solid #f44336' : 'none',
              mb: 1,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <ListItemText primary={ticket.title} secondary={`Created: ${ticket.timestamp}`} />
            <ListItemSecondaryAction>
              <Chip label={ticket.priority} color={ticket.priority === 'High' ? 'error' : 'default'} size="small" />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TicketList;
