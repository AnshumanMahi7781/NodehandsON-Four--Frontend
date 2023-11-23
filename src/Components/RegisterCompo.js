import React, { useState, createRef } from 'react'
import axios from "axios"

function RegisterCompo() {
  const [IsError, setIsError] = useState({ type: false, value: "" });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, SetuserName] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const UserEmailRef = createRef();
  const userPasswordRef = createRef();
  const UserNameRef = createRef();
  const UserPhoneRef = createRef();



  const hideError = (e) => {
    if (IsError) {
      setTimeout(() => {
        setIsError({ type: false, value: "" });
      }, 3000);
    }

  }

  const clearField = () => {
    UserEmailRef.current.value = "";
    userPasswordRef.current.value = "";
    UserNameRef.current.value = "";
    UserPhoneRef.current.value = "";
    UserNameRef.current.focus();
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (userName.length <= 0) {
      UserNameRef.current.focus();
      setIsError({ type: true, value: "Enter Your Name" });
      hideError();
    } else if (userPhone.length <= 0) {
      UserPhoneRef.current.focus();
      setIsError({ type: true, value: "Enter Your Phone Number" });
      hideError();
    } else if (userEmail.length <= 0) {
      UserEmailRef.current.focus();
      setIsError({ type: true, value: "Enter Your Email" });
      hideError();
    }
    else if (userPassword.length <= 0) {
      userPasswordRef.current.focus();
      setIsError({ type: true, value: "Enter Your Password" });
      hideError();
    } else {
      const tempRegisterData = {
        "name": userName,
        "phone": userPhone,
        "email": userEmail,
        "password": userPassword
      }

      axios.post("http://localhost:5000/register", tempRegisterData).then((response) => {
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
      case "name": {
        SetuserName(e.target.value);
        break;
      }
      case "phone": {
        setuserPhone(e.target.value);
        break;
      }
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
        <input type="text" name="name" placeholder='Enter Your name' className='inputField' onChange={handleInputChange} autoComplete='current-email' ref={UserNameRef} />

        <input type="number" name="phone" placeholder='Enter Your Phone Number' className='inputField' onChange={handleInputChange} autoComplete='current-email' ref={UserPhoneRef} />

        <input type="email" name="email" placeholder='Enter Your Email' className='inputField' onChange={handleInputChange} autoComplete='current-email' ref={UserEmailRef} />

        <input type="password" name="password" placeholder='Enter Your Password' className='inputField' onChange={handleInputChange} autoComplete='current-password' ref={userPasswordRef} />

        <button className='formButton' onClick={handleLoginClick}>Sign Up</button>
      </form>
    </>
  )
}

export default RegisterCompo
