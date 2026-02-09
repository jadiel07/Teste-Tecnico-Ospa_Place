import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'  
import SchoolDetails from './pages/SchoolDetails'
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schools" element={<Home />} />
        <Route path="/school/:id" element={<SchoolDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
