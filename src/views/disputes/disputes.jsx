import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import TicketList from './components/TicketList';
import ConversationLog from './components/ConversationLog';
import TransactionDetails from './components/TransactionDetails';

const DisputesSupport = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [assignDialog, setAssignDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');

  const handleAssignTicket = () => {
    // API call to assign ticket
    setAssignDialog(false);
  };

  const handleTagOutcome = async (ticketId, outcome) => {
    // API call to update ticket outcome
    // If outcome is 'refunded', trigger transaction reversal
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container width={'100%'} spacing={2}>
        {/* Tickets List */}
        <Grid item size={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Support Tickets
              </Typography>
              <TicketList onSelectTicket={setSelectedTicket} selectedTicket={selectedTicket} />
            </CardContent>
          </Card>
        </Grid>

        {/* Ticket Details */}
        <Grid item width={'40%'} xs={12} sm={12} md={8} lg={8}>
          {selectedTicket ? (
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    gap={2}
                    mb={2}
                  >
                    <Typography variant="h4">Ticket #{selectedTicket.id}</Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip label={selectedTicket.status} color={selectedTicket.status === 'Unassigned' ? 'error' : 'default'} />
                      <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setAssignDialog(true)}>
                        Assign Ticket
                      </Button>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TransactionDetails transaction={selectedTicket.transaction} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Conversation Log
                  </Typography>
                  <ConversationLog ticketId={selectedTicket.id} />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Outcome Actions
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      '& > button': {
                        width: { xs: '100%', sm: 'auto' }
                      }
                    }}
                  >
                    <Button variant="contained" color="success" onClick={() => handleTagOutcome(selectedTicket.id, 'resolved')}>
                      Mark Resolved
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => handleTagOutcome(selectedTicket.id, 'escalated')}>
                      Escalate
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleTagOutcome(selectedTicket.id, 'refunded')}>
                      Issue Refund
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">
                  Select a ticket to view details
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Assign Ticket Dialog */}
      <Dialog
        open={assignDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: '600px'
          }
        }}
        onClose={() => setAssignDialog(false)}
      >
        <DialogTitle>Assign Ticket</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Select Agent"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            margin="normal"
          >
            <MenuItem value="agent1">John Doe</MenuItem>
            <MenuItem value="agent2">Jane Smith</MenuItem>
            <MenuItem value="agent3">Mike Johnson</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialog(false)}>Cancel</Button>
          <Button onClick={handleAssignTicket} variant="contained" color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisputesSupport;
