import { useState, useEffect } from 'react'
import DoubleSlider from '../DoubleSlider/DoubleSlider.jsx'
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
                <button className="navbar-toggle-btn" onClick={toggleCollapse}></button>
                <div className="navbar-content">
                    <div 
                        className={displayPage === "dashboard" ? "navigation selected" : "navigation unselected"}
                        onClick={() => {setDisplayPage("dashboard")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>Main Dashboard</div>
                        <div className={displayPage === "dashboard" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                    <div 
                        className={displayPage === "table" ? "navigation selected" : "navigation unselected"}
                        onClick={() => {setDisplayPage("table")}}
                    >
                        <div className="indicator unselected"></div>
                        <div>Data Table</div>
                        <div className={displayPage === "table" ? "indicator selected" : "indicator unselected"}></div>
                    </div>
                    <div className="nav-filter-container">
                        <div className="year-filter-container">
                            <div>Filter by year range: (inclusive)</div>
                            <div>{yearFilterRange[0]}-{yearFilterRange[1]}</div>
                            <DoubleSlider 
                                minValue={fullYearRange[0]} 
                                maxValue={fullYearRange[1]} 
                                value={yearFilterRange}
                                onChange={setYearFilterRange}
                            >
                            </DoubleSlider>
                        </div>
                        <div>Filter by company name:</div>
                        <div className="company-filter-util-btns">
                            <button className="company-filter-util-btn" onClick={selectAllCompanies}>Select All</button>
                            <button className="company-filter-util-btn" onClick={deselectAllCompanies}>Reset</button>
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