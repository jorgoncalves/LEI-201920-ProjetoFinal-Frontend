import axios from 'axios';
import queryString from 'querystring';
import { getRecords, postRecord } from './restAddress';

export const getRecs = async (documentID) => {
  try {
    const tempObj = {};
    if (documentID) tempObj.documentID = documentID;
    const params = queryString.stringify(tempObj);
    console.log(params);
    console.log(getRecords);

    const resp = await axios(`${getRecords}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const postRecordData = async (data) => {
  try {
    const resp = await axios(`${postRecord}`, {
      method: 'POST',
      data: data
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
