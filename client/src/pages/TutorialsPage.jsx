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
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${({ active, theme }) => active ? theme.primary : theme.bg_secondary};
  color: ${({ active, theme }) => active ? 'white' : theme.text_primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const VideoCard = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const VideoFrame = styled.iframe`
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
`;

const VideoInfo = styled.div`
  padding: 16px;
`;

const VideoTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  font-size: 16px;
`;

const VideoLanguage = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const workoutVideos = [
  {
    id: 1,
    title: "Full Body Workout for Beginners",
    videoId: "UItWltVZZmE",
    language: "english"
  },
  {
    id: 2,
    title: "घर पर वर्कआउट - Home Workout in Hindi",
    videoId: "5O5vZHYd8k0",
    language: "hindi"
  },
  {
    id: 3,
    title: "30 Minute HIIT Workout",
    videoId: "ml6cT4AZdqI",
    language: "english"
  },
  {
    id: 4,
    title: "योग और स्ट्रेचिंग - Yoga and Stretching",
    videoId: "5O5vZHYd8k0",
    language: "hindi"
  },
  {
    id: 5,
    title: "Weight Loss Cardio Workout",
    videoId: "ml6cT4AZdqI",
    language: "english"
  },
  {
    id: 6,
    title: "Strength Training Basics",
    videoId: "UItWltVZZmE",
    language: "english"
  }
];

const TutorialsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredVideos = selectedLanguage === 'all'
    ? workoutVideos
    : workoutVideos.filter(video => video.language === selectedLanguage);

  return (
    <Container>
      <Wrapper>
        <Title>Workout Tutorials</Title>
        <FilterContainer>
          <FilterButton 
            active={selectedLanguage === 'all'} 
            onClick={() => setSelectedLanguage('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={selectedLanguage === 'english'} 
            onClick={() => setSelectedLanguage('english')}
          >
            English
          </FilterButton>
          <FilterButton 
            active={selectedLanguage === 'hindi'} 
            onClick={() => setSelectedLanguage('hindi')}
          >
            Hindi
          </FilterButton>
        </FilterContainer>
        <VideosGrid>
          {filteredVideos.map((video) => (
            <VideoCard key={video.id}>
              <VideoFrame
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <VideoInfo>
                <VideoTitle>{video.title}</VideoTitle>
                <VideoLanguage>Language: {video.language}</VideoLanguage>
              </VideoInfo>
            </VideoCard>
          ))}
        </VideosGrid>
      </Wrapper>
    </Container>
  );
};

export default TutorialsPage;
