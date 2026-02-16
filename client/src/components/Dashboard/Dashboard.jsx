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
                let colIndex = headers.indexOf("Date");
                let rowYear = Number(row[colIndex].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let colIndex = headers.indexOf("Company");
                let rowCompany = row[colIndex];
                return companyFilter.includes(rowCompany);
            })
        return [
            {
                "stat": new Set(filteredData.map((row) => {return row[headers.indexOf("Location")]})).size.toString(),
                "metric": "Different locations",
                "icon": locationIcon
            },
            {
                "stat": new Set(filteredData.map((row) => {return row[headers.indexOf("Mission")]})).size.toString(),
                "metric": "Total mission count",
                "icon": missionIcon
            },
            {
                "stat": filteredData.length === 0 ? "0%" : ((filteredData.filter((row) => {return row[headers.indexOf("MissionStatus")]==="Success";}).length) 
                    / (filteredData.length) * 100).toFixed(0).toString() + "%",
                "metric": "Successful missions",
                "icon": successIcon
            },
            {
                "stat": new Set(filteredData.map((row) => {return row[headers.indexOf("Rocket")]})).size.toString(),
                "metric": "Total Rockets",
                "icon": rocketIcon
            },
            {
                "stat": filteredData.length === 0 ? "0%" : ((filteredData.filter((row) => {return row[headers.indexOf("RocketStatus")]==="Retired";}).length)
                    / (filteredData.length) * 100).toFixed(0).toString() + "%",
                "metric": "Retired rockets",
                "icon": retiredIcon
            },
        ]
    }

    const calculateCompanyKPIStats = () => {
        let filteredData = 
            rowData.filter((row) => {
                let colIndex = headers.indexOf("Date");
                let rowYear = Number(row[colIndex].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let colIndex = headers.indexOf("Company");
                let rowCompany = row[colIndex];
                return companyFilter.includes(rowCompany);
            }) 
        let len = yearFilterRange[1]-yearFilterRange[0]+1;
        let x_values = Array.from({ length: len}, (_, index) => yearFilterRange[0] + index);
        return companyFilter.map((company) => {
            let companyData = filteredData.filter((row) => {
                return row[headers.indexOf("Company")] === company;
            })
            return {
                "company": company,
                "missions": new Set(companyData.map((row) => {return row[headers.indexOf("Mission")]})).size.toString(),
                "success": companyData.length === 0 
                    ? "0%"
                    : (companyData.filter((row) => {return row[headers.indexOf("MissionStatus")] === "Success"}).length / companyData.length * 100).toFixed(0).toString() + "%",
                "rockets": new Set(companyData.map((row) => {return row[headers.indexOf("Rocket")]})).size.toString(),
                "retired": companyData.length === 0
                    ? "0%"
                    : (companyData.filter((row) => {return row[headers.indexOf("RocketStatus")] === "Retired"}).length / companyData.length * 100).toFixed(0).toString() + "%",
                "activity": {
                    "x_data": x_values,
                    "y_data": x_values.map((year) => {
                        return companyData.filter((row) => {return Number(row[headers.indexOf("Date")].slice(0,4)) === year}).length
                    })
                }
            }
        })
    }

    const calculateTopFiveRockets = () => {
        const counts = {};
        let filteredData = 
            rowData.filter((row) => {
                let colIndex = headers.indexOf("Date");
                let rowYear = Number(row[colIndex].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let colIndex = headers.indexOf("Company");
                let rowCompany = row[colIndex];
                return companyFilter.includes(rowCompany);
            }) 
        filteredData.forEach((row) => {
            let colIndex = headers.indexOf("Rocket");
            counts[row[colIndex]] = (counts[row[colIndex]] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a,b) => b[1] - a[1])
            .slice(0,5);
    }

    const calculateRocketUsage = () => {
        const rocketCounts = {};
        let filteredData = 
            rowData.filter((row) => {
                let colIndex = headers.indexOf("Date");
                let rowYear = Number(row[colIndex].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let colIndex = headers.indexOf("Company");
                let rowCompany = row[colIndex];
                return companyFilter.includes(rowCompany);
            }) 
        filteredData.forEach((row) => {
            let colIndex = headers.indexOf("Rocket");
            rocketCounts[row[colIndex]] = (rocketCounts[row[colIndex]] || 0) + 1;
        })
        const freqCounts = {};
        Object.values(rocketCounts).forEach(count => {
            freqCounts[count] = (freqCounts[count] || 0) + 1;
        })
        return Object.entries(freqCounts);
    }

    const calculateSuccessRate = () => {
        let filteredData = 
            rowData.filter((row) => {
                let colIndex = headers.indexOf("Date");
                let rowYear = Number(row[colIndex].slice(0,4));
                return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
            })
            .filter((row) => {
                let colIndex = headers.indexOf("Company");
                let rowCompany = row[colIndex];
                return companyFilter.includes(rowCompany);
            }) 
        let len = yearFilterRange[1]-yearFilterRange[0]+1;
        let x_values = Array.from({ length: len}, (_, index) => yearFilterRange[0] + index);
        let y_values = x_values.map(year => {
            const attempts = filteredData.filter(row => Number(row[headers.indexOf("Date")].slice(0,4)) === year)
            const success = attempts.filter(row => row[headers.indexOf("MissionStatus")] === "Success")
            return attempts.length === 0 ? 0 : success.length / attempts.length
        })
        return [x_values, y_values]
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
                                <div className="doughnut graph-card-label">Most Active Rockets</div>
                                <div className="doughnut graph-card-graph">
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
                                    <div className="bar graph-card-label">Rocket Reusability</div>
                                    <div className="bar graph-card-graph">
                                        <Bar
                                            data={{
                                                labels: calculateRocketUsage().map(entry => "Used " + entry[0] + " time(s)"),
                                                datasets: [
                                                    {
                                                        label: "# of Rockets",
                                                        data: calculateRocketUsage().map(entry => entry[1])
                                                    }
                                                ]
                                            }}
                                        ></Bar>
                                    </div>
                                </div>
                            </div>
                            <div className="line chart-container">
                                <div className="line graph-card">
                                    <div className="line graph-card-label">Mission Success Rates</div>
                                    <div className="line graph-card-graph">
                                        <Line
                                            data={{
                                                labels: calculateSuccessRate()[0],
                                                datasets: [
                                                    {
                                                        label: "Success rate",
                                                        data: calculateSuccessRate()[1]
                                                    }
                                                ]
                                            }}
                                        ></Line>
                                    </div>
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