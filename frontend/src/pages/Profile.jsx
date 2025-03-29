import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    interests: '',
    profilePicture: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        bio: response.data.bio || '',
        location: response.data.location || '',
        interests: response.data.interests?.join(', ') || '',
        profilePicture: response.data.profilePicture || '',
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedData = {
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
      };

      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setEditing(false);
      setError('');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>Your Profile</h2>
        <button
          className="btn"
          onClick={() => setEditing(!editing)}
          style={{ backgroundColor: editing ? '#ef4444' : 'var(--primary-color)', color: 'white' }}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '1rem',
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="interests">Interests (comma-separated)</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g., reading, hiking, music"
            />
          </div>
          <div className="form-control">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </button>
        </form>
      ) : (
        <div style={{ display: 'flex', gap: '2rem' }}>
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150x150'}
            alt={user.name}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '0.5rem',
              objectFit: 'cover',
            }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{user.name}, {user.age}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{user.location}</p>
            <p style={{ marginBottom: '1rem' }}>{user.bio}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {user.interests?.map((interest, index) => (
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
      )}
    </div>
  );
};

export default Profile; 