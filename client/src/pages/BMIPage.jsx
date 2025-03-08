import React, { useState } from 'react';
import styled from 'styled-components';
import BMIForm from '../components/BMIForm';
import ChatBot from '../components/ChatBot';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Section = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const BMIResult = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const BMIValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const BMICategory = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
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

const BMIPage = () => {
  const [bmi, setBMI] = useState(null);

  const handleBMICalculated = (calculatedBMI) => {
    setBMI(calculatedBMI);
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <Container>
      <Wrapper>
        <Title>BMI Calculator & Health Assistant</Title>
        <Section>
          <MainContent>
            <BMIForm onCalculate={handleBMICalculated} />
            {bmi && (
              <BMIResult>
                <BMIValue>BMI: {bmi.toFixed(1)}</BMIValue>
                <BMICategory>Category: {getBMICategory(bmi)}</BMICategory>
              </BMIResult>
            )}
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
          </MainContent>
          <ChatBot bmi={bmi} />
        </Section>
      </Wrapper>
    </Container>
  );
};

export default BMIPage;
