import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  height: 600px;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  margin: ${({ isUser }) => isUser ? '0 0 0 auto' : '0'};
  background: ${({ isUser, theme }) => isUser ? theme.primary + '20' : theme.bg_secondary + '40'};
  color: ${({ theme }) => theme.text_primary};
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 4px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatBot = ({ bmi }) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! I am your health assistant. I can help you understand your BMI and provide health advice. How can I help you today?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (bmi) {
      const bmiCategory = getBMICategory(bmi);
      const advice = getHealthAdvice(bmi);
      setMessages(prev => [...prev, 
        { text: `I see your BMI is ${bmi.toFixed(1)}, which falls into the ${bmiCategory} category.`, isUser: false },
        { text: advice, isUser: false }
      ]);
    }
  }, [bmi]);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal weight';
    if (bmi < 30) return 'overweight';
    return 'obese';
  };

  const getHealthAdvice = (bmi) => {
    if (bmi < 18.5) {
      return 'Consider consulting with a healthcare provider about healthy ways to gain weight. Focus on nutrient-rich foods and strength training exercises.';
    } else if (bmi < 25) {
      return 'Great job maintaining a healthy weight! Keep up your healthy lifestyle with regular exercise and a balanced diet.';
    } else if (bmi < 30) {
      return 'Consider making lifestyle changes such as increasing physical activity and adopting a balanced diet. Small changes can make a big difference.';
    } else {
      return 'It is recommended to consult with a healthcare provider. They can help create a safe and effective plan for reaching a healthier weight.';
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = generateResponse(inputText.toLowerCase());
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (input) => {
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I help you with your health goals today?';
    } else if (input.includes('bmi')) {
      return 'BMI (Body Mass Index) is a measure of body fat based on height and weight. Would you like to know more about BMI categories?';
    } else if (input.includes('exercise') || input.includes('workout')) {
      return 'Regular exercise is crucial for maintaining a healthy weight. Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week.';
    } else if (input.includes('diet') || input.includes('food') || input.includes('eat')) {
      return 'A balanced diet should include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Would you like specific dietary recommendations?';
    } else {
      return 'I understand you want to improve your health. Could you be more specific about what you\'d like to know?';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>Health Assistant</ChatHeader>
      <ChatMessages>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
        {isTyping && <Message>Typing...</Message>}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <InputContainer>
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSend} disabled={!inputText.trim()}>
          Send
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBot;