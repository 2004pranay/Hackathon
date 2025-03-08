import React, { useState } from 'react';
import styled from 'styled-components';
import BMIForm from './BMIForm';
import ChatBot from './ChatBot';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const BMIChart = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '30'};
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + '30'};
  &:last-child {
    border-bottom: none;
  }
`;

const ChartCategory = styled.span`
  color: ${({ theme }) => theme.text_primary};
`;

const ChartRange = styled.span`
  color: ${({ theme }) => theme.text_secondary};
`;

const BMICalculator = () => {
  const [bmi, setBMI] = useState(null);

  const handleBMICalculated = (calculatedBMI) => {
    setBMI(calculatedBMI);
  };

  return (
    <Container>
      <Title>BMI Calculator</Title>
      <BMIForm onCalculate={handleBMICalculated} />
      <ChatBot bmi={bmi} />
      <BMIChart>
        <Title>BMI Categories</Title>
        <ChartRow>
          <ChartCategory>Underweight</ChartCategory>
          <ChartRange>&lt; 18.5</ChartRange>
        </ChartRow>
        <ChartRow>
          <ChartCategory>Normal weight</ChartCategory>
          <ChartRange>18.5 - 24.9</ChartRange>
        </ChartRow>
        <ChartRow>
          <ChartCategory>Overweight</ChartCategory>
          <ChartRange>25 - 29.9</ChartRange>
        </ChartRow>
        <ChartRow>
          <ChartCategory>Obese</ChartCategory>
          <ChartRange>&gt; 30</ChartRange>
        </ChartRow>
      </BMIChart>
    </Container>
  );
};

export default BMICalculator;
