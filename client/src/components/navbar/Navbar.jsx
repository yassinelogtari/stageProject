import "./navbar.scss"

import avatar from '../../images/avatar.png'

const Navbar =()=>{
    //test merge branche Devlop
    let userName = localStorage.getItem('username');
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                </div>
                <div className="admininfo">
                    {userName}
                    <img className="adminImcnprs" src={avatar}/>
                </div>

            </div>
        </div>
    )
}
export default Navbar