import { useState, useEffect } from 'react'
import DoubleSlider from '../DoubleSlider/DoubleSlider.jsx'
import './Navbar.css'

const Navbar = ({displayPage, setDisplayPage, fullYearRange, yearFilterRange, setYearFilterRange}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    const handleYearChange = (vals) => {
        setYearFilterRange([vals[0],vals[1]]);
        console.log(`lower: ${vals[0]}, higher: ${vals[1]}`);
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
                    <div className="nav-filter-container">
                        <div className="year-filter-container">
                            <div>Year range: (inclusive)</div>
                            <DoubleSlider 
                                minValue={fullYearRange[0]} 
                                maxValue={fullYearRange[1]} 
                                value={yearFilterRange}
                                onChange={setYearFilterRange}
                            >
                            </DoubleSlider>
                            <p>{yearFilterRange[0]}</p>
                            <p>{yearFilterRange[1]}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Navbar