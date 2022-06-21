import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import TickerChartTitle from './TickerChartTitle'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MARKET_AGGREGATES } from '../../graphql/marketQueries'
import { getTimeStampFromUnix } from '../../util/getTimeStampFromUnix'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function TickerDetails() {
  const { ticker } = useParams()

  const { loading, error, data } = useQuery(MARKET_AGGREGATES, {
    variables: {
      tickerSymbol: ticker?.split(':')[1],
      multiplier: 1,
      timespan: 'day',
      from: '2021-06-15',
      to: '2022-06-15',
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const mostCurrentAggregate =
    data.marketAggregates.results[data.marketAggregates.results.length - 1]

  return (
    <React.Fragment>
      <TickerChartTitle>Ticker Chart Details</TickerChartTitle>
      <Typography component="p" variant="h4">
        ${mostCurrentAggregate.c}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {getTimeStampFromUnix(mostCurrentAggregate.t).date.localeString}
      </Typography>
      <ul>
        <li>high: {mostCurrentAggregate.h}</li>
        <li>low: {mostCurrentAggregate.l}</li>
        <li>transactions: {mostCurrentAggregate.n}</li>
        <li>open price: {mostCurrentAggregate.o}</li>
        <li>close price: {mostCurrentAggregate.c}</li>
        <li>trading volume: {mostCurrentAggregate.v}</li>
        <li>volume weighted average price: {mostCurrentAggregate.vw}</li>
      </ul>
      <div>
        <Link color="primary" href="/#analysis">
          View analysis
        </Link>
      </div>
    </React.Fragment>
  )
}
