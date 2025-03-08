import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  format, 
  addDays, 
  startOfWeek, 
  endOfWeek,
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths 
} from 'date-fns';

const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthTitle = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  margin: 0;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

const WeekDay = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  text-align: center;
  padding: 4px;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const Day = styled.div`
  aspect-ratio: 1;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  background: ${({ isCurrentMonth, isSelected, theme }) => 
    isSelected ? theme.primary + '20' :
    !isCurrentMonth ? theme.bg_secondary + '20' : 'transparent'
  };
  color: ${({ isCurrentMonth, theme }) => 
    isCurrentMonth ? theme.text_primary : theme.text_secondary
  };
  border: ${({ isToday, theme }) => 
    isToday ? `1px solid ${theme.primary}` : 'none'
  };

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
  }
`;

const DayNumber = styled.span`
  font-size: 12px;
  font-weight: ${({ isToday }) => isToday ? 'bold' : 'normal'};
`;

const WorkoutIndicator = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
`;

const WorkoutPreview = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

const WorkoutCalendar = ({ workouts, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDaySelect(date);
  };

  const getWorkoutsForDay = (date) => {
    return workouts.filter(workout => 
      workout.scheduledDate && isSameDay(new Date(workout.scheduledDate), date)
    );
  };

  const previousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <CalendarContainer>
      <Header>
        <Button onClick={previousMonth}>&lt;</Button>
        <MonthTitle>{format(currentDate, 'MMMM yyyy')}</MonthTitle>
        <Button onClick={nextMonth}>&gt;</Button>
      </Header>
      <WeekDays>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>
      <Days>
        {days.map((day, idx) => {
          const dayWorkouts = getWorkoutsForDay(day);
          return (
            <Day
              key={idx}
              isCurrentMonth={isSameMonth(day, monthStart)}
              isSelected={isSameDay(day, selectedDate)}
              isToday={isSameDay(day, new Date())}
              onClick={() => handleDateClick(day)}
            >
              <DayNumber isToday={isSameDay(day, new Date())}>
                {format(day, 'd')}
              </DayNumber>
              {dayWorkouts.length > 0 && (
                <>
                  <WorkoutIndicator />
                  <WorkoutPreview>
                    {dayWorkouts[0].title}
                    {dayWorkouts.length > 1 && ` +${dayWorkouts.length - 1}`}
                  </WorkoutPreview>
                </>
              )}
            </Day>
          );
        })}
      </Days>
    </CalendarContainer>
  );
};

export default WorkoutCalendar;
