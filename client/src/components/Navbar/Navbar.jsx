import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = ({displayPage, setDisplayPage}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <>
            <div className={collapsed ? "navbar collapsed" : "navbar expanded"}>
                <button className="navbar-toggle-btn" onClick={toggleCollapse}></button>
                <div className="navbar-content">
                    <div 
                        className="navigation"
                        onClick={() => {setDisplayPage("dashboard")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>Main Dashboard</div>
                        <div className={displayPage === "dashboard" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                    <div 
                        className="navigation"
                        onClick={() => {setDisplayPage("table")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>Data Table</div>
                        <div className={displayPage === "table" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Navbar