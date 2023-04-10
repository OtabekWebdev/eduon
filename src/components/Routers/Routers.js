import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from '../Navigators/Navbar';
import Main from './../Main/Main';
import CoursesBasket from '../Courses/CoursesBasket/CoursesBasket';
import CoursesMain from './../Courses/CoursMain/CoursesMain';
import Login from '../Author/Login';
import Register from './../Author/Register';

export default function Routers() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/chosenCourse/:id' element={< CoursesMain />} />
                <Route path='/mybasket' element={<CoursesBasket />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}
