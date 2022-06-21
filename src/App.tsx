import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import CustomDrawer from './shared/CustomDrawer'
import Ticker from './components/ticker/Ticker'
import TickerDetailsPage from './pages/TickerDetailsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      {/* <CustomDrawer /> */}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="ticker" />
        <Route path=":ticker" element={<TickerDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
