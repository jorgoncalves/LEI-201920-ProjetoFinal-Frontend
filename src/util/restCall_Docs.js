import axios from 'axios';
import queryString from 'querystring';
import { getDocs, getAllDeparts, baseDocs } from './restAddress';

export const getDocsUser = async (userID, status, documentID) => {
  try {
    const params = queryString.stringify({ userID, status, documentID });
    const resp = await axios(`${getDocs}?${params}`, {
      method: 'GET',
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return error;
  }
};

export const getAllDepartments = async () => {
  try {
    const resp = await axios(getAllDeparts);
    console.log(resp);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getDocDepartPermissions = async (documentID) => {
  try {
    const params = queryString.stringify({ documentID });
    const resp = await axios(`${baseDocs}/getDocDepart?${params}`);
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
