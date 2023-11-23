import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginCompo from '../Components/LoginCompo'
import RegisterCompo from '../Components/RegisterCompo'
import HomeCompo from '../Components/HomeCompo'

function AppRouter() {
    return (
        <Routes>

            <Route path='/' element={<HomeCompo />}>
                <Route path='/login'  element={<LoginCompo />} />
                <Route path='/register' element={<RegisterCompo />} />
            </Route>


        </Routes>
    )
}

export default AppRouter
