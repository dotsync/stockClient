import * as React from 'react'
import { useTheme } from '@mui/material/styles'

import { Routes, Route, useParams } from 'react-router-dom';
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
} from 'recharts'
import Title from './Title'
import { useQuery } from '@apollo/client'
import { MARKET_AGGREGATES } from '../../graphql/marketQueries'
import { getTimeStampFromUnix } from '../../util/getTimeStampFromUnix';
import { createData } from '../../util/generateData';

export default function Chart() {
  const { ticker } = useParams();
  const { multiplier } = useParams();
  const theme = useTheme()

  const { loading, error, data } = useQuery(MARKET_AGGREGATES, {
    variables: {
      tickerSymbol: ticker?.split(":")[1],
      multiplier: 1,
      timespan: 'minute',
      from: '2020-06-21',
      to: '2022-06-16',
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const findDomain = (marketAggregates: any) => {
    let min = Infinity, max = -Infinity
    for(let i = 0; i < marketAggregates.length; i ++) {
      const aggregateWindow = marketAggregates[i]
      const measurement = aggregateWindow.c
      if (measurement < min) min = measurement
      if (measurement > max) max = measurement
    }
    if (min > Infinity || max < -Infinity) {
      return [0, 1000]
    } else {
      return [min, max]
    }
  }

  const dataSet = []
  const stockAggregates = data.marketAggregates.results

  for (let i = 0; i < stockAggregates.length; i++) {
    const aggregateWindow = stockAggregates[i]
    // c - The close price for the symbol in the given time period.
    const closePrice = aggregateWindow.c
    const entry = createData(
      getTimeStampFromUnix(aggregateWindow.t).date.monthAndYear,
      closePrice,
    )
    dataSet.push(entry)
  }

  return data ? (
    <React.Fragment>
      <Title>Today</Title>
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
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="time">
            <Label value="Date" position="bottom" />
          </XAxis>
          <YAxis dataKey="c" type="number" domain={findDomain(stockAggregates)} >
            <Label
              value="APPL"
              angle={-90}
              position="left"
              dy="-10"
            />
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
