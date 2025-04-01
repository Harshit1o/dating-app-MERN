import { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/matches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch matches');
      setLoading(false);
    }
  };

  const courses = [
    {
      title: "Web Development Mastery",
      description: "Learn modern web development with React, Node.js, and MongoDB",
      duration: "6 months",
      level: "Intermediate",
      topics: ["Frontend", "Backend", "Database", "DevOps"]
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Master the basics of ML and AI with Python",
      duration: "4 months",
      level: "Beginner",
      topics: ["Python", "Statistics", "ML Algorithms", "Deep Learning"]
    },
    {
      title: "Blockchain Development",
      description: "Build decentralized applications with Ethereum and Solidity",
      duration: "5 months",
      level: "Advanced",
      topics: ["Smart Contracts", "DApps", "Web3", "Cryptography"]
    },
    {
      title: "Artificial Intelligence",
      description: "Explore the world of AI and neural networks",
      duration: "6 months",
      level: "Advanced",
      topics: ["Neural Networks", "Computer Vision", "NLP", "Reinforcement Learning"]
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        Loading...
      </div>
    );
  }

  if (selectedMatch) {
    return (
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
          color: 'white',
          padding: '3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            opacity: 0.1,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            animation: 'pulse 2s infinite'
          }}>
            Don't Get Distracted!!
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            color: '#ff6b6b'
          }}>
            Focus on your studies and career growth!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {courses.map((course, index) => (
              <div key={index} className="card" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1.5rem',
                borderRadius: '1rem',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>{course.title}</h3>
                <p style={{ marginBottom: '0.5rem' }}>{course.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.9rem' }}>
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                  {course.topics.map((topic, i) => (
                    <span key={i} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem'
                    }}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn"
            onClick={() => setSelectedMatch(null)}
            style={{
              marginTop: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                background: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            Study! There is no back button
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Your Matches</h2>
      
      {error && <div className="error">{error}</div>}

      {matches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No matches yet. Start discovering people!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {matches.map((match) => (
            <div key={match._id} className="card">
              <img
                src={match.profilePicture || 'https://via.placeholder.com/200x200'}
                alt={match.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem 0.5rem 0 0',
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{match.name}, {match.age}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{match.location}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedMatch(match)}
                  style={{ width: '100%' }}
                >
                  Start Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches; 