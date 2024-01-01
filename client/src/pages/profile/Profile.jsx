import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import {useNavigate} from "react-router-dom";


import "./profile.scss"



export default function Profile() {


  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');


    let userName = localStorage.getItem('username');
    let firstName = localStorage.getItem('userfirstname');
    let lastName = localStorage.getItem('userlastname');
    let Email = localStorage.getItem('useremail');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userid'); // Provide the actual user ID here

   
    try {
      const response = await axios.patch(`/api/user/${userId}`, {
        username,
        firstname,
        lastname,
        email,
      });
      navigate('/list/'+{userId})
      console.log('User updated successfully');

    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };
  
  return (
    <div className='new'>
           <Sidebar/>
           <div className='newContainer'>
            <Navbar/>
            <div className="newtop">
                <h1>Update user</h1>
            </div>
            <div className="newbottom">
                <div className="left">
                    <img src="https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/camera.png"/>
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit}>
                    <div className="formInput">
                            <label >username</label>
                            <input type="text"  placeholder={userName} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    <div className="formInput">
                            <label htmlFor="">Firstname</label>
                            <input type="text"  placeholder={firstName} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="formInput">
                            <label htmlFor="">lastname</label>
                            <input type="text" placeholder={lastName} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="formInput">
                            <label >Email</label>
                            <input type="text" placeholder={Email} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <button type="submit">Update</button>
                        
                    </form>
                
           </div>
           </div>
           </div>
    </div>
  )
}
