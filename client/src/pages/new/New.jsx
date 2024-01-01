import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./new.scss"



export default function New() {
  let userid = localStorage.getItem('userid');
  const navigate = useNavigate()
        const [formData, setFormData] = useState({
          firstname: "",
          lastname: "",
          id_ident: "",
          email: "",
          cnprs: "",
        });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
            try {
             
              const userId = userid;

              await axios.post(`/api/user/${userId}/employe`, formData);
              
              navigate("/list/"+userid)
            
            } catch (error) {
              console.error(error);
              
            }
          };
    
    
  return (
    <div className='new'>
           <Sidebar/>
           <div className='newContainer'>
            <Navbar/>
            <div className="newtop">
                <h1>Add new Employe</h1>
            </div>
            <div className="newbottom">
                <div className="left">
                    <img src="https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/camera.png"/>
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit}>
                    <div className="formInput">
                            <label htmlFor="">Firstname</label>
                            <input type="text" id="firstname" name="firstname"  onChange={handleChange} />
                        </div>
                        <div className="formInput">
                            <label htmlFor="">lastname</label>
                            <input type="text" id="lastname" name="lastname"  onChange={handleChange} />
                        </div>
                        <div className="formInput">
                            <label >Email</label>
                            <input type="email" id="email" name="email" onChange={handleChange} />
                        </div>
                        <div className="formInput">
                            <label >Cnprs</label>
                            <input type="text" id="cnprs" name="cnprs"  onChange={handleChange} />
                        </div>
                        <div className="formInput" id="id_ident">
                            <label >id_ident</label>
                            <input type="text" id="id_ident" name="id_ident"  onChange={handleChange} />
                        </div>
                        <div className="formInput" id="id_ident">
                            <label >Phone</label>
                            <input type="text" />
                        </div>
                        <button type="submit">Create</button>
                        
                    </form>
                
           </div>
           </div>
           </div>
    </div>
  )
}
