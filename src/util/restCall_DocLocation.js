import axios from 'axios';
import queryString from 'querystring';
import {
  getDocsLocations,
  postDocLocation,
  updateDocLocation
} from './restAddress';

export const getCurrentDocsLocations = async (userID, status, documentID) => {
  try {
    const tempObj = {};
    if (userID) tempObj.userID = userID;
    if (status) tempObj.status = status;
    // if (documentID) tempObj.documentID = documentID;
    const params = queryString.stringify(tempObj);
    const resp = await axios(`${getDocsLocations}?${params}`, {
      method: 'GET'
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return error;
  }
};

export const postNewDocLocation = async (data) => {
  try {
    const resp = await axios(`${postDocLocation}`, {
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

export const removeDocLocation = async (locationID, data) => {
  try {
    const resp = await axios(`${updateDocLocation}/${locationID} `, {
      method: 'PUT',
      data: data
    });
    console.log(resp.data);

    return resp.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
