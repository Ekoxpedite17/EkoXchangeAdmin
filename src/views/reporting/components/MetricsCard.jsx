import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MetricsCard = ({ title, value, trend, isPositive }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {isPositive ? (
            <TrendingUpIcon color="success" fontSize="small" />
          ) : (
            <TrendingDownIcon color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
            ml={0.5}
          >
            {trend}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;