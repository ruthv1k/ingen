'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
  subMonths,
} from 'date-fns';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import CalendarCell from './calendar.cell';

const getMonthDates = (date: Date) => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
};

const Calendar = () => {
  const [month, setMonth] = useState(getMonthDates(startOfToday()));

  const moveToNextMonth = () => {
    const startDate = addMonths(month[0], 1);
    setMonth(getMonthDates(startDate));
  };

  const moveToPrevMonth = () => {
    const startDateOfPrevWeek = subMonths(month[0], 1);
    setMonth(getMonthDates(startDateOfPrevWeek));
  };

  return (
    <>
      <div className='mb-4 text-left font-semibold dark:text-dark-theme-heading'>
        <div className='mb-4 flex items-center justify-between'>
          <button className='dark:text-white' onClick={moveToPrevMonth}>
            <ArrowLeftIcon className='w-5 h-5' />
          </button>
          <h3 className='dark:text-white'>
            {format(month[0], 'MMMM')} {format(month[0], 'yyyy')}
          </h3>
          <button className='dark:text-white' onClick={moveToNextMonth}>
            <ArrowRightIcon className='w-5 h-5' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-6'>
        {month.map((day, i) => (
          <CalendarCell key={i} day={day} />
        ))}
      </div>
    </>
  );
};

export default Calendar;
