import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  font-size: 18px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary + '20'};
  color: ${({ theme }) => theme.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const WorkoutCard = ({ workout, onClick }) => {
  return (
    <Card onClick={() => onClick(workout)}>
      <Image src={workout.image} alt={workout.title} />
      <Content>
        <Title>{workout.title}</Title>
        <Description>{workout.description}</Description>
        <Meta>
          <Tag>{workout.level}</Tag>
          <Stats>
            <Stat>⏱️ {workout.duration} min</Stat>
            <Stat>🔥 {workout.calories} cal</Stat>
          </Stats>
        </Meta>
      </Content>
    </Card>
  );
};

export default WorkoutCard;
