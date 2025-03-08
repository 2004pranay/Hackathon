import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getDietSuggestions } from '../api';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
`;

const MealCard = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const MealTime = styled.h4`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 0;
  padding-left: 20px;
  position: relative;
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
  }
`;

const DietSuggestions = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDietSuggestions = async () => {
      try {
        const response = await getDietSuggestions(currentUser.token);
        setSuggestions(response.data.data);
      } catch (err) {
        setError('Failed to load diet suggestions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDietSuggestions();
  }, [currentUser]);

  if (loading) return <Text>Loading diet suggestions...</Text>;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;
  if (!suggestions) return <Text>No diet suggestions available</Text>;

  return (
    <Container>
      <Title>Your Personalized Diet Plan</Title>
      
      <Section>
        <SubTitle>Health Metrics</SubTitle>
        <Text>BMI: {suggestions.bmi}</Text>
        <Text>Category: {suggestions.bmiCategory}</Text>
      </Section>

      <Section>
        <SubTitle>Dietary Recommendations</SubTitle>
        <List>
          {suggestions.recommendations.map((rec, index) => (
            <ListItem key={index}>{rec}</ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <SubTitle>Daily Meal Plan</SubTitle>
        <MealCard>
          <MealTime>Early Morning (6:00 AM)</MealTime>
          <List>
            {suggestions.mealPlan.earlyMorning.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>

        <MealCard>
          <MealTime>Breakfast (8:00 AM)</MealTime>
          <List>
            {suggestions.mealPlan.breakfast.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>

        <MealCard>
          <MealTime>Mid-Morning (11:00 AM)</MealTime>
          <List>
            {suggestions.mealPlan.midMorning.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>

        <MealCard>
          <MealTime>Lunch (1:00 PM)</MealTime>
          <List>
            {suggestions.mealPlan.lunch.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>

        <MealCard>
          <MealTime>Evening Snack (4:00 PM)</MealTime>
          <List>
            {suggestions.mealPlan.eveningSnack.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>

        <MealCard>
          <MealTime>Dinner (8:00 PM)</MealTime>
          <List>
            {suggestions.mealPlan.dinner.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </MealCard>
      </Section>
    </Container>
  );
};

export default DietSuggestions;
