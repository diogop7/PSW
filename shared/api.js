export const BASE_URL = 'https://psw-server.onrender.com/';
export const PUBLIC_ID = "28248";
export const PRIVATE_ID = "iasbz"

export const getHeroes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${PUBLIC_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export const getTopHeroes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${PUBLIC_ID}/top`);
      if (!response.ok) {
        throw new Error('Failed to fetch top heroes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching top heroes:', error);
      throw error;
    }
  };
  
  export const saveHeroes = async (heroes) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heroes }),
      });
      if (!response.ok) {
        throw new Error('Failed to save heroes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving heroes:', error);
      throw error;
    }
  };
  
  export const saveTopHeroes = async (topHeroes) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}/top`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topHeroes }),
      });
      if (!response.ok) {
        throw new Error('Failed to save top heroes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving top heroes:', error);
      throw error;
    }
  };
  
  export const getUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };