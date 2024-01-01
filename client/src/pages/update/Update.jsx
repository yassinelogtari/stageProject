import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {useNavigate} from "react-router-dom";
import "../new/new.scss"
import {useLocation} from "react-router-dom";



export default function New() {
  
  const location=useLocation()
  const path=location.pathname.split("/")[1]
  const employeId=location.pathname.split("/")[2]
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [idIdent, setIdIdent] = useState("");
  const [email, setEmail] = useState("");


  let userId = localStorage.getItem('userid');
  let Email = localStorage.getItem('email');
  let lastName = localStorage.getItem('lastname');
  let firstName = localStorage.getItem('firstname');
  let id_ident = localStorage.getItem('id_ident');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
    
      const response = await axios.patch(`/api/${path}/${employeId}`, {
        firstname,
        lastname,
        id_ident: idIdent,
        email,
      });
      console.log(response)
      
      navigate("/list/"+userId)
      setFirstname("");
      setLastname("");
      setIdIdent("");
      setEmail("");
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  }
  
  return (
    <div className='new'>
      <Sidebar/>
      <div className='newContainer'>
        <Navbar/>
        <div className="newtop">
          <h1>Update Employee</h1>
        </div>
        <div className="newbottom">
          <div className="left">
            <img src="https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/camera.png"/>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="firstname">Firstname</label>
                <input type="text"  placeholder={lastName} id="firstname" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div className="formInput">
                <label htmlFor="lastname">Lastname</label>
                <input type="text"  placeholder={firstName} id="lastname" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder={Email} id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label htmlFor="id_ident">id_ident</label>
                <input type="text"  placeholder={id_ident} id="id_ident" name="id_ident" value={idIdent} onChange={(e) => setIdIdent(e.target.value)} />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
