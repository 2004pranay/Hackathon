import React from 'react';
import styled from 'styled-components';
import DietSuggestions from '../components/DietSuggestions';
import BMICalculator from '../components/BMICalculator';

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

const Sidebar = styled.div`
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const HealthProfilePage = () => {
  return (
    <Container>
      <Wrapper>
        <Title>BMI Calculator & Diet Suggestions</Title>
        <Section>
          <MainContent>
            <DietSuggestions />
          </MainContent>
          <Sidebar>
            <BMICalculator />
          </Sidebar>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default HealthProfilePage;
