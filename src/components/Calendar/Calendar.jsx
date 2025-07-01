import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendar({ selectedDate, onChange }) {
  return (
    <ReactCalendar
      onChange={onChange}
      value={selectedDate}
    />
  );
}
