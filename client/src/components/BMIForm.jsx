import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  width: 120px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
  margin-right: 10px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.error || '#ff0000'};
  font-size: 14px;
  margin-top: 4px;
`;

const BMIForm = ({ onCalculate }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [error, setError] = useState('');
  const [bmi, setBMI] = useState(null);

  const validateInputs = () => {
    if (!height || !weight) {
      setError('Please enter both height and weight');
      return false;
    }
    if (height <= 0 || weight <= 0) {
      setError('Height and weight must be greater than 0');
      return false;
    }
    setError('');
    return true;
  };

  const calculateBMI = () => {
    if (!validateInputs()) {
      onCalculate(null);
      return;
    }

    let heightInMeters;
    let weightInKg;

    try {
      // Convert height to meters
      if (heightUnit === 'cm') {
        heightInMeters = parseFloat(height) / 100;
      } else {
        heightInMeters = parseFloat(height) * 0.0254; // inches to meters
      }

      // Convert weight to kg
      if (weightUnit === 'kg') {
        weightInKg = parseFloat(weight);
      } else {
        weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
      }

      if (isNaN(heightInMeters) || isNaN(weightInKg)) {
        throw new Error('Invalid number format');
      }

      const bmi = weightInKg / (heightInMeters * heightInMeters);
      
      if (isNaN(bmi) || !isFinite(bmi)) {
        throw new Error('Invalid BMI calculation');
      }

      setError('');
      setBMI(bmi);
      onCalculate(bmi);
    } catch (err) {
      setError('Please enter valid numbers for height and weight');
      onCalculate(null);
    }
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, heightUnit, weightUnit]);

  return (
    <FormContainer>
      <InputGroup>
        <InputWrapper>
          <Label>Height:</Label>
          <div>
            <Input
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="Enter height"
              min="0"
              step="0.1"
            />
            <Select
              value={heightUnit}
              onChange={(event) => setHeightUnit(event.target.value)}
            >
              <option value="cm">cm</option>
              <option value="inches">inches</option>
            </Select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <Label>Weight:</Label>
          <div>
            <Input
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="Enter weight"
              min="0"
              step="0.1"
            />
            <Select
              value={weightUnit}
              onChange={(event) => setWeightUnit(event.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </Select>
          </div>
        </InputWrapper>
      </InputGroup>
      <Button onClick={calculateBMI}>Calculate BMI</Button>
      {error && <ErrorText>{error}</ErrorText>}
      {bmi && (
        <div>
          <h4>Your BMI is: {bmi.toFixed(2)}</h4>
          <p>
            {bmi < 18.5
              ? "Underweight"
              : bmi >= 18.5 && bmi <= 24.9
              ? "Normal weight"
              : bmi >= 25 && bmi <= 29.9
              ? "Overweight"
              : "Obesity"}
          </p>
        </div>
      )}
    </FormContainer>
  );
};

export default BMIForm;
