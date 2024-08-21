const API_URL = 'http://localhost:3001/api';

export const saveProfileToServer = async (userId, profile) => {
  try {
    const response = await fetch(`${API_URL}/save-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, profile }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

export const getProfileFromServer = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/get-profile/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};