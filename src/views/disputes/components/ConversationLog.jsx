import { Box, Typography, Paper, Avatar, Grid, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ConversationLog = ({ ticketId }) => {
  // Mock data - replace with API call
  const messages = [
    {
      id: 1,
      sender: 'User',
      message: "I haven't received my funds yet",
      timestamp: '2024-01-20 10:30',
      attachments: ['receipt.pdf']
    }
    // Add more mock messages
  ];

  return (
    <Box>
      {messages.map((message) => (
        <Paper
          key={message.id}
          sx={{
            p: 2,
            mb: 2,
            bgcolor: message.sender === 'Support' ? 'primary.light' : 'background.paper'
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Avatar>{message.sender[0]}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">{message.sender}</Typography>
              <Typography variant="body1">{message.message}</Typography>
              <Typography variant="caption" color="textSecondary">
                {message.timestamp}
              </Typography>
              {message.attachments?.map((attachment) => (
                <Box key={attachment} sx={{ mt: 1 }}>
                  <IconButton size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{attachment}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default ConversationLog;
