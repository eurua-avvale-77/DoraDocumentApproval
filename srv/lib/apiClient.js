// apiClient.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * CONFIGURATION
 * --------------
 * Define the API base URL and auth settings in your .env file:
 *
 * API_BASE_URL=https://api.example.com
 * AUTH_URL=https://auth.example.com/oauth/token
 * CLIENT_ID=your-client-id
 * CLIENT_SECRET=your-client-secret
 * SCOPE=your-scope
 */
const API_BASE_URL = process.env.API_BASE_URL;
const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPE = process.env.SCOPE;

let accessToken = null;
let tokenExpiry = null;

/**
 * Get or refresh access token
 */
async function getAccessToken() {
  const now = Date.now();

  // If valid token exists, reuse it
  if (accessToken && tokenExpiry && now < tokenExpiry) {
    return accessToken;
  }

  console.log("🔐 Fetching new access token...");

  const response = await axios.post(
    AUTH_URL,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      //scope: SCOPE,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  accessToken = response.data.access_token;
  const expiresIn = response.data.expires_in || 3600; // seconds
  tokenExpiry = now + expiresIn * 1000;

  console.log("✅ Access token acquired.");
  return accessToken;
}

/**
 * Generic API call function
 */
export async function apiRequest(method, endpoint, data = null, params = null, apikey) {
  const token = await getAccessToken();

  const config = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      apiKey : apikey
    },
    data,
    params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("❌ API request failed:", error.response?.data || error.message);
    throw error;
  }
}
