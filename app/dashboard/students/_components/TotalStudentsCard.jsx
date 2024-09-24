import React from 'react';

function TotalStudentsCard({ totalStudents }) {
  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow-md w-full max-w-xs">
      <h3 className="font-semibold text-lg">Total Students</h3>
      <p className="text-4xl font-bold mt-2">{totalStudents}</p>
    </div>
  );
}

export default TotalStudentsCard;
