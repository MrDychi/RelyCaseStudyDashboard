import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import TableView from './components/TableView/TableView.jsx'
import './App.css'

function App() {
    const [displayPage, setDisplayPage] = useState("dashboard");
    const [fullYearRange, setFullYearRange] = useState(null);
    const [yearFilterRange, setYearFilterRange] = useState(null);

    const [count, setCount] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [companyData, setCompanyData] = useState({ "num": 0, "values": ["Empty"] });

    useEffect(() => {
        const fetchYearRange = async () => {
            const response = await fetch('http://localhost:8000/api/getYearRange');
            const data = await response.json();
            setFullYearRange([Number(data.min), Number(data.max)]);
            setYearFilterRange([Number(data.min), Number(data.max)]);
        }
        fetchYearRange();
    }, []);

    useEffect(() => {
        console.log(`Set year range to: ${fullYearRange}`);
    }, [fullYearRange]);

    const handleClick1 = async () => {
        const response = await fetch('http://localhost:8000/api/summary');
        const data = await response.json();
        setTotalRows(data.totalRows);
        console.log("Fetching summary data...");
    }
    const handleClick2 = async () => {
        const response = await fetch('http://localhost:8000/api/columnData?column=Company');
        const data = await response.json();
        setCompanyData(data);
        console.log("Fetching company data...");
    }
    if (!fullYearRange) {
        return null;
    }
    return (
        <>
            <div className="app-container">
                <Header></Header>
                <div className="main-body">
                    {fullYearRange && (
                        <Navbar 
                            displayPage={displayPage} 
                            setDisplayPage={setDisplayPage} 
                            fullYearRange={fullYearRange} 
                            yearFilterRange={yearFilterRange} 
                            setYearFilterRange={setYearFilterRange}
                        ></Navbar>
                    )}
                    {displayPage === "dashboard" ? <Dashboard></Dashboard> : <></>}
                    {displayPage === "table" ? <TableView></TableView> : <></>}
                    {/*
                    <div className="display-container">
                        <h1>Vite + React</h1>
                        <div className="card">
                            <button onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                            <p>
                                Edit <code>src/App.jsx</code> and save to test HMR
                            </p>
                        </div>
                        <p className="read-the-docs">
                            Click on the Vite and React logos to learn more
                        </p>
                        <button onClick={handleClick1}>Get Summary</button>
                        <p>Total Rows: {totalRows}</p>
                        <button onClick={handleClick2}>Get Company Data</button>
                        {<p>Company Data: {companyData["num"]}, {companyData["values"][0]}</p>}
                    </div>
                    */}
                </div>
            </div>
        </>
    )
}

export default App
