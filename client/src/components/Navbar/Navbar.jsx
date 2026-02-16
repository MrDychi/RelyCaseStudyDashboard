import { useState, useEffect } from 'react';
import DoubleSlider from '../DoubleSlider/DoubleSlider.jsx';
import menuIcon from '../../assets/menu.png';
import dashboardIcon from '../../assets/dashboard.png';
import tableIcon from '../../assets/table.png';
import './Navbar.css'

const Navbar = ({displayPage, setDisplayPage, fullYearRange, yearFilterRange, setYearFilterRange, fullCompanyList, companyFilter, setCompanyFilter}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    const selectAllCompanies = () => {
        setCompanyFilter(fullCompanyList)
    }

    const deselectAllCompanies = () => {
        setCompanyFilter([])
    }

    const toggleCompanyFilter = (company) => {
        if (companyFilter.includes(company)) {
            setCompanyFilter(companyFilter.filter((comp) => {return comp !== company}));
        }
        else {
            setCompanyFilter([...companyFilter, company]);
        }
    }

    //console.log(`full company last at render: ${fullCompanyList}`);
    return (
        <>
            <div className={collapsed ? "navbar collapsed" : "navbar expanded"}>
                <button className="navbar-toggle-btn" onClick={toggleCollapse}>
                    <img src={menuIcon} alt="menu button" />
                </button>
                <div className="navbar-content">
                    <div 
                        className={displayPage === "dashboard" ? "navigation selected" : "navigation unselected"}
                        onClick={() => {setDisplayPage("dashboard")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>
                            <img src={dashboardIcon} alt="dashboard icon"/> Main Dashboard
                        </div>
                        <div className={displayPage === "dashboard" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                    <div 
                        className={displayPage === "table" ? "navigation selected" : "navigation unselected"}
                        onClick={() => {setDisplayPage("table")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>
                            <img src={tableIcon} alt="table icon" /> Data Table
                        </div>
                        <div className={displayPage === "table" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                    <div className="nav-filter-container">
                        <div className="year-filter-container">
                            <div className="filter-label">Filter by year range: (inclusive)</div>
                            <DoubleSlider 
                                minValue={fullYearRange[0]} 
                                maxValue={fullYearRange[1]} 
                                value={yearFilterRange}
                                onChange={setYearFilterRange}
                            >
                            </DoubleSlider>
                            <div class="year-range-display">{yearFilterRange[0]}  -  {yearFilterRange[1]}</div>
                        </div>
                        <div className="filter-label">Filter by company name:</div>
                        <div className="company-filter-util-btns">
                            <button className="company-filter-util-btn" onClick={selectAllCompanies}>Select All</button>
                            <button className="company-filter-util-btn" onClick={deselectAllCompanies}>Reset</button>
                            <div className="blankSpacer"></div>
                        </div>
                        <div className="company-filter-container">
                            {fullCompanyList.map((company) => {
                                return (
                                    <div 
                                        className={companyFilter.includes(company) ? "company-filter picked" : "company-filter unpicked"}
                                        key={company}
                                        onClick={() => {
                                            toggleCompanyFilter(company)
                                        }}
                                    >
                                        {company}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Navbar