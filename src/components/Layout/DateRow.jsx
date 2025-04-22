import { useEffect, useState } from 'react';
import { formatCurrentDate } from '../../utils/dateFormatter';

const DateRow = () => {
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    setCurrentDate(formatCurrentDate('long'));
  }, []);
  
  return (
    <div className="date-row">
      <div className="w-48 border border-gray-300 px-3 py-1 text-sm text-gray-500">DATE</div>
      <div className="flex-grow border border-gray-300 border-l-0 px-3 py-1">
        {currentDate}
      </div>
      <div className="w-12 border border-gray-300 border-l-0"></div>
    </div>
  );
};

export default DateRow;
