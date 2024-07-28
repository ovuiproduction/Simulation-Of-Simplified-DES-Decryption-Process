import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import TextDecryption from './components/TextDecryption'
export default function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path='/' element={<TextDecryption />} />
        </Routes>
    </Router>
    </>
  );
}