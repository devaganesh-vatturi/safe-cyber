 import "./styles/Login.css";
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
import Header from "./Header";
// import doctorpic from "../assets/logindoctor.jpg";
// import startuppic from "../assets/loginstartup.jpg";
// import farmerpic from "../assets/loginfarmer.jpg";
// import drugpic from "../assets/logindrug.jpg";
// import authorpic from "../assets/loginauthority.jpg";

// import LoadingPage from "../components/Separate Comps/LoadingPage";


import React,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function Login(){
   const [user, setUser] = useState({
        
       email : "heyy",
       password : "",
         
   });

   const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
 const goregister = ()=>{
    window.location.href=`/register`;
 }

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log("submit handle");
      if(user.password.length<6) 
      {
          alert('password must contain 6 letters');
       }
      try{
        window.location.href = `/?email=${encodeURIComponent(user.email)}`;
          // let response=axios.post('http://localhost:5555/login',user);
          //         console.log(res.data.message);
          //       if(response.data.success)
          //       {
          //         alert("Successfully Logined")
          //         window.location.href = `/email?email=${encodeURIComponent(user.email)}`;
          //       }
                  
                
  
                  
                 
              }
      catch(error){
          console.log('Error sending registration request',error);
      }
     
  };    

    return(
        <>

         <Header />
        <div class="div1-login"> 
        <form class='form-login' onSubmit={submitHandler} >
          <label class="label-login1">login form</label><br></br>
          <label class="label-login">Email ID:</label>
          <input class="input-login" value={user.email} onChange={changeHandler} name='email' type="tel"></input><br></br>
          <label class="label-login">Password:</label>
          <input class="input-login" value={user.password} onChange={changeHandler} name='password' type="password"></input><br></br>
          <button class="btn-login" type="submit">Submit</button>
        <p onClick={goregister}>Click here to register</p>
        </form>        
        </div>
        </>
    )
}
export default Login;
 
