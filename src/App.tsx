import { gql, useQuery } from '@apollo/client'
import React from 'react'
import './App.css'
import TickerProfilePage from './pages/TickerProfilePage'
import { Routes, Route, useParams, BrowserRouter } from 'react-router-dom'
import Chart from './components/dashboard/Chart'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/details" element={<TickerProfilePage />}/>
        <Route path=":ticker" element={<Dashboard />} /> */}
        <Route path="ticker" />
        <Route path=":ticker" element={<TickerProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
