import * as React from 'react'
import { useTheme } from '@mui/material/styles'

import { useParams } from 'react-router-dom';
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
} from 'recharts'
import TickerChartTitle from './TickerChartTitle'
import { useQuery } from '@apollo/client'
import { MARKET_AGGREGATES } from '../../graphql/marketQueries'
import { getTimeStampFromUnix } from '../../util/getTimeStampFromUnix';
import { createData } from '../../util/generateData';
import { findDomain } from '../../util/findDomain';

export default function TickerChart() {
  const { ticker } = useParams();
  const theme = useTheme()

  const { loading, error, data } = useQuery(MARKET_AGGREGATES, {
    variables: {
      tickerSymbol: ticker?.split(":")[1],
      multiplier: 1,
      timespan: 'hour',
      from: '2022-05-20',
      to: '2022-06-20',
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const dataSet = []
  const stockAggregates = data.marketAggregates.results

  for (let i = 0; i < stockAggregates.length; i++) {
    const aggregateWindow = stockAggregates[i]
    // c - The close price for the symbol in the given time period.
    const closePrice = aggregateWindow.c
    const entry = createData(
      getTimeStampFromUnix(aggregateWindow.t).date.dayAndMonth,
      closePrice,
    )
    dataSet.push(entry)
  }

  return data ? (
    <React.Fragment>
      <TickerChartTitle>{ticker?.split(":")[1]}</TickerChartTitle>
      <ResponsiveContainer >
      <AreaChart
          data={dataSet}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="time">
            {/* <Label value={ticker?.split(":")[1]} position="bottom" /> */}
          </XAxis>
          <YAxis dataKey="c" type="number" domain={findDomain(stockAggregates)} >
            {/* <Label
              value={ticker?.split(":")[1]}
              angle={-90}
              position="left"
              dy="-10"
            /> */}
          </YAxis>
          {/* <Tooltip content={<CustomTooltip payload={tempData} />} /> */}
          <Area
            type="monotone"
            dataKey="c"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  ) : (
    <div>loading</div>
  )
}
