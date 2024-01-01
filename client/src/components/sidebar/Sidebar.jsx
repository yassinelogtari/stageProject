import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LogoutIcon from '@mui/icons-material/Logout';

import {Link} from "react-router-dom"
const deconnexionHandle=()=>{

    localStorage.setItem("isLogged",false);
}
const Sidebar=()=>{
    let userid = localStorage.getItem('userid');

    
    return(
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration: "none"}}>
                <span className="logo"> CIMF</span>
                </Link>
                
            </div>
            <hr />
            <div className="center">
                <ul>
                <Link to="/home" style={{textDecoration: "none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Home</span>
                    </li>
                </Link>
                <Link to={`/list/${userid}`} style={{textDecoration: "none"}}>
                    <li>
                        <FormatListBulletedIcon className="icon"/>
                        <span>List</span>
                    </li>
                </Link>
                <Link to="/files" style={{textDecoration: "none"}}>
                    <li>
                        <FilePresentIcon className="icon"/>
                        <span>Files</span>
                    </li>
                </Link>
                <Link to="/profile" style={{textDecoration: "none"}}>
                    <li>
                        <AccountBoxIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                </Link>
               
                </ul>
            </div>
            <div className="bottom">
            
            <Link to="/" style={{textDecoration: "none"}} onClick={deconnexionHandle} >
            <ul>
                <li>
                    <LogoutIcon className="icon"/>
                    <span>deconnexion</span>
                </li> 
            </ul>
            </Link>
            </div>
        </div>
    )
}

export default Sidebar