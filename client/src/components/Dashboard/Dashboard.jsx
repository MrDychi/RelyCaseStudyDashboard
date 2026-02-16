import './Dashboard.css'
import GlobalKPI from '../GlobalKPI/GlobalKPI.jsx';
import CompanyKPI from '../CompanyKPI/CompanyKPI.jsx';
import locationIcon from '../../assets/location.png';
import missionIcon from '../../assets/mission.png';
import successIcon from '../../assets/success.png';
import rocketIcon from '../../assets/rocket.png';
import retiredIcon from '../../assets/box.png';
import { useState } from 'react';

const Dashboard = ({headers, rowData, yearFilterRange, companyFilter}) => {
    const [showCompanyKPI, setShowCompanyKPI] = useState(true);

    const calculateGlobalKPIStats = () => {
        let filteredData = 
            rowData.filter((row) => {
                let rowYear = Number(row[2].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let rowCompany = row[0];
                return companyFilter.includes(rowCompany);
            })
        return [
            {
                "stat": new Set(filteredData.map((row) => {return row[1]})).size.toString(),
                "metric": "Different locations",
                "icon": locationIcon
            },
            {
                "stat": new Set(filteredData.map((row) => {return row[5]})).size.toString(),
                "metric": "Total mission count",
                "icon": missionIcon
            },
            {
                "stat": filteredData.length === 0 ? "0%" : ((filteredData.filter((row) => {return row[8]==="Success";}).length) 
                    / (filteredData.length) * 100).toFixed(0).toString() + "%",
                "metric": "Successful missions",
                "icon": successIcon
            },
            {
                "stat": new Set(filteredData.map((row) => {return row[4]})).size.toString(),
                "metric": "Total Rockets",
                "icon": rocketIcon
            },
            {
                "stat": filteredData.length === 0 ? "0%" : ((filteredData.filter((row) => {return row[6]==="Retired";}).length)
                    / (filteredData.length) * 100).toFixed(0).toString() + "%",
                "metric": "Retired rockets",
                "icon": retiredIcon
            },
        ]
    }

    const calculateCompanyKPIStats = () => {
        let filteredData = 
            rowData.filter((row) => {
                let rowYear = Number(row[2].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let rowCompany = row[0];
                return companyFilter.includes(rowCompany);
            }) 
        let len = yearFilterRange[1]-yearFilterRange[0]+1;
        let x_values = Array.from({ length: len}, (_, index) => yearFilterRange[0] + index);
        console.log(x_values)
        return companyFilter.map((company) => {
            let companyData = filteredData.filter((row) => {
                return row[0] === company;
            })
            return {
                "company": company,
                "missions": new Set(companyData.map((row) => {return row[5]})).size.toString(),
                "success": companyData.length === 0 
                    ? "0%"
                    : (companyData.filter((row) => {return row[8] === "Success"}).length / companyData.length * 100).toFixed(0).toString() + "%",
                "rockets": new Set(companyData.map((row) => {return row[4]})).size.toString(),
                "retired": companyData.length === 0
                    ? "0%"
                    : (companyData.filter((row) => {return row[6] === "Retired"}).length / companyData.length * 100).toFixed(0).toString() + "%",
                "activity": {
                    "x_data": x_values,
                    "y_data": x_values.map((year) => {
                        return companyData.filter((row) => {return Number(row[2].slice(0,4)) === year}).length
                    })
                }
            }
        })
    }

    return (
        <>
            <div className="dashboard-view">
                <h1>Dashboard</h1>
                <div className="dashboard-container">
                    <div className="global-kpi-container">
                        {calculateGlobalKPIStats().map((kpiStat, index) => {
                            return (
                                <GlobalKPI
                                    key={index}
                                    stat={kpiStat.stat}
                                    metric={kpiStat.metric}
                                    icon={kpiStat.icon}
                                ></GlobalKPI>
                            )
                        })}
                    </div>
                    {showCompanyKPI 
                        ? <a className="toggle-company-kpi" onClick={() => {setShowCompanyKPI(false)}}>Collapse Company Data</a> 
                        : <a className="toggle-company-kpi" onClick={() => {setShowCompanyKPI(true)}}>Expand Company Data</a>
                    }
                    <div className={showCompanyKPI ? "company-kpi-container expanded" : "company-kpi-container collapsed"}>
                        {calculateCompanyKPIStats().map((stats, index) => {
                            return (
                                <CompanyKPI
                                    key={index}
                                    kpiData={stats}
                                ></CompanyKPI>
                            )
                        })}
                    </div>
                    <div className="generic-chart-container"></div>
                </div>
            </div>
            
        </>
    )
}

export default Dashboard