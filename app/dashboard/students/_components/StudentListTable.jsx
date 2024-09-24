import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";

const pagination = true;
const paginationPageSize = 10;

function StudentListTable({ studentList, onFilterStudents }) {
  const CustomButtons = (props) => {
    return <Button variant="destructive"><Trash /></Button>;
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: 'action', cellRenderer: CustomButtons }
  ]);

  const [rowData, setRowData] = useState(studentList);
  const [searchInput, setSearchInput] = useState(""); // For search input tracking

  // Function to filter students based on search input
  const filterStudents = () => {
    if (searchInput) {
      const filteredData = studentList.filter((student) =>
        Object.values(student).some((value) =>
          String(value).toLowerCase().includes(searchInput.toLowerCase())
        )
      );
      setRowData(filteredData);
      onFilterStudents(filteredData); // Update the parent with the filtered list
    } else {
      setRowData(studentList); // Reset to the original list if search is cleared
      onFilterStudents(studentList); // Update the parent with the full list
    }
  };

  // Effect to update the rowData and filtered students whenever the search input changes
  useEffect(() => {
    filterStudents();
  }, [searchInput, studentList]); // Re-run when searchInput or studentList changes

  return (
    <div className="my-7">
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <Search />
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Search on Anything..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
