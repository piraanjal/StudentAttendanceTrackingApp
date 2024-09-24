import React from 'react';

function Card({ icon, title, value }) {
  return (
    <div className='flex items-center gap-5 p-7 bg-orange-200 rounded-lg shadow-sm'>
      <div className='p-2 h-10 w-10 rounded-full bg-white text-orange-600'>
        {icon}
      </div>
      <div>
        <h2 className='font-bold text-orange-800'>{title}</h2>
        <h2 className='text-lg text-orange-800'>{value}</h2>
      </div>
    </div>
  );
}

export default Card;
