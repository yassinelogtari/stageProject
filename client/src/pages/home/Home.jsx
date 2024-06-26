import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import Chart from "../../components/chart/Chart"


import './home.scss'
const Home =()=>{
    return(
        <div className='home'>
           <Sidebar/>
           <div className="homeContainer">
                <Navbar/>
                <div className="widgets">
                <Widget type="user"/>
                <Widget type="fichier"/>
                <Widget type="fichierR"/>
                <Widget type="user"/>
                </div>
                <Chart/>
            </div>
        </div>
    )
}

export default Home