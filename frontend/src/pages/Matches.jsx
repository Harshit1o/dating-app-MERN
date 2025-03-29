import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const startChat = (matchId) => {
    navigate(`/chat/${matchId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        Loading...
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
                  onClick={() => startChat(match._id)}
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