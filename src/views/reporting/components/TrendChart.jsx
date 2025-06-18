import { Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendChart = ({ timeRange, dateRange }) => {
  // Mock data - replace with API call
  const data = [
    { name: 'Jan', tradeVolume: 65, userGrowth: 28 },
    { name: 'Feb', tradeVolume: 59, userGrowth: 48 },
    { name: 'Mar', tradeVolume: 80, userGrowth: 40 },
    { name: 'Apr', tradeVolume: 81, userGrowth: 19 },
    { name: 'May', tradeVolume: 56, userGrowth: 86 },
    { name: 'Jun', tradeVolume: 55, userGrowth: 27 }
  ];

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tradeVolume" stroke="#8884d8" activeDot={{ r: 8 }} name="Trade Volume" />
          <Line type="monotone" dataKey="userGrowth" stroke="#82ca9d" name="User Growth" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrendChart;
