import './Dashboard.css'
import GlobalKPI from '../GlobalKPI/GlobalKPI.jsx';
import locationIcon from '../../assets/location.png';
import missionIcon from '../../assets/mission.png';
import successIcon from '../../assets/success.png';
import rocketIcon from '../../assets/rocket.png';
import retiredIcon from '../../assets/box.png';

const Dashboard = ({headers, rowData, yearFilterRange, companyFilter}) => {

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

    return (
        <>
            <div className="dashboard-view">
                <h1>Dashboard View</h1>
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
                    <div className="generic-chart-container"></div>
                </div>
            </div>
            
        </>
    )
}

export default Dashboard