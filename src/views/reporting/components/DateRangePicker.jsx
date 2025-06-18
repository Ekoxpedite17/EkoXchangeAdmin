import { Stack, TextField, Card, CardContent } from '@mui/material';

const DateRangePicker = ({ value, onChange }) => {
  const handleDateChange = (type) => (event) => {
    const newValue = event.target.value;
    if (type === 'start') {
      onChange([newValue, value[1]]);
    } else {
      onChange([value[0], newValue]);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            id="date-start"
            label="Start Date"
            type="date"
            name="dateStart"
            value={value[0] || ''}
            onChange={handleDateChange('start')}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            fullWidth
            id="date-end"
            label="End Date"
            type="date"
            name="dateEnd"
            value={value[1] || ''}
            onChange={handleDateChange('end')}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DateRangePicker;
