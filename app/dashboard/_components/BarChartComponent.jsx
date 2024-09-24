import { getUniqueRecord } from '@/app/_services/service';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartComponent({ attendanceList, totalPresentData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    formatAttendanceListCount();
  }, [attendanceList, totalPresentData]);

  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecord(attendanceList);
    console.log(totalStudent.length, totalPresentData);
    const result = totalPresentData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }));

    console.log(result);
    setData(result);
  };

  return (
    <div className='p-5 border rounded-lg'>
      <h2 className='my-2 font-bold text-lg text-orange-800'>Attendance</h2>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presentCount" name="Total Present" fill="#F59E0B" /> {/* Orange-400 shade for present */}
          <Bar dataKey="absentCount" name="Total Absent" fill="#FBBF24" /> {/* Yellow shade for absent */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
