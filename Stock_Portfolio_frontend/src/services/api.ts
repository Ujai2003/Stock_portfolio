import axios from 'axios';

const FINNHUB_API_KEY = 'c9h8jq2ad3ifgl0qh0sg';

export const finnhubApi = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: FINNHUB_API_KEY
  }
});