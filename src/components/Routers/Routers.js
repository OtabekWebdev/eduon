import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from '../Navigators/Navbar';
import Main from './../Main/Main';
import CoursesBasket from '../Courses/CoursesBasket/CoursesBasket';
import CoursesMain from './../Courses/CoursMain/CoursesMain';
import Login from '../User/Author/Login';
import Register from '../User/Author/Register';
import Profile from '../User/Profile/Profile';
import NotFound from './NotFound';

export default function Routers() {
    return (
        <Router>
            <Navbar />
            <div className="container max-w-[1850px] mx-auto">
                <Routes>
                    <Route path='/' exact element={<Main />} />
                    <Route path='/chosenCourse/:id' exact element={<CoursesMain />} />
                    <Route path='/mybasket' exact element={<CoursesBasket />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/register' exact element={<Register />} />
                    <Route path='/profile' exact element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

