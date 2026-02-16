import './TableView.css'
import SortingTable from '../SortingTable/SortingTable.jsx';

const TableView = ({headers, rowData, yearFilterRange, companyFilter}) => {
    


    return (
        <>
            <div className="tableView">
                <h1>Table View</h1>
                <div className="table-container">
                    <SortingTable
                        headers={headers}
                        rowData={rowData}
                        yearFilterRange={yearFilterRange}
                        companyFilter={companyFilter}
                    >
                    </SortingTable>
                </div>
            </div>
        </>
    )
}

export default TableView