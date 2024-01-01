import "./widget.scss";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MinimizeIcon from '@mui/icons-material/Minimize';

const Widget = ({ type }) => {
  let data;

 
  const nbuser=localStorage.getItem('nbEmploye')
  const nbfiles=localStorage.getItem('nbFile')

  switch (type) {
    case "user":
      data = {
        title: "Users",
        nb:nbuser,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "fichier":
      data = {
        title: "Fichiers",
        nb:nbfiles,
        link: "View all Fichiers",
        icon: (
          <FileCopyIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "fichierR":
      data = {
        title: "Fichiers Remaning",
       nb:10,
        link: "View File Remaning",
        icon: (
          <MinimizeIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        nb:10,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
           {data.nb}
        </span>
       
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;