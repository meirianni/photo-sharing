// pages/api/protected.js
import cookie from 'cookie';

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // If your API also requires an API key, you can check that too
  const apiKey = req.headers.apikey; // Ensure your request includes this header
  if (apiKey !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Here, you can use the token to verify against your database or API
  // Assuming validation is successful
  res.status(200).json({ message: 'Access granted', token });
}
