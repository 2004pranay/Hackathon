import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WorkoutCalendar from "../components/WorkoutCalendar";
import { format } from 'date-fns';
import { createWorkout, fetchWorkouts, deleteWorkout } from "../api";

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
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: start;
`;

const CalendarSection = styled.div`
  position: sticky;
  top: 20px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const ScheduledWorkouts = styled.div`
  margin-top: 24px;
`;

const ScheduledWorkoutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.bg_secondary + '20'};
  border-radius: 8px;
  margin-bottom: 12px;
`;

const WorkoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WorkoutTitle = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 16px;
`;

const WorkoutTime = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background: ${({ theme }) => theme.error || '#ff4444'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;

const NoWorkouts = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  padding: 20px;
  font-size: 16px;
`;

const AddWorkoutButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 16px;

  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.bg};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  z-index: 1000;
`;

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
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 4px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 4px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin-bottom: 16px;
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-bottom: 16px;
`;

const Workouts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    duration: '',
    level: 'Beginner',
    focus: 'Full Body'
  });

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view workouts");
        return;
      }
      const response = await fetchWorkouts(token);
      if (response?.data?.workouts) {
        setScheduledWorkouts(response.data.workouts);
      }
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setError(err?.response?.data?.error || "Failed to fetch workouts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleDaySelect = (date) => {
    setSelectedDate(date);
  };

  const removeScheduledWorkout = async (workoutId) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to delete workouts");
        return;
      }
      await deleteWorkout(token, workoutId);
      await loadWorkouts();
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError(err?.response?.data?.error || "Failed to delete workout. Please try again.");
    }
  };

  const getWorkoutsForSelectedDate = () => {
    return scheduledWorkouts.filter(workout => 
      format(new Date(workout.scheduledDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to add workouts");
        return;
      }

      await createWorkout(token, {
        ...newWorkout,
        duration: parseInt(newWorkout.duration),
        scheduledDate: selectedDate
      });
      
      await loadWorkouts();
      setShowAddWorkout(false);
      setNewWorkout({
        title: '',
        duration: '',
        level: 'Beginner',
        focus: 'Full Body'
      });
    } catch (err) {
      console.error("Error creating workout:", err);
      setError(err?.response?.data?.error || "Failed to create workout. Please try again.");
    }
  };

  return (
    <Container>
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      <Wrapper>
        <CalendarSection>
          <WorkoutCalendar
            workouts={scheduledWorkouts}
            onDaySelect={handleDaySelect}
          />
          <AddWorkoutButton onClick={() => setShowAddWorkout(true)}>
            Add New Workout
          </AddWorkoutButton>
        </CalendarSection>
        <MainSection>
          <Title>Workouts for {format(selectedDate, 'MMMM dd, yyyy')}</Title>
          {loading ? (
            <LoadingMessage>Loading workouts...</LoadingMessage>
          ) : getWorkoutsForSelectedDate().length > 0 ? (
            getWorkoutsForSelectedDate().map(workout => (
              <ScheduledWorkoutItem key={workout._id}>
                <WorkoutInfo>
                  <WorkoutTitle>{workout.title}</WorkoutTitle>
                  <WorkoutTime>{workout.duration} minutes • {workout.level} • {workout.focus}</WorkoutTime>
                </WorkoutInfo>
                <DeleteButton onClick={() => removeScheduledWorkout(workout._id)}>
                  Remove
                </DeleteButton>
              </ScheduledWorkoutItem>
            ))
          ) : (
            <NoWorkouts>
              No workouts scheduled for this day. Add workouts using the button below the calendar.
            </NoWorkouts>
          )}
        </MainSection>
      </Wrapper>

      {showAddWorkout && (
        <Overlay onClick={() => setShowAddWorkout(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <Title>Add New Workout</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Workout Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={newWorkout.title}
                  onChange={handleInputChange}
                  placeholder="Enter workout title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  name="duration"
                  value={newWorkout.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration"
                  min="1"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Level</Label>
                <Select
                  name="level"
                  value={newWorkout.level}
                  onChange={handleInputChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Focus Area</Label>
                <Select
                  name="focus"
                  value={newWorkout.focus}
                  onChange={handleInputChange}
                >
                  <option value="Full Body">Full Body</option>
                  <option value="Upper Body">Upper Body</option>
                  <option value="Lower Body">Lower Body</option>
                  <option value="Core">Core</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                </Select>
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowAddWorkout(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">
                  Add Workout
                </SubmitButton>
              </ButtonGroup>
            </Form>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default Workouts;
