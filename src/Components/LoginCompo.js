import React, { createRef, useState } from 'react'
import axios from 'axios';

function LoginCompo() {
    const [IsError, setIsError] = useState({ type: false, value: "" });
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const UserEmailRef = createRef();
    const userPasswordRef = createRef();


    const clearField = () => {
        UserEmailRef.current.value = "";
        userPasswordRef.current.value = "";
        UserEmailRef.current.focus();
    }
    const hideError = (e) => {
        if (IsError) {
            setTimeout(() => {
                setIsError({ type: false, value: "" });
            }, 3000);
        }

    }
    const handleLoginClick = (e) => {
        e.preventDefault();
        if (userEmail.length <= 0) {
            UserEmailRef.current.focus();
            setIsError({ type: true, value: "Enter Your Email" });
            hideError();
        } else if (userPassword.length <= 0) {
            userPasswordRef.current.focus();
            setIsError({ type: true, value: "Enter Your Password" });
            hideError();
        } else {

            const tempLogData = {
                "email": userEmail,
                "password": userPassword
            }

            axios.post("http://localhost:5000/login", tempLogData).then((response) => {
                setIsError({ type: true, value: `${response.data.resMsg}` });
                if (response.data.TOKEN) {
                    localStorage.setItem("Token", response.data.TOKEN)
                }
                clearField();
                hideError();
            })
        }
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "email": {
                setUserEmail(e.target.value);
                break;
            }
            case "password": {
                setUserPassword(e.target.value);
                break;
            }
            default: {
                alert("Wrong Value")
            }

        }
    }
    return (
        <>
            {IsError.type ? <p className="errorMessage">{IsError.value}</p> : null}
            <form className='userForm'>
                <input type="email" name="email" placeholder='Enter Your Email' className='inputField' onChange={handleInputChange} autoComplete='current-email' ref={UserEmailRef} />

                <input type="password" name="password" placeholder='Enter Your Password' className='inputField' onChange={handleInputChange} autoComplete='current-password' ref={userPasswordRef} />
                
                <button className='formButton' onClick={handleLoginClick}>Sign In</button>
            </form>
        </>
    )
}

export default LoginCompo
