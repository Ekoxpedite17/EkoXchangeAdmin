import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Stack,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatUI = ({ ticketId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketId) {
      fetchMessages();
    }
  }, [ticketId]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await EkoServices_Disputes.getTicketMessages(ticketId);
      if (response) {
        setMessages(response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Replace with your actual API call
      const response = await EkoServices_Disputes.sendTicketMessage({
        ticketId,
        message: newMessage,
      });

      if (response) {
        setMessages([...messages, response]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>
        
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: '400px',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: message.isAdmin ? 'row-reverse' : 'row',
                gap: 1,
                alignItems: 'flex-start',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.isAdmin ? 'primary.main' : 'secondary.main',
                }}
              >
                {message.isAdmin ? 'A' : 'U'}
              </Avatar>
              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: message.isAdmin ? 'primary.light' : 'grey.100',
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(message.timestamp)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChatUI;