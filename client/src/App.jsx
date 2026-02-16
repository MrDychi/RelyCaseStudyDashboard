import { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import TableView from './components/TableView/TableView.jsx'
import './App.css'

function App() {
    // Global states for navbar
    const [displayPage, setDisplayPage] = useState("dashboard");

    // Global states for year filtering
    const [fullYearRange, setFullYearRange] = useState(null);
    const [yearFilterRange, setYearFilterRange] = useState(null);

    // Global states for company filtering
    const [fullCompanyList, setFullCompanyList] = useState(null);
    const [companyFilter, setCompanyFilter] = useState(null);

    // On initial render, fetch needed data
    useEffect(() => {
        // Fetch the year information
        const fetchYearRange = async () => {
            const response = await fetch('http://localhost:8000/api/getYearRange');
            const data = await response.json();
            setFullYearRange([Number(data.min), Number(data.max)]);
            setYearFilterRange([Number(data.min), Number(data.max)]);
        }
        fetchYearRange();

        // Fetch the company information
        const fetchCompanies = async () => {
            const response = await fetch('http://localhost:8000/api/getAllCompanies');
            const data = await response.json();
            setFullCompanyList(data);
            setCompanyFilter([]);
        }
        fetchCompanies();
    }, []);

    // Debug: track changes to year filter
    useEffect(() => {
        console.log(`Set year filter range to: ${yearFilterRange}`);
    }, [yearFilterRange]);

    // Debug: track changes to company filter
    useEffect(() => {
        console.log(`Set company filter to: ${companyFilter}`);
    }, [companyFilter]);

    // Debug: track changes to company filter
    useEffect(() => {
        console.log(`Set company list to: ${fullCompanyList}`);
    }, [fullCompanyList]);

    return (
        <>
            <div className="app-container">
                <Header></Header>
                <div className="main-body">
                    {fullYearRange && fullCompanyList && (
                        <Navbar 
                            displayPage={displayPage} 
                            setDisplayPage={setDisplayPage} 
                            fullYearRange={fullYearRange} 
                            yearFilterRange={yearFilterRange} 
                            setYearFilterRange={setYearFilterRange}
                            fullCompanyList={fullCompanyList}
                            companyFilter={companyFilter}
                            setCompanyFilter={setCompanyFilter}
                        ></Navbar>
                    )}
                    {displayPage === "dashboard" ? <Dashboard></Dashboard> : <></>}
                    {displayPage === "table" ? <TableView></TableView> : <></>}
                </div>
            </div>
        </>
    )
}

export default App
