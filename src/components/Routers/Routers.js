import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from '../Navigators/Navbar';
import Main from './../Main/Main';

export default function Routers() {
    console.log('Router');
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
        </Router>
    )
}
