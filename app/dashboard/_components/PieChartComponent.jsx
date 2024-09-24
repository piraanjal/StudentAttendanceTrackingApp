import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function PieChartComponent({ attendanceList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(attendanceList);
    if (attendanceList) {
      const totalSt = getUniqueRecord(attendanceList);
      const today = moment().format('D');
      const PresentPrec = (attendanceList.length / (totalSt.length * Number(today))) * 100;
      setData([
        {
          name: 'Total Present',
          value: Number(PresentPrec.toFixed(1)),
          fill: '#F59E0B', // Orange-400 shade for present
          label: 'Total Present'
        },
        {
          name: 'Total Absent',
          value: (100 - Number(PresentPrec.toFixed(1))),
          fill: '#FBBF24' // Yellow shade for absent
        },
      ]);
    }
  }, [attendanceList]);

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg text-orange-800'>Monthly Attendance</h2>
      <ResponsiveContainer width={'100%'} height={300}>
        <PieChart width={730} height={250}>
          <Pie 
            data={data} 
            dataKey="value"
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            innerRadius={60} 
            outerRadius={80} 
            label 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
