"use client";
import React, { useState, useEffect } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable";
import TotalStudentsCard from "./_components/TotalStudentsCard"; // Import the card

function Student() {
  const [studentList, setStudentList] = useState([]); // Original list
  const [filteredStudentList, setFilteredStudentList] = useState([]); // Filtered list

  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = () => {
    GlobalApi.GetAllStudents().then((resp) => {
      setStudentList(resp.data);
      setFilteredStudentList(resp.data); // Initially, filtered list is the same as the original
    });
  };

  // Function to update the filtered list when search is applied
  const handleFilteredStudents = (filteredList) => {
    setFilteredStudentList(filteredList);
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent />
      </h2>
      {/* Pass the total count of filtered students */}
      <TotalStudentsCard totalStudents={filteredStudentList.length} />
      <StudentListTable
        studentList={studentList}
        onFilterStudents={handleFilteredStudents} // Pass handler to update filtered students
      />
    </div>
  );
}

export default Student;
