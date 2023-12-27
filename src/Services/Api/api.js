const BASE_URL = 'http://demo.d-crm.in/admin/api';

export const fetchData = async (endpoint,itemId) => {
  const apiUrl = `${BASE_URL}/${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemId
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};
