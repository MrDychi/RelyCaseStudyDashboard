import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [companyData, setCompanyData] = useState({"num": 0, "values": ["Empty"]});

  const handleClick1 = async() => {
    const response = await fetch('http://localhost:8000/api/summary');
    const data = await response.json();
    setTotalRows(data.totalRows);
    console.log("Fetching summary data...");
  }
  const handleClick2 = async() => {
    const response = await fetch('http://localhost:8000/api/columnData?column=Company');
    const data = await response.json();
    setCompanyData(data);
    console.log("Fetching company data...");
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
    </>
  )
}

export default App
