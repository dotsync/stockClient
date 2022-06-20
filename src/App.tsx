import { gql, useQuery } from '@apollo/client'
import React from 'react'
import './App.css'
import TickerDetailsPage from './pages/TickerDetailsPage'
import { Routes, Route, useParams, BrowserRouter } from 'react-router-dom'
import TickerChart from './components/ticker/TickerChart'
import Drawer from './components/shared/Drawer'
// import Ticker from './components/ticker/Ticker'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/details" element={<TickerProfilePage />}/>
        <Route path=":ticker" element={<Dashboard />} /> */}
        <Route path="ticker" />
        <Route path=":ticker" element={<Drawer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
