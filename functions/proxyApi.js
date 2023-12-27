// functions/proxyApi.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const apiUrl = 'http://demo.d-crm.in/admin/api' + event.path.replace('/.netlify/functions/proxyApi', '');
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
