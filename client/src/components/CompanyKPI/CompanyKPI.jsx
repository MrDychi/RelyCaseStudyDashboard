import './CompanyKPI.css';
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const CompanyKPI = ({kpiData}) => {
    //console.log(`(${kpiData.activity.x_data}, ${kpiData.activity.y_data})`)
    return (
        <div className="company-kpi-card">
            <h3 className="company-kpi-title">{kpiData.company}</h3>
            <div className="company-kpi-basic-stat-container">
                <div className="company-kpi-basic-stat-data">
                    <p className="company-basic-stat-value">{kpiData.missions}</p>
                    <p className="company-basic-stat-label">Total Missions</p>
                </div>
                <div className="company-kpi-basic-stat-data">
                    <p className="company-basic-stat-value">{kpiData.success}</p>
                    <p className="company-basic-stat-label">Success Rate</p>
                </div>
                <div className="company-kpi-basic-stat-data">
                    <p className="company-basic-stat-value">{kpiData.rockets}</p>
                    <p className="company-basic-stat-label">Total Rockets</p>
                </div>
                <div className="company-kpi-basic-stat-data">
                    <p className="company-basic-stat-value">{kpiData.retired}</p>
                    <p className="company-basic-stat-label">Retire Rate</p>
                </div>
            </div>
            <Line
                data={{
                    labels: kpiData.activity.x_data,
                    datasets: [
                        {
                            label: "Mission Activity",
                            data: kpiData.activity.y_data,
                            backgroundColor: "#0000ff",
                            borderColor: "#0000ff"
                        }
                    ]
                }}
                options={kpiData.activity.y_data.filter((val) => val !== 0).length > 0 ? {}
                    : {
                        scales: {
                            y: {
                                min: 0,
                                max: 3
                            }
                        }
                    }
                }
            >

            </Line>
        </div>
    )
}

export default CompanyKPI