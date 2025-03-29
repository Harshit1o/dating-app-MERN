import { useState, useEffect } from 'react';
import axios from 'axios';

const Discover = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleMatch = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/matches/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Move to next user
      setCurrentIndex((prev) => prev + 1);
      setError('');
    } catch (error) {
      setError('Failed to create match');
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        Loading...
      </div>
    );
  }

  if (currentIndex >= users.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>No more profiles to show</h2>
        <p style={{ marginTop: '1rem' }}>Check back later for more matches!</p>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card">
        <img
          src={currentUser.profilePicture || 'https://via.placeholder.com/400x400'}
          alt={currentUser.name}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '0.5rem 0.5rem 0 0',
          }}
        />
        <div style={{ padding: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>{currentUser.name}, {currentUser.age}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{currentUser.location}</p>
          <p style={{ marginBottom: '1rem' }}>{currentUser.bio}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {currentUser.interests?.map((interest, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="error" style={{ textAlign: 'center', marginTop: '1rem' }}>{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          className="btn"
          onClick={handleSkip}
          style={{ backgroundColor: '#ef4444', color: 'white' }}
        >
          Skip
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleMatch(currentUser._id)}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default Discover; 