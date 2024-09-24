import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const daysInMonth = (year, month) => moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    const numberOfDays = daysInMonth(moment(selectedMonth).year(), moment(selectedMonth).month() + 1);
    let daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    useEffect(() => {
        // Set up base columns
        setColDefs([
            { field: 'studentId', headerName: 'Student ID', filter: true },
            { field: 'name', headerName: 'Name', filter: true }
        ]);

        // Add columns for each day of the month
        daysArray.forEach((date) => {
            setColDefs(prevData => [
                ...prevData,
                { field: date.toString(), headerName: date.toString(), width: 50, editable: true }
            ]);
        });

        // Set row data
        if (attendanceList) {
            const userList = getUniqueRecord();
            userList.forEach(obj => {
                daysArray.forEach(date => {
                    obj[date] = isPresent(obj.studentId, date);
                });
            });
            setRowData(userList);
        }
    }, [attendanceList, selectedMonth]);

    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day === day && item.studentId === studentId);
        return result ? true : false;
    };

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });
        return uniqueRecord;
    };

    const onMarkAttendace = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/YYYY');
        const data = { day, studentId, present: presentStatus, date };

        if (presentStatus) {
            GlobalApi.MarkAttendance(data).then(resp => {
                toast.success(`Student Id: ${studentId} marked as present`);
            });
        } else {
            GlobalApi.MarkAbsent(studentId, day, date).then(resp => {
                toast.success(`Student Id: ${studentId} marked as absent`);
            });
        }
    };

    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendace(parseInt(e.colDef.field), e.data.studentId, e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default AttendanceGrid;
