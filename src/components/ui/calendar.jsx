import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  getDay,
  subMonths
} from 'date-fns';

export function Calendar({ mode = 'single', selected, onSelect, className = '', initialFocus }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day) => {
    onSelect(day);
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center p-1 text-sm font-medium text-gray-500" key={i}>
          {format(addDays(startDate, i), dateFormat).slice(0, 3)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            className={`relative p-1 text-center cursor-pointer h-10 flex items-center justify-center ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} ${
              isToday(day) ? "bg-blue-100 rounded-full" : ""
            } ${
              selected && isSameDay(day, selected) ? "bg-blue-500 text-white rounded-full" : ""
            }`}
            key={day.toString()}
            onClick={() => handleDateClick(new Date(cloneDay))}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-2">{rows}</div>;
  };

  return (
    <div className={`p-3 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ❮
        </button>
        <div className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ❯
        </button>
      </div>
      {renderDays()}
      {renderCells()}
    </div>
  );
}
