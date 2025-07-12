import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  TextField,
  Box,
} from "@mui/material";

const TicketList = ({ onSelectTicket, selectedTicket, tickets }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

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
        {tickets &&
          tickets?.map((ticket) => (
            <ListItem
              key={ticket._id}
              button
              selected={selectedTicket?._id === ticket._id}
              onClick={() => onSelectTicket(ticket)}
              sx={{
                borderLeft:
                  ticket.status === "pending" ? "4px solid #f44336" : "none",
                mb: 1,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemText
                primary={ticket.reason}
                secondary={`Created: ${formatDate(ticket.createdAt)}`}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={ticket.status}
                  color={ticket.status === "pending" ? "error" : "success"}
                  size="small"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default TicketList;
