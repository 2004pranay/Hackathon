import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
  background: ${({ theme }) => theme.bg_secondary + '20'};
  border-radius: 8px;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const ExerciseList = styled.div`
  margin-bottom: 24px;
`;

const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + '20'};

  &:last-child {
    border-bottom: none;
  }
`;

const ExerciseName = styled.div`
  color: ${({ theme }) => theme.text_primary};
`;

const ExerciseDetails = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ScheduleInfo = styled.div`
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const WorkoutDetail = ({ workout, onClose, onSchedule, selectedDate }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Image src={workout.image} alt={workout.title} />
        <Title>{workout.title}</Title>
        <Description>{workout.description}</Description>
        
        <Stats>
          <StatItem>
            <StatLabel>Duration</StatLabel>
            <StatValue>{workout.duration} min</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Calories</StatLabel>
            <StatValue>{workout.calories}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Level</StatLabel>
            <StatValue>{workout.level}</StatValue>
          </StatItem>
        </Stats>

        <ExerciseList>
          {workout.exercises.map((exercise, index) => (
            <ExerciseItem key={index}>
              <ExerciseName>{exercise.name}</ExerciseName>
              <ExerciseDetails>
                {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration}s`}
                {exercise.rest ? ` (${exercise.rest}s rest)` : ''}
              </ExerciseDetails>
            </ExerciseItem>
          ))}
        </ExerciseList>

        <ScheduleInfo>
          Schedule for: {format(selectedDate, 'MMMM dd, yyyy')}
        </ScheduleInfo>
        
        <Button onClick={() => onSchedule(workout)}>
          Schedule Workout
        </Button>
      </Modal>
    </Overlay>
  );
};

export default WorkoutDetail;
