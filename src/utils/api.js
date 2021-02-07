import axios from 'axios';
const baseURL = 'https://www.alphavantage.co/query';
const API_KEY = '87CP74IRDQYVVBAG'; //normally set as an environment variable

export const getSimilarTickers = async ({ ticker }) =>
  await axios.get(`${baseURL}?function=SYMBOL_SEARCH&apikey=${API_KEY}&keywords=${ticker}`);

export const getTickerOverview = async ({ ticker }) =>
  await axios.get(`${baseURL}?function=OVERVIEW&apikey=${API_KEY}&symbol=${ticker}`);

export const getTickerGlobal = async ({ ticker }) =>
  await axios.get(`${baseURL}?function=GLOBAL_QUOTE&apikey=${API_KEY}&symbol=${ticker}`);
