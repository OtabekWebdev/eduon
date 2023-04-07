import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from '../Navigators/Navbar';
import Main from './../Main/Main';
import CoursesBasket from '../Courses/CoursesBasket/CoursesBasket';

export default function Routers() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
            <Routes>
                <Route path='/mybasket' element={<CoursesBasket />} />
            </Routes>
        </Router>
    )
}
