import {useState} from 'react';
import './SortingTable.css';

const SortingTable = ({headers, rowData, yearFilterRange, companyFilter}) => {
    const [sortKey, setSortKey] = useState({"key": null, "direction": "asc"});

    const toggleSortMethod = (header) => {
        setSortKey({
            "key": header, 
            "direction": sortKey.key === header ? sortKey.direction === "asc" ? "desc" : "asc" : "asc"
        });
    };

    const getSortedArray = (arr) => {
        // get column index
        let index = headers.indexOf(sortKey.key);
        if (sortKey.key === null) {
            return arr;
        }
        if (sortKey.direction === "asc") {
            return arr.sort((a, b) => {return a[index] > b[index] ? 1 : -1});
        } 
        return arr.sort((a, b) => {return a[index] > b[index] ? -1 : 1});
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {headers.map((title, index) => {
                            return (
                                <th key={index} onClick={() => toggleSortMethod(title)}>{title}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {getSortedArray(rowData
                        .filter((row) => {
                            let rowYear = Number(row[2].slice(0,4));
                            return rowYear >= yearFilterRange[0] && rowYear <= yearFilterRange[1];
                        })
                        .filter((row) => {
                            let rowCompany = row[0];
                            return companyFilter.includes(rowCompany);
                        })
                    ).map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {row.map((value, cellIndex) => {
                                        return (
                                            <td key={cellIndex}>{value}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default SortingTable