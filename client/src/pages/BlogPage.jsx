import React from 'react';
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const BlogCard = styled.div`
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

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogInfo = styled.div`
  padding: 16px;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  font-size: 18px;
`;

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const BlogMeta = styled.div`
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

const blogs = [
  {
    id: 1,
    title: "The Importance of Proper Form in Weight Training",
    excerpt: "Learn why maintaining proper form during weight training is crucial for maximizing results and preventing injuries.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    date: "March 8, 2025",
    tag: "Training"
  },
  {
    id: 2,
    title: "Nutrition Tips for Muscle Building",
    excerpt: "Discover the essential nutrients and meal timing strategies to support muscle growth and recovery.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    date: "March 7, 2025",
    tag: "Nutrition"
  },
  {
    id: 3,
    title: "Benefits of Morning Workouts",
    excerpt: "Find out why exercising in the morning can boost your metabolism and improve your daily productivity.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    date: "March 6, 2025",
    tag: "Lifestyle"
  },
  {
    id: 4,
    title: "Beginner's Guide to HIIT Workouts",
    excerpt: "Everything you need to know about High-Intensity Interval Training and how to get started.",
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
    date: "March 5, 2025",
    tag: "Training"
  },
  {
    id: 5,
    title: "Understanding Macronutrients",
    excerpt: "A comprehensive guide to proteins, carbohydrates, and fats, and their role in your fitness journey.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    date: "March 4, 2025",
    tag: "Nutrition"
  },
  {
    id: 6,
    title: "Recovery Techniques for Athletes",
    excerpt: "Essential recovery methods to help you bounce back faster and prevent overtraining.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    date: "March 3, 2025",
    tag: "Recovery"
  }
];

const BlogPage = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Fitness & Health Blog</Title>
        <BlogGrid>
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <BlogImage src={blog.image} alt={blog.title} />
              <BlogInfo>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <Tag>{blog.tag}</Tag>
                  <span>{blog.date}</span>
                </BlogMeta>
              </BlogInfo>
            </BlogCard>
          ))}
        </BlogGrid>
      </Wrapper>
    </Container>
  );
};

export default BlogPage;
