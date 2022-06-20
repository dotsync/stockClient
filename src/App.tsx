import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import CustomDrawer from './components/shared/CustomDrawer'

function App() {
  console.log('sdgsfdhg')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="ticker" />
        <Route path=":ticker" element={<CustomDrawer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
