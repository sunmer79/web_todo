import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarBox.css';

const CalendarBox = ({ selectedDate, setSelectedDate, todosByDate, getDateKey }) => {
  return (
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      calendarType="gregory"
      tileContent={({ date, view }) => {
        if (view !== 'month') return null;

        const dateKey = getDateKey(date);
        const todos = todosByDate[dateKey] || [];

        if (todos.length === 0) return null;

        const allDone = todos.every((todo) => todo.done);

        return (
          <div className="calendar-dot-wrapper">
            <div
              className="calendar-dot"
              style={{
                backgroundColor: allDone ? '#199e45' : '#777',
              }}
            />
          </div>
        );
      }}
    />
  );
};

export default CalendarBox;
