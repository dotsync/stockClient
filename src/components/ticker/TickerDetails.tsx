import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TickerChartTitle from './TickerChartTitle';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function TickerDetails() {
  return (
    <React.Fragment>
      <TickerChartTitle>Recent Deposits</TickerChartTitle>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
