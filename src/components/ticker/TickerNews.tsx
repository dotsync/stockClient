import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { gql, useQuery } from '@apollo/client'
import { Article } from '../../graphql/types/Article'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

const TICKER_PROFILE = gql`
  query tickerNews($tickerSymbol: String!) {
    tickerNews(tickerSymbol: $tickerSymbol) {
      count
      results {
        title
        amp_url
        article_url
        author
        description
        id
        image_url
        keywords
        published_utc
        publisher {
          favicon_url
          homepage_url
          logo_url
          name
        }
        tickers
      }
    }
  }
`

export default function TickerNews() {
  const { loading, error, data } = useQuery(TICKER_PROFILE, {
    variables: { tickerSymbol: 'AAPL' },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <React.Fragment>
      <Title>News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.tickerNews.results.map((row: Article, idx: number) => {
            return (
            <TableRow key={idx}>
              <TableCell>{row.published_utc}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.publisher.name}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  )
}
