import { gql } from '@apollo/client';

export const MARKET_AGGREGATES = gql`
  query marketAggregates(
    $tickerSymbol: String!
    $multiplier: Int!
    $timespan: String!
    $from: String!
    $to: String!
  ) {
    marketAggregates(
      tickerSymbol: $tickerSymbol
      multiplier: $multiplier
      timespan: $timespan
      from: $from
      to: $to
    ) {
      queryCount
      results {
        c
        h
        l
        n
        o
        t
        v
        vw
      }
    }
  }
`