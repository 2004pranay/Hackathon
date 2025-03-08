import React, { useState } from 'react';
import styled from 'styled-components';

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
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const FormContainer = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bg};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 4px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  padding: 12px;
  border-radius: 4px;
  background: #4caf5020;
  margin-top: 16px;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Container>
      <Wrapper>
        <ContactInfo>
          <Title>Contact Us</Title>
          <Subtitle>
            Have questions about your fitness journey? Want to learn more about our programs?
            Get in touch with us and we'll get back to you as soon as possible.
          </Subtitle>
          <InfoItem>
            <span>📍</span>
            <span>123 Fitness Street, Healthy City, 12345</span>
          </InfoItem>
          <InfoItem>
            <span>📧</span>
            <span>contact@fittrack.com</span>
          </InfoItem>
          <InfoItem>
            <span>📞</span>
            <span>+1 234 567 8900</span>
          </InfoItem>
        </ContactInfo>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Subject</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Message</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <Button type="submit">Send Message</Button>
            {submitted && (
              <SuccessMessage>
                Thank you for your message! We'll get back to you soon.
              </SuccessMessage>
            )}
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default ContactPage;
