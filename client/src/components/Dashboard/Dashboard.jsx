import './Dashboard.css'
import GlobalKPI from '../GlobalKPI/GlobalKPI.jsx';
import CompanyKPI from '../CompanyKPI/CompanyKPI.jsx';
import locationIcon from '../../assets/location.png';
import missionIcon from '../../assets/mission.png';
import successIcon from '../../assets/success.png';
import rocketIcon from '../../assets/rocket.png';
import retiredIcon from '../../assets/box.png';
import { useState } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Line } from "react-chartjs-2";

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

    const calculateTopFiveRockets = () => {
        const counts = {};
        let filteredData = 
            rowData.filter((row) => {
                let rowYear = Number(row[2].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let rowCompany = row[0];
                return companyFilter.includes(rowCompany);
            }) 
        filteredData.forEach((row) => {
            counts[row[4]] = (counts[row[4]] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a,b) => b[1] - a[1])
            .slice(0,5);
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
                    <div className="generic-chart-container">
                        <div className="doughnut chart-container">
                            <div className="doughnut graph-card">
                                <div className="graph-card-label">Most Active Rockets</div>
                                <div className="graph-card-graph">
                                    <Doughnut
                                        data={{
                                            labels: calculateTopFiveRockets().map(entry => entry[0]),
                                            datasets: [
                                                {
                                                    label: 'Total missions',
                                                    data: calculateTopFiveRockets().map(entry => entry[1]),
                                                    backgroundColor: [
                                                        "#ffe600",
                                                        "#9b9b9b",
                                                        "#a87c49",
                                                        "#65346c",
                                                        "#587256",
                                                    ],
                                                    borderRadius: 5
                                                }
                                            ]
                                        }}
                                    ></Doughnut>
                                </div>
                            </div>
                        </div>
                        <div className="time-charts-container">
                            <div className="bar chart-container">
                                <div className="bar graph-card">
                                    {/*<Bar></Bar>*/}
                                </div>
                            </div>
                            <div className="line chart-container">
                                <div className="line graph-card">
                                    {/*<Line></Line>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Dashboard