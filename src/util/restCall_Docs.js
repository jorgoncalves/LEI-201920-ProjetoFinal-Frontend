import axios from 'axios';
import queryString from 'querystring';
import { getDocs } from './restAddress';

export const getDocsUser = async (userID, status) => {
  try {
    const params = queryString.stringify({ userID, status });
    const resp = await axios(`${getDocs}?${params}`, {
      method: 'GET',
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return error;
  }
};
