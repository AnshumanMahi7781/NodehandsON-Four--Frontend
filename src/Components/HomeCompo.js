import React from 'react'
import { NavLink, Outlet, useLocation} from "react-router-dom"

function HomeCompo() {
    const pathName = useLocation().pathname;
console.log(pathName)
    return (
        <div className="formsContainer">
            <div className="formsContainer--heading">
               {
                pathName=== "/register" ?  <h1 className='heading--items'>Create New Account</h1> :  <h1 className='heading--items'>Log In Your Account</h1>
               }
                <NavLink to="/login" className="heading--links">Log In</NavLink>
                <NavLink to="/register" className="heading--links">Register</NavLink>
            </div>
            {pathName === "/" ? <h1>WelCome User</h1> : <Outlet/>}

        </div>
    )
}

export default HomeCompo
