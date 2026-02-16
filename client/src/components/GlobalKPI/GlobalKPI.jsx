import './GlobalKPI.css';

const GlobalKPI = ({stat, metric, icon}) => {
    return (
        <>
            <div className="global-kpi-card">
                <div className="empty"></div>
                <div className="global-kpi-card-stat-container">
                    <h1>{stat}</h1>
                    <p>{metric}</p>
                </div>
                <img src={icon}/>
            </div>
        </>
    )
}

export default GlobalKPI